// assembler file parser
// gets a text file, returns an array of parsed lines

import { prepro, unroll } from './preprocessor.js';
import { parseLine } from './parseLine.js';
import { toInternal, nonempty, norm } from './utils/utils.js';

export const parse = async (src, opts) => {
  // split and convert to internal lines
  let lines = toInternal(src);
  lines = nonempty(lines); // remove empty lines
  lines = norm(lines); // normalize lines

  // macro processing and expansion
  const prei = await prepro(lines, opts);
  lines = prei[0].map((line) => parseLine(line, prei[1], opts));
  lines = unroll(lines, prei[1], null, opts);

  return lines;
};
