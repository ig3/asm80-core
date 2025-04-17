import { I8080 } from '../cpu/i8080.js';
import { lst } from '../listing.js';

import fs from 'fs';

import { pass1 } from '../pass1.js';
import { pass2 } from '../pass2.js';
import { objCode, linkModules } from '../objcode.js';
import { ihex } from '../utils/ihex.js';
import { isrec, isrec28 } from '../utils/srec.js';

// QUnit test for parser.js

import QUnit from 'qunit';

import * as Parser from '../parser.js';

QUnit.module('relocable');

const asmREL = fs.readFileSync('./test/suite/relocable.a80', 'utf-8');
const asmREL1 = fs.readFileSync('./test/suite/relocable1.a80', 'utf-8');
const asmREL2 = fs.readFileSync('./test/suite/relocable2.a80', 'utf-8');
const asmLNK = JSON.parse(fs.readFileSync('./test/suite/relocable.lnk', 'utf-8'));
const readFile = (filename) => {
  // console.log("INCLUDE", filename)
  return `nop
    .block blk
    oma: dw 1
    .endblock`;
};

const doPass = async (data, showError = false, assembler = I8080, name = '') => {
  const opts = {
    assembler: assembler,
    readFile: readFile,
    PRAGMAS: [],
    endian: assembler.endian,
  };

  try {
    const o = await Parser.parse(data, opts);
    // console.log("BEUAbc",o)
    let vx = await pass1(o, null, opts);
    vx = await pass1(vx[0], vx[1], opts);
    vx = await pass1(vx[0], vx[1], opts);
    vx = await pass1(vx[0], vx[1], opts);
    vx = await pass1(vx[0], vx[1], opts);

    vx[1]['__PRAGMAS'] = opts.PRAGMAS;
    // console.log(ASM.PRAGMAS,vx[1])
    vx = pass2(vx, opts);
    // console.log("VARS",vx[1])
    // console.log("XREF",opts.xref)

    if (showError === 2) console.log(vx);
    const l = lst({ dump: vx[0], vars: vx[1], opts: opts }, false, true);
    if (name) fs.writeFileSync('./test/suite/' + name + '.lst', l);
    if (name) fs.writeFileSync('./test/suite/' + name + '.dump', JSON.stringify(vx[0], null, 2));
    const obj = objCode(vx[0], vx[1], opts, name);
    if (name) fs.writeFileSync('./test/suite/' + name + '.obj', JSON.stringify(obj, null, 2));
    // let l2 = lst(vx[0],vx[1], true, false, opts)
    // let www = html(vx[0],vx[1],false, true,opts)
    // let www2 = html(vx[0],vx[1],true, false,opts)
    if (showError === 3)console.log(l);
    return vx;
  } catch (e) {
    if (showError)console.log(JSON.stringify(e));
    if (e.e) throw e.e;
    throw e;
  }
};

const doLink = async (data, showError = false, assembler = I8080, name = '') => {
  const modules = data.modules.map(m => {
    const f = JSON.parse(fs.readFileSync('./test/suite/' + m + '.obj', 'utf-8'));
    return f;
  });
  const library = data.library.map(m => {
    const f = JSON.parse(fs.readFileSync('./test/suite/' + m + '.obj', 'utf-8'));
    return f;
  });

  data.endian = assembler.endian;

  const out = linkModules(data, modules, library);

  fs.writeFileSync('./test/suite/' + name + '.combined', JSON.stringify(out));

  return out;
};

QUnit.test('relocable 8080', async assert => {
  await doPass(asmREL, true, I8080, 'relocable');
  assert.ok(true);
});
QUnit.test('relocable1 8080', async assert => {
  await doPass(asmREL1, true, I8080, 'relocable1');
  assert.ok(true);
});

QUnit.test('relocable2 8080', async assert => {
  await doPass(asmREL2, true, I8080, 'relocable2');
  assert.ok(true);
});

QUnit.test('link 8080', async assert => {
  await doLink(asmLNK, true, I8080, 'relocable');
  assert.ok(true);
});

QUnit.test('link to HEX', async assert => {
  const o = await doLink(asmLNK, true, I8080, 'relocable');
  o.dump.unshift({ opcode: '.PRAGMA', params: ['SEGMENT'] });
  o.dump.unshift({ opcode: '.PRAGMA', params: ['HEXLEN', '66'] });
  // console.log("D",JSON.stringify(o,null,2))
  let hex = ihex(o);
  fs.writeFileSync('./test/suite/relocable.combined.hex', hex);
  hex = ihex(o, 'DSEG');
  fs.writeFileSync('./test/suite/relocable.combined.dseg.hex', hex);
  isrec(o);
  isrec28(o);
  isrec(o, 'DSEG');
  isrec28(o, 'DSEG');
  isrec28(o, 'DSEG');
  assert.ok(true);
});
