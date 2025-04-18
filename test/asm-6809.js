import { M6809 } from '../cpu/m6809.js';
import { Parser } from '../expression-parser.js';
import t from '@ig3/test';

const vars = { LOOP: 0x1234, SHORT: 0x21, _PC: 0x0100 };
let s = []; let p;

t.test('XXX test', t => {
  s = { opcode: 'XXX', addr: 0x100, lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p, null, 'result OK');
  t.end();
});

t.test('NOP test', t => {
  s = { opcode: 'NOP', addr: 0x100, lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x12, 'Opcode OK');
  t.equal(p.bytes, 1, 'Length OK');
  t.end();
});

t.test('DEC addr', t => {
  s = { opcode: 'DEC', params: ['$23'], addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x0a, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DECA', t => {
  s = { opcode: 'DECA', params: [], paramstring: '', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x4a, 'Opcode');
  t.equal(p.bytes, 1, 'Length');
  t.end();
});

t.test('DEC n,X - 5bit', t => {
  s = { opcode: 'DEC', params: ['9', 'X'], paramstring: '9,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode');
  t.equal(p.lens[1], 0x09, 'Opcode');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC n,X - 8bit', t => {
  s = { opcode: 'DEC', params: ['$23', 'X'], paramstring: '$23,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x88, 'Opcode 1');
  t.equal(p.lens[2], 0x23, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  t.end();
});

t.test('DEC n,X - 16bit', t => {
  s = { opcode: 'DEC', params: ['$2000', 'X'], paramstring: '$2000,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x89, 'Opcode 1');
  t.equal(p.lens[2], 0x20, 'Opcode 2');
  t.equal(p.lens[3], 0x00, 'Opcode 3');
  t.equal(p.bytes, 4, 'Length');
  t.end();
});

t.test('DEC n,X - 16bit overflow', t => {
  s = { opcode: 'DEC', params: ['$10000', 'X'], paramstring: '$10000,X', addr: '0x100', lens: [], bytes: 0 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, '16-bit offset overflow: 65536', 'error message');
  }
  t.end();
});

t.test('DEC [n,X] - 5bit', t => {
  s = { opcode: 'DEC', params: ['[9', 'X]'], paramstring: '[9,X]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x98, 'Opcode 1');
  t.equal(p.lens[2], 0x09, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  t.end();
});

t.test('DEC [n,X] - 8bit', t => {
  s = { opcode: 'DEC', params: ['[$23', 'X]'], paramstring: '[$23,X]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x98, 'Opcode 1');
  t.equal(p.lens[2], 0x23, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  t.end();
});

t.test('DEC [n,X] - 16bit', t => {
  s = { opcode: 'DEC', params: ['[$2000', 'X]'], paramstring: '[$2000,X]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x99, 'Opcode 1');
  t.equal(p.lens[2], 0x20, 'Opcode 2');
  t.equal(p.lens[3], 0x00, 'Opcode 3');
  t.equal(p.bytes, 4, 'Length');
  t.end();
});

t.test('DEC [n,X] - 16bit overflow', t => {
  s = { opcode: 'DEC', params: ['[$10000', 'X]'], paramstring: '[$10000,X]', addr: '0x100', lens: [], bytes: 0 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, '16-bit offset overflow: 65536', 'error message');
  }
  t.end();
});

t.test('DEC n,X - funky negative 16bit to 5bit', t => {
  s = { opcode: 'DEC', params: ['$FFFF', 'X'], paramstring: '$FFFF,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x1F, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC n,X - undefined label', t => {
  s = { opcode: 'DEC', params: ['TEST', 'X'], paramstring: 'TEST,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x89, 'Opcode 1');
  t.equal(typeof (p.lens[2]), 'function', 'Opcode 2');
  t.equal(p.lens[3], null, 'Opcode 3');
  t.equal(p.bytes, 4, 'Length');
  const resolved = p.lens[2]({ TEST: 0x1234 });
  t.equal(resolved, 0x1234, 'function resolves label');
  t.end();
});

t.test('DEC n,X - defined label', t => {
  s = { opcode: 'DEC', params: ['LOOP', 'X'], paramstring: 'LOOP,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x89, 'Opcode 1');
  t.equal(p.lens[2], 0x12, 'Opcode 2');
  t.equal(p.lens[3], 0x34, 'Opcode 3');
  t.equal(p.bytes, 4, 'Length');
  t.end();
});

t.test('DEC D,X', t => {
  s = { opcode: 'DEC', params: ['D', 'X'], paramstring: 'D,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x8B, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC [D,X]', t => {
  s = { opcode: 'DEC', params: ['[D', 'X]'], paramstring: '[D,X]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x9B, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC B,X', t => {
  s = { opcode: 'DEC', params: ['B', 'X'], paramstring: 'B,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x85, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC [B,X]', t => {
  s = { opcode: 'DEC', params: ['[B', 'X]'], paramstring: '[B,X]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x95, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC A,X', t => {
  s = { opcode: 'DEC', params: ['A', 'X'], paramstring: 'A,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x86, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC [A,X]', t => {
  s = { opcode: 'DEC', params: ['[A', 'X]'], paramstring: '[A,X]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x96, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('LDA ,X+', t => {
  s = { opcode: 'LDA', params: ['', 'X+'], paramstring: ',X+', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xa6, 'Opcode 0');
  t.equal(p.lens[1], 0x80, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('LDA [,X+]', t => {
  s = { opcode: 'LDA', params: ['[', 'X+]'], paramstring: '[,X+]', addr: '0x100', lens: [], bytes: 0 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'Cannot use postincrement with indirect addressing', 'Error message');
  }
  t.end();
});

t.test('LDA ,X++', t => {
  s = { opcode: 'LDA', params: ['', 'X++'], paramstring: ',X++', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xa6, 'Opcode 0');
  t.equal(p.lens[1], 0x81, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('LDA ,-X', t => {
  s = { opcode: 'LDA', params: ['', '-X'], paramstring: ',-X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xa6, 'Opcode 0');
  t.equal(p.lens[1], 0x82, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('LDA [,-X]', t => {
  s = { opcode: 'LDA', params: ['[', '-X]'], paramstring: '[,-X]', addr: '0x100', lens: [], bytes: 0 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'Cannot use predecrement with indirect addressing', 'Error message');
  }
  t.end();
});

t.test('LDA ,--X', t => {
  s = { opcode: 'LDA', params: ['', '--X'], paramstring: ',--X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xa6, 'Opcode 0');
  t.equal(p.lens[1], 0x83, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('LDA ,X', t => {
  s = { opcode: 'LDA', params: ['', 'X'], paramstring: ',X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xa6, 'Opcode 0');
  t.equal(p.lens[1], 0x84, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('LDA 2,PC', t => {
  s = { opcode: 'LDA', params: ['2', 'PC'], paramstring: '2,PC', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xa6, 'Opcode 0');
  t.equal(p.lens[1], 0x8C, 'Opcode 1');
  t.equal(p.lens[2], 0x02, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  t.end();
});

t.test('LDA 2,W', t => {
  s = { opcode: 'LDA', params: ['2', 'W'], paramstring: '2,W', addr: '0x100', lens: [], bytes: 0 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'Register name not recognized: W', 'Error message');
  }
  t.end();
});

t.test('CMPD 2,X', t => {
  s = { opcode: 'CMPD', params: ['2', 'X'], paramstring: '2,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x10, 'Opcode 0');
  t.equal(p.lens[1], 0xA3, 'Opcode 1');
  t.equal(p.lens[2], 0x02, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  t.end();
});

t.test('BEQ 2,X', t => {
  s = { opcode: 'BEQ', params: ['2', 'X'], paramstring: '2,X', addr: '0x100', lens: [], bytes: 0, numline: 10 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'Bad addressing mode at line 10', 'Error message');
  }
  t.end();
});

t.test('CMPD [$2000]', t => {
  s = { opcode: 'CMPD', params: ['[$2000]'], paramstring: '[$2000]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x10, 'Opcode 0');
  t.equal(p.lens[1], 0xA3, 'Opcode 1');
  t.equal(p.lens[2], 0x9f, 'Opcode 2');
  t.equal(typeof (p.lens[3]), 'function', 'Opcode 3');
  t.equal(p.lens[4], null, 'Opcode 4');
  t.equal(p.bytes, 5, 'Length');
  const result = p.lens[3](vars);
  t.equal(result, 0x2000, 'formula result');
  t.end();
});

t.test('CMPA [$2000]', t => {
  s = { opcode: 'CMPA', params: ['[$2000]'], paramstring: '[$2000]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xa1, 'Opcode 0');
  t.equal(p.lens[1], 0x9f, 'Opcode 1');
  t.equal(typeof (p.lens[2]), 'function', 'Opcode 2');
  t.equal(p.lens[3], null, 'Opcode 3');
  t.equal(p.bytes, 4, 'Length');
  const result = p.lens[2](vars);
  t.equal(result, 0x2000, 'formula result');
  t.end();
});

t.test('CMPA >$2000', t => {
  s = { opcode: 'CMPA', params: ['>$2000'], paramstring: '>$2000', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0xB1, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.lens[2], null, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x2000, 'formula result');
  t.end();
});

t.test('CMPD >$2000', t => {
  s = { opcode: 'CMPD', params: ['>$2000'], paramstring: '>$2000', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x10, 'Opcode 0');
  t.equal(p.lens[1], 0xb3, 'Opcode 1');
  t.equal(typeof (p.lens[2]), 'function', 'Opcode 2');
  t.equal(p.lens[3], null, 'Opcode 2');
  t.equal(p.bytes, 4, 'Length');
  const result = p.lens[2](vars);
  t.equal(result, 0x2000, 'formula result');
  t.end();
});

t.test('DEC <addr', t => {
  s = { opcode: 'DEC', params: ['<$7023'], paramstring: '<$7023', addr: '0x100', lens: [], bytes: 0, _dp: 0x70 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x0a, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x23, 'formula result');
  t.end();
});

t.test('LBRA ', t => {
  s = { opcode: 'LBRA', params: ['$1123'], paramstring: '$1123', addr: '0x100', lens: [], bytes: 0, _dp: 0x70 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x16, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.lens[2], null, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x1020, 'formula result');
  t.end();
});

t.test('BRA ', t => {
  s = { opcode: 'BRA', params: ['$111'], paramstring: '$111', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x20, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x0f, 'formula result');
  t.end();
});

t.test('LEAX ', t => {
  s = { opcode: 'LEAX', params: ['$111'], paramstring: '$111', addr: '0x100', lens: [], bytes: 0, numline: 10 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'Bad addressing mode at line 10', 'Error message');
  }
  t.end();
});

t.test('LBRA ', t => {
  s = { opcode: 'LBRA', params: ['XXX'], paramstring: 'XXX', addr: '0x100', lens: [], bytes: 0, _dp: 0x70 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x16, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.lens[2], null, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  const result = p.lens[1]({ XXX: 0x1234, _PC: 0x100 });
  t.equal(result, 0x1131, 'formula result');
  t.end();
});

t.test('SUBA ', t => {
  s = { opcode: 'SUBA', params: ['#$1234'], paramstring: '#$1234', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x80, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x1234, 'formula result');
  t.end();
});

t.test('SWI2', t => {
  s = { opcode: 'SWI2', params: [''], paramstring: '', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x10, 'Opcode 0');
  t.equal(p.lens[1], 0x3f, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('PULU', t => {
  s = { opcode: 'PULU', params: ['A', 'B', 'X'], paramstring: 'A,B,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x37, 'Opcode 0');
  t.equal(p.lens[1], 0x16, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('PSHU', t => {
  s = { opcode: 'PSHU', params: ['A', 'B', 'X'], paramstring: 'A,B,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x36, 'Opcode 0');
  t.equal(p.lens[1], 0x16, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('PULS', t => {
  s = { opcode: 'PULS', params: ['A', 'B', 'X'], paramstring: 'A,B,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x35, 'Opcode 0');
  t.equal(p.lens[1], 0x16, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('PSHS', t => {
  s = { opcode: 'PSHS', params: ['A', 'B', 'X'], paramstring: 'A,B,X', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x34, 'Opcode 0');
  t.equal(p.lens[1], 0x16, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('EXG', t => {
  s = { opcode: 'EXG', params: ['A', 'B', 'X'], paramstring: 'A,B,X', addr: '0x100', lens: [], bytes: 0, numline: 10 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'EXG needs exactly 2 registers at line 10', 'Error message');
  }
  t.end();
});

t.test('EXG', t => {
  s = { opcode: 'EXG', params: ['A', 'B'], paramstring: 'A,B', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x1e, 'Opcode 0');
  t.equal(p.lens[1], 0x89, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('DEC n,X - 8bit negative', t => {
  s = { opcode: 'DEC', params: ['[-10', 'X]'], paramstring: '[-10,X]', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x6a, 'Opcode 0');
  t.equal(p.lens[1], 0x98, 'Opcode 1');
  t.equal(p.lens[2], 0xf6, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  t.end();
});

t.test('LBRA ', t => {
  s = { opcode: 'LBRA', params: ['-10'], paramstring: '-10', addr: '0x100', lens: [], bytes: 0, _dp: 0x70 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x16, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.lens[2], null, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0xfef3, 'formula result');
  t.end();
});

t.test('BRA I8 - negative', t => {
  s = { opcode: 'BRA', params: ['$8f'], paramstring: '$8f', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x20, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x8d, 'formula result');
  t.end();
});

t.test('BRA I8 - negative', t => {
  s = { opcode: 'BRA', params: ['$7f'], paramstring: '$7f', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x20, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  try {
    p.lens[1](vars);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'Target out of range', 'Error message');
  }
  t.end();
});

t.test('DEC I16', t => {
  s = { opcode: 'DEC', params: ['$7023'], paramstring: '$7023', addr: '0x100', lens: [], bytes: 0, _dp: -1 };
  console.log('last');
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x7a, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.lens[2], null, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x7023, 'formula result');
  t.end();
});

t.test('SUBD addr', t => {
  s = { opcode: 'SUBD', params: ['#$7023'], paramstring: '#$7023', addr: '0x100', lens: [], bytes: 0, _dp: -1 };
  console.log('last');
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x83, 'Opcode 0');
  t.equal(typeof (p.lens[1]), 'function', 'Opcode 1');
  t.equal(p.lens[2], null, 'Opcode 2');
  t.equal(p.bytes, 3, 'Length');
  const result = p.lens[1](vars);
  t.equal(result, 0x7023, 'formula result');
  t.end();
});

t.test('PSHU D', t => {
  s = { opcode: 'PSHU', params: ['D'], paramstring: 'D', addr: '0x100', lens: [], bytes: 0 };
  p = M6809.parseOpcode(s, vars, Parser);
  t.equal(p.lens[0], 0x36, 'Opcode 0');
  t.equal(p.lens[1], 0x06, 'Opcode 1');
  t.equal(p.bytes, 2, 'Length');
  t.end();
});

t.test('PSHU W', t => {
  s = { opcode: 'PSHU', params: ['W'], paramstring: 'W', addr: '0x100', lens: [], bytes: 0 };
  try {
    p = M6809.parseOpcode(s, vars, Parser);
    t.fail('should throw');
  } catch (e) {
    t.equal(e.message, 'Not recognized register name W', 'Error message');
  }
  t.end();
});
