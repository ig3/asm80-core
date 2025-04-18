export const norm = (xs) => xs.map((lx) => {
  lx.line =
    lx.line
    .replace(/^ +/, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/ +$/, '');
  return lx;
});

// remove empty lines
export const nonempty = (xs) => xs.filter((lx) => {
  return !/^ *$/.test(lx.line);
});

// convert source text to an array of line objects
export const toInternal = (src) => {
  let numLine = 1;
  return src.split(/\n/).map((line) => ({
    line: line, // original line
    numline: numLine++, // line number
    addr: null, // address in code
    bytes: 0, // number of bytes of this instruction
  }));
};

const toHexN = (n, d) => {
  let s = n.toString(16);
  while (s.length < d) {
    s = '0' + s;
  }
  return s.toUpperCase();
};

export const toHex2 = (n) => toHexN(n & 0xff, 2);
export const toHex4 = (n) => toHexN(n & 0xffff, 4);
export const toHex6 = (n) => toHexN(n & 0xffffff, 6);
export const toHex8 = (n) => toHexN(BigInt(n) & BigInt(0xffffffff), 8);
