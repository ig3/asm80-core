import { Parser } from './expression-parser.js';

const notInModule = (opts) => {
  if (opts.PRAGMAS && opts.PRAGMAS.indexOf('MODULE') > -1) {
    throw new Error('Not allowed in modules');
  }
};

export const pass1 = async (V, vxs, opts) => {
  if (!opts.xref) opts.xref = {};
  let segment = 'CSEG';
  const segallow = () => {
    if (segment === 'BSSEG') {
      throw new Error(op.opcode + ' is not allowed in BSSEG');
    }
  };
  const seg = {};
  let PC = 0;
  let vars = {};
  if (vxs) vars = vxs;
  let op = null;
  let m, l;
  let ifskip = 0;
  let cond;
  let doif = 0;
  const ifstack = [];
  const blocks = [];
  let phase = 0;
  let DP = 0;
  // let anon = []

  // main loop - for each line
  for (let i = 0, j = V.length; i < j; i++) {
    op = V[i];
    opts.WLINE = V[i];
    op.pass = 1;
    op.segment = segment;
    op.addr = PC;
    op._dp = DP;
    vars._PC = PC;
    if (phase !== 0) {
      op.phase = phase;
    }

    if (op.opcode === 'ENDIF') {
      if (!doif) {
        throw new Error(
          'ENDIF without IF',
          {
            cause: op
          }
        );
      }
      ifskip = ifstack.pop();
      if (ifstack.length) {
        doif = 1;
      } else {
        doif = 0;
        ifskip = 0;
      }
      continue;
    }

    if (op.opcode === 'ELSE') {
      if (!doif) {
        throw new Error(
          'ELSE without IF',
          {
            cause: op
          }
        );
      }
      ifskip = ifstack.pop();
      ifskip = ifskip ? 0 : 1;
      // console.log("ELS",ifstack,ifskip,ifstack.filter(function(q){return q==1}))
      if (ifstack.filter((q) => q === 1).length) {
        ifskip = 1;
      }
      ifstack.push(ifskip);
      continue;
    }
    // console.log(doif,ifskip,op,ifstack)
    if (op.opcode === 'IF') {
      if (doif) {
        // throw {msg: "Nested IFs are not supported",s:op};
        // if (ifskip) continue;
      }

      // throw {msg: "Nested IFs are not supported",s:op};
      try {
        cond = Parser.evaluate(op.params[0], vars);

        // console.log("IF C",cond,ifskip,op.params[0], vars)
      } catch (e) {
        /* throw {msg: "IF condition can not be determined",s:op} */
      }
      if (!cond) ifskip = 1;
      doif = 1;
      ifstack.push(ifskip);
      // console.error("LIF",ifstack,ifskip,doif,op.params[0])
      continue;
    }

    if (op.opcode === 'IFN') {
      // if (doif) throw {msg: "Nested IFs are not supported",s:op};
      try {
        cond = Parser.evaluate(op.params[0], vars);
      } catch (e) {
        /* throw {msg: "IF condition can not be determined",s:op} */
      }
      if (cond) ifskip = 1;
      // console.log("IFN C",cond,ifskip,op.params[0], vars)
      doif = 1;
      ifstack.push(ifskip);
      continue;
    }

    if (ifskip) {
      op.ifskip = true;
      continue;
    }

    if (op.opcode === '.BLOCK') {
      if (!op.includedFileAtLine) blocks.push(op.numline);
      else blocks.push(op.numline + '@' + op.includedFileAtLine);
      // console.log("bl!", blocks);
      const prefix = blocks.join('/');
      // vars['__blocks'] = JSON.stringify(blocks);
      vars['__' + prefix] = [];

      continue;
    }
    if (op.opcode === '.ENDBLOCK') {
      const redef = vars['__' + blocks.join('/')];
      // console.log(redef, vars);
      for (let nn = 0; nn < redef.length; nn++) {
        vars[redef[nn]] = vars[blocks.join('/') + '/' + redef[nn]];
        // console.log("REDEF",redef[nn], vars[redef[nn]])
        // vars[blocks.join("/")+"/"+redef[nn]] = null;
        delete vars[blocks.join('/') + '/' + redef[nn]];
      }
      blocks.pop();
      vars['__blocks'] = JSON.stringify(blocks);

      continue;
    }
    /*
            if (op.anonymousLabel) {
              console.log(op);
              anon.push(op)
            }
      */
    if (op.label) {
      // console.log("LABEL", op.label, op.opcode)
      let varname = op.label;
      let beGlobal = false;
      if (varname[0] === '@') {
        beGlobal = true;
        varname = varname.substr(1);
        op.label = varname;
        op.beGlobal = true;
      }

      if (op.beGlobal) beGlobal = true;

      if (blocks.length > 0) {
        varname = blocks.join('/') + '/' + varname;
        vars['__' + blocks.join('/')].push(op.label);
      }

      // console.log(varname, blocks)
      // console.log(op.label,beGlobal,vars[op.label]!==undefined, vars, vxs);
      if (!vxs) {
        if (typeof vars[varname + '$'] !== 'undefined' ||
            (beGlobal && vars[op.label] !== undefined)) {
          if (op.opcode !== '.SET' && op.opcode !== ':=') {
            throw new Error(
              'Redefine label ' + op.label + ' at line ' + op.numline,
              {
                cause: op,
              }
            );
          }
        }
      }
      if (vars[op.label]) {
        vars[varname] = vars[op.label];
      } else {
        if (beGlobal) {
          vars[varname] = PC;
        }
      }
      // console.log("XVARS", vars)
      // console.log(op);
      opts.xref[op.label] = {
        defined: {
          line: op.numline,
          file: op.includedFile || '*main*',
        },
        value: PC,
      };
      vars[varname + '$'] = PC;
      // console.log(op.label,vars[op.label],PC, vars)
      vars[op.label] = PC;
      // if (isNaN(PC)) throw {msg:"PC NaN",s:op}
      if (beGlobal) vars[varname] = PC;
    }

    // console.log(PC,op)
    try {
      if (op.opcode === '.ORG') {
        if (opts.PRAGMAS && opts.PRAGMAS.indexOf('MODULE') > -1) {
          throw new Error('ORG is not allowed in modules');
        }
        PC = Parser.evaluate(op.params[0], vars);
        op.addr = PC;
        seg[segment] = PC;
        continue;
      }

      if (op.opcode === '.EXPORT') {
        // does not care now
        if (opts.PRAGMAS && opts.PRAGMAS.indexOf('MODULE') < 0) {
          throw new Error('.EXPORT is not allowed out of modules');
        }
        continue;
      }

      if (op.opcode === '.EXTERN') {
        if (opts.PRAGMAS && opts.PRAGMAS.indexOf('MODULE') < 0) {
          throw new Error('.EXTERN is not allowed out of modules');
        }
        let name = op.params[0];
        if (!name) name = op.label;
        vars[name.toUpperCase()] = 0;
        continue;
      }

      if (op.opcode === '.CSEG') {
        seg[segment] = PC;
        segment = 'CSEG';
        op.segment = segment;
        PC = seg[segment] || 0;
        op.addr = PC;
      }
      if (op.opcode === '.DSEG') {
        seg[segment] = PC;
        segment = 'DSEG';
        op.segment = segment;
        PC = seg[segment] || 0;
        op.addr = PC;
      }
      if (op.opcode === '.ESEG') {
        seg[segment] = PC;
        segment = 'ESEG';
        op.segment = segment;
        PC = seg[segment] || 0;
        op.addr = PC;
      }
      if (op.opcode === '.BSSEG') {
        seg[segment] = PC;
        segment = 'BSSEG';
        op.segment = segment;
        PC = seg[segment] || 0;
        op.addr = PC;
      }

      if (op.opcode === '.PHASE') {
        notInModule(opts);
        if (phase) {
          throw new Error(
            'PHASE cannot be nested'
          );
        }
        const newphase = Parser.evaluate(op.params[0], vars);
        op.addr = PC;
        phase = newphase - PC;
        PC = newphase;
        continue;
      }
      if (op.opcode === '.DEPHASE') {
        notInModule(opts);
        op.addr = PC;
        PC = PC - phase;
        phase = 0;
        continue;
      }
      if (op.opcode === 'EQU') {
        // TADY JESTE NEMUSI BYT OK!!!
        try {
          vars[op.label] = Parser.evaluate(op.params[0], vars);
        } catch (e) {
          vars[op.label] = null;
          // console.log('Unsatisfied '+op.label);
        }
        opts.xref[op.label] = {
          defined: {
            line: op.numline,
            file: op.includedFile || '*main*',
          },
          value: vars[op.label],
        };
        continue;
      }
      if (op.opcode === '=' || op.opcode === ':=' || op.opcode === '.SET') {
        // console.log(op)
        // changeble assign
        vars[op.label] = Parser.evaluate(op.params[0], vars);
        opts.xref[op.label] = {
          defined: {
            line: op.numline,
            file: op.includedFile || '*main*',
          },
          value: vars[op.label],
        };
        continue;
      }
    } catch (e) {
      throw new Error(
        e.msg,
        {
          cause: op
        }
      );
    }

    if (op.opcode === 'DB' || op.opcode === 'FCB') {
      segallow();
      op.bytes = 0;
      for (l = 0; l < op.params.length; l++) {
        try {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.bytes++;
            continue;
          }
          if (typeof m === 'string') {
            op.bytes += m.length;
            continue;
          }
        } catch (e) {
          op.bytes++;
        }
      }
    }

    if (op.opcode === 'FCC') {
      segallow();
      op.bytes = 0;
      // console.log(op)
      for (l = 0; l < op.params.length; l++) {
        const mystring = op.params[l].trim();
        const delim = mystring[0];
        if (mystring[mystring.length - 1] !== delim) {
          throw new Error(
            'Delimiters does not match',
            {
              cause: op
            }
          );
        }
        op.bytes += mystring.length - 2;
      }
    }

    if (op.opcode === '.CSTR' ||
        op.opcode === '.PSTR' ||
        op.opcode === '.ISTR') {
      segallow();
      op.bytes = 0;
      for (l = 0; l < op.params.length; l++) {
        try {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.bytes++;
            continue;
          }
          if (typeof m === 'string') {
            op.bytes += m.length;
            continue;
          }
        } catch (e) {
          op.bytes++;
        }
      }
      if (op.opcode === '.CSTR' || op.opcode === '.PSTR') op.bytes++; // +1 for leading count / trailing zero
    }

    if (op.opcode === 'DS' || op.opcode === 'RMB') {
      // op.bytes = Parser.evaluate(op.params[0]);
      const bytes = Parser.evaluate(op.params[0], vars);
      op.bytes = bytes;
      // console.log(bytes, typeof bytes)
      if (typeof bytes !== 'number') {
        throw new Error(
          'DS / RMB needs a numerical parameter',
          {
            cause: op
          }
        );
      }
      if (op.params.length === 2) {
        // DB alias
        let m = Parser.evaluate(op.params[1], vars);
        if (typeof m === 'string') m = m.charCodeAt(0);
        op.bytes = bytes;
        op.lens = [];
        for (let iq = 0; iq < bytes; iq++) {
          op.lens[iq] = m;
        }
        // console.log(op.lens);
      }

      PC = PC + bytes;

      continue;
    }
    if (op.opcode === 'ALIGN') {
      notInModule(opts);
      // op.bytes = Parser.evaluate(op.params[0]);
      const align = Parser.evaluate(op.params[0], vars);

      PC = PC + (PC % align > 0 ? align - (PC % align) : 0);

      continue;
    }
    if (op.opcode === 'SETDP') {
      // op.bytes = Parser.evaluate(op.params[0]);
      DP = Parser.evaluate(op.params[0], vars);

      continue;
    }
    if (op.opcode === 'FILL') {
      segallow();
      // op.bytes = Parser.evaluate(op.params[0]);
      let bytes = Parser.evaluate(op.params[1], vars);
      if (typeof bytes === 'string') bytes = bytes.charCodeAt(0);
      // console.log("FILLB",bytes,op.params)
      // DB alias
      let m = Parser.evaluate(op.params[0], vars);
      if (typeof m === 'string') m = m.charCodeAt(0);
      op.bytes = bytes;
      op.lens = [];
      for (let iq = 0; iq < bytes; iq++) {
        op.lens[iq] = m;
      }
      // console.log(op.lens);
      PC = PC + bytes;

      continue;
    }
    if (op.opcode === 'BSZ' || op.opcode === 'ZMB') {
      segallow();
      // op.bytes = Parser.evaluate(op.params[0]);
      const bytes = Parser.evaluate(op.params[0], vars);
      op.bytes = bytes;
      op.lens = [];
      for (let iq = 0; iq < bytes; iq++) {
        op.lens[iq] = 0;
      }
      PC = PC + bytes;

      continue;
    }
    if (op.opcode === 'DW' || op.opcode === 'FDB') {
      segallow();
      op.bytes = 0;
      for (l = 0; l < op.params.length; l++) {
        try {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.bytes += 2;
            continue;
          }
        } catch (e) {
          op.bytes += 2;
        }
      }
    }

    if (op.opcode === 'DD' || op.opcode === 'DF') {
      segallow();
      op.bytes = 0;
      for (l = 0; l < op.params.length; l++) {
        try {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.bytes += 4;
            continue;
          }
        } catch (e) {
          op.bytes += 4;
        }
      }
    }
    if (op.opcode === 'DFF') {
      segallow();
      op.bytes = 0;
      for (l = 0; l < op.params.length; l++) {
        try {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.bytes += 8;
            continue;
          }
        } catch (e) {
          op.bytes += 8;
        }
      }
    }
    if (op.opcode === 'DFZXS') {
      segallow();
      op.bytes = 0;
      for (l = 0; l < op.params.length; l++) {
        try {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.bytes += 5;
            continue;
          }
        } catch (e) {
          op.bytes += 5;
        }
      }
    }

    if (op.opcode === '.INCBIN') {
      segallow();
      if (!op.params[0]) {
        throw new Error(
          'No file name given at line ' + op.numline,
          {
            cause: op
          }
        );
      }
      // console.log("Include "+params[0]);
      const nf = await opts.readFile(op.params[0], true);
      if (!nf) {
        throw new Error(
          'Cannot find file ' + op.params[0] + ' for incbin',
          {
            cause: op,
          }
        );
      }

      op.bytes = 0;
      op.lens = [];
      for (let iq = 0; iq < nf.length; iq++) {
        const cd = nf.charCodeAt(iq);
        if (cd > 255) {
          op.lens[op.bytes++] = cd >> 8;
        }
        op.lens[op.bytes++] = cd % 256;
      }
      // console.log(op.lens);
      PC = PC + op.bytes;

      continue;
    }

    // 65816
    if (op.opcode === '.M16') {
      vars.__AX = 16;
      continue;
    }
    if (op.opcode === '.M8') {
      vars.__AX = 8;
      continue;
    }
    if (op.opcode === '.X16') {
      vars.__MX = 16;
      continue;
    }
    if (op.opcode === '.X8') {
      vars.__MX = 8;
      continue;
    }

    // je to instrukce? Jde optimalizovat?
    const opa = opts.assembler.parseOpcode(V[i], vars, Parser);
    if (opa) {
      segallow();
      // console.log(op,opa);
      op = opa;
    }

    if (op.bytes === undefined) op.bytes = 0;
    // console.log(op.bytes,op)
    PC += op.bytes;
    if (op.params && op.params.length && !op.opcode) {
      throw new Error(
        'No opcode, possible missing',
        {
          cause: op
        }
      );
    }
  }

  return [V, vars];
};
