// assembler file parser
// gets a text file, returns an array of parsed lines

import { prepro, unroll } from "./preprocessor.js";
import { parseLine } from "./parseLine.js";

import { toInternal, nonempty, norm } from "./utils/utils.js";

export const parse = async (src, opts) => {
  // split and convert to internal lines
  let lines = toInternal(src.split(/\n/));
  //remove empty lines
  lines = nonempty(lines);
  //normalize lines
  lines = norm(lines);

  //macro processing and expansion
  
  let prei = await prepro(lines, opts);
  //console.log(prei)
  lines = prei[0].map((line) => parseLine(line, prei[1], opts));
  lines = unroll(lines, prei[1], null, opts);
  
  //console.log("prei",lines)
  return lines;
};
