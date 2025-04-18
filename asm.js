// this is a main file, you know...

import { lst, html } from './listing.js';
import { pass1 } from './pass1.js';
import { pass2 } from './pass2.js';
import { objCode, linkModules } from './objcode.js';
import * as Parser from './parser.js';

// import all CPUs
import { I8080 } from './cpu/i8080.js';
import { M6800 } from './cpu/m6800.js';
import { M6809 } from './cpu/m6809.js';
import { C6502 } from './cpu/c6502.js';
import { Z80 } from './cpu/z80.js';
const cpus = [I8080, M6800, M6809, C6502, Z80];

export const compile = async (source, fileSystem, opts = { assembler: null }, filename = 'noname') => {
  if (!opts.assembler) {
    throw new Error(
      'No assembler specified',
      {
        cause: 'Assembler error'
      }
    );
  }

  if (typeof opts.assembler === 'string') {
    const assembler = cpus.find(x => x.cpu.toUpperCase() === opts.assembler.toUpperCase());
    if (typeof assembler !== 'object') {
      throw new Error(
        'No assembler for: ' + opts.assembler,
        {
          cause: 'Assembler error'
        }
      );
    }
    opts.assembler = assembler;
  }

  opts = {
    ...opts,
    readFile: fileSystem.readFile,
    ENT: null,
    BINFROM: null,
    BINTO: null,
    ENGINE: null,
    PRAGMAS: [],
    includedFiles: {},
    endian: opts.assembler.endian,
    xfre: {},
    xref: {},

  };
  try {
    // parse source code into internal representation
    const parsedSource = await Parser.parse(source, opts);

    // pass 1: prepare instruction codes and try to evaluate expressions
    let metacode = await pass1(parsedSource, null, opts);

    // metacode is passed again and again until all expressions are evaluated
    metacode = await pass1(metacode[0], metacode[1], opts);
    metacode = await pass1(metacode[0], metacode[1], opts);
    metacode = await pass1(metacode[0], metacode[1], opts);
    metacode = await pass1(metacode[0], metacode[1], opts);

    metacode[1]['__PRAGMAS'] = opts.PRAGMAS;

    // pass 2: assign addresses to labels and evaluate expressions
    //        (this pass is not repeated)
    // It should be all resolved aftrer the 2nd pass
    metacode = pass2(metacode, opts);

    // new output, broke backward compatibility
    const out = {
      dump: metacode[0],
      vars: metacode[1],
      xref: opts.xref,
      opts: opts,
    };

    // is it a module?

    const vars = metacode[1];
    if (vars && typeof vars.__PRAGMAS !== 'undefined' && vars.__PRAGMAS.indexOf('MODULE') !== -1) {
      const obj = objCode(metacode[0], metacode[1], opts, filename);
      out.obj = obj;
    }

    return out;
  } catch (e) {
    // Some error occured
    // console.log(e)
    const s = e.s || 'Internal error';

    // Handle different kinds of errors
    // error with "throw {e}" - hope it will never happen
    /*
        if (e.e) {
          if (typeof e.e == "object") {
            e = e.e;
          } else {
            e = {
              msg: e.e,
              s: e.s
            };
          }
        }
        console.log("E2",e)
        */

    // fix format msg vs message - hope not occur
    /*
        if (!e.msg && e.message) {
          e.msg = e.message;
        }
        */

    // no message, so we use the general one
    if (!e.msg) {
      throw new Error(
        `Cannot evaluate line ${opts.WLINE.numline}, there is some unspecified error (e.g. reserved world as label etc.)`,
        {
          cause: opts.WLINE
        }
      );
    }
    if (!e.s) e.s = s;

    throw new Error(
      e.msg,
      {
        cause: e
        // wline: opts.WLINE
      }
    );
  }
};

const getfn = (fullpath) => {
  const parts = fullpath.split('/');
  return parts[parts.length - 1];
};

export const compileFromFile = async (filePath, fileSystem, opts = { assembler: null }) => {
  const source = await fileSystem.readFile(filePath);
  return compile(source, fileSystem, opts, getfn(filePath));
};

// ----------------------------------------

// linker

const link = async (linkList, fileSystem, name = 'noname') => {
  let cpu = null;
  let endian = null;
  const modules = await Promise.all(linkList.modules.map(async m => {
    const f = JSON.parse(await fileSystem.readFile(m + '.obj'));
    // checker
    if (!cpu) cpu = f.cpu;
    if (cpu !== f.cpu) {
      throw new Error(
        'Different CPU in module ' + m,
        {
          cause: 'Linker error'
        }
      );
    }
    if (!endian) endian = f.endian;
    if (endian !== f.endian) {
      throw new Error(
        'Different endian in module ' + m,
        {
          cause: 'Linker error'
        }
      );
    }
    return f;
  }));
  const library = await Promise.all(linkList.library.map(async m => {
    const f = JSON.parse(await fileSystem.readFile(m + '.obj'));
    if (cpu !== f.cpu) {
      throw new Error(
        'Different CPU in library file ' + m,
        {
          cause: 'Linker error'
        }
      );
    }
    if (endian !== f.endian) {
      throw new Error(
        'Different endian in library file ' + m,
        {
          cause: 'Linker error'
        }
      );
    }
    return f;
  }));

  linkList.endian = endian;

  const out = linkModules(linkList, modules, library);

  return out;
  // fs.writeFileSync("./test/suite/"+name+".combined",JSON.stringify(out))
};

export const asm = {
  lst,
  html,
  compile,
  compileFromFile,
  link,
  cpus
};
