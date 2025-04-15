#!/usr/bin/env node
import {asm} from "./asm.js";

import * as fs from 'node:fs/promises';
import {readFileSync} from 'node:fs';
import path from 'node:path';

console.log('args: ', process.argv);
const srcPath = process.argv[2];

const src = readFileSync(srcPath,'utf-8');

function getType(srcPath) {
  let type = 'unknown';
  switch (path.extname(srcPath).toUpperCase()) {
  case '.A80':
    type = 'I8080';
    break;
  case '.A08':
    type = 'I8008';
    break;
  case '.A68':
    type = 'M6800';
    break;
  case '.A18':
    type = 'CDP1802';
    break;
  case '.A09':
    type = 'M6809';
    break;
  case '.A65':
    type = 'C6502';
    break;
  case '.816':
    type = 'C65816';
    break;
  case '.Z80':
    type = 'Z80';
    break;
  }
  return type;
}

const assembler = getType(srcPath);
console.log('assembler: ', assembler);
console.log('src: ', src);

try {
  const x = await asm.compile(src,fs, {assembler:assembler});
} catch (e) {
  console.log('failed with: ', e);
}
