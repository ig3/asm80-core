import { Parser } from './expression-parser.js';
import { fptozx } from './utils/fp.js';

export const pass2 = (vx, opts) => {
  const charVar8 = (dta) => {
    if (opts.PRAGMAS.RELAX) {
      if (typeof dta === 'string') {
        return dta.charCodeAt(0) & 0xff;
      } else {
        return dta & 0xff;
      }
    } else {
      // strict
      if (typeof dta === 'string') {
        if (dta.length !== 1) {
          throw new Error(
            'String parameter too long (' + dta + ')'
          );
        }
        return dta.charCodeAt(0) & 0xff;
      } else {
        if (dta > 255 || dta < -128) {
          throw new Error(
            'Param out of bounds (' + dta + ')'
          );
        }
        return dta & 0xff;
      }
    }
  };
  /*
      //never used
      const charVar16 = (dta) => {
        if (typeof dta === "string") {
          return dta.charCodeAt(0) & 0xff;
        } else {
          return dta & 0xff;
        }
      };
      */

  /*
      //not yet implemented
      const nextAnon = (V, i) => {
        console.log("AnonNext", i);
      }
      */

  const V = vx[0];
  const vars = vx[1];
  // console.log(vars);
  let op = null; let dta = null; let m; let bts; let l;
  const blocks = [];
  let ifskip = 0;
  let cond;

  for (let i = 0, j = V.length; i < j; i++) {
    try {
      op = V[i];
      op.pass = 2;

      if (op.opcode === 'ENDIF') {
        ifskip = 0;
        continue;
      }

      if (op.opcode === 'ELSE') {
        ifskip = ifskip ? 0 : 1;
        continue;
      }

      if (ifskip) {
        continue;
      }

      if (op.opcode === '.ERROR') {
        // console.log("ERROR", op)
        throw new Error(
          op.paramstring,
          {
            cause: op
          }
        );
        // continue;
      }

      if (op.opcode === 'IF') {
        // Parser.evaluate(op.params[0], vars);
        try {
          cond = Parser.evaluate(op.params[0], vars);
          // console.log("IF", op.params, cond)
          if (!cond) ifskip = 1;
        } catch (e) {
          // console.log("CATCH",e)
          throw new Error(
            'IF condition mismatched'
          );
        }
        continue;
      }
      if (op.opcode === 'IFN') {
        try {
          cond = Parser.evaluate(op.params[0], vars);
          if (cond) ifskip = 1;
        } catch (e) {
          throw new Error(
            'IF condition mismatched'
          );
        }
        continue;
      }

      vars._PC = op.addr;
      // console.log(vars._PC,op);

      // try to count symbols usage
      // usage in param 1

      for (let parIdx = 0; parIdx < (op.params ? op.params.length : 0); parIdx++) {
        try {
          const usage = Parser.usage(op.params[parIdx].toUpperCase(), vars);
          if (usage.length > 0) op.usage = usage;
          for (let u = 0; u < usage.length; u++) {
            const varname = usage[u];
            if (!opts.xref[varname].usage) opts.xref[varname].usage = [];
            opts.xref[varname].usage.push({
              line: op.numline,
              file: op.includedFile || '*main*',
            });
          }
        } catch (e) { }
      }
      /*
        // usage in param 2
        try {
          let usage = Parser.usage(op.params[1].toUpperCase(), vars);
          for (let u = 0; u < usage.length; u++) {
            if (!opts.xref[usage[u]].usage) opts.xref[usage[u]].usage = [];
            opts.xref[usage[u]].usage.push({
              line: op.numline,
              file: op.includedFile || "*main*",
            });
          }
        } catch (e) { }
        */
      // usage ------------------

      if (op.opcode === '.BLOCK') {
        // blocks.push(op.numline);
        if (!op.includedFileAtLine) blocks.push(op.numline);
        else blocks.push(op.numline + '@' + op.includedFileAtLine);
        const redef = vars['__' + blocks.join('/')];
        for (let nn = 0; nn < redef.length; nn++) {
          vars[blocks.join('/') + '/' + redef[nn]] = vars[redef[nn]];
          vars[redef[nn]] = vars[blocks.join('/') + '/' + redef[nn] + '$'];
        }
        continue;
      }
      if (op.opcode === '.ENDBLOCK') {
        const redef = vars['__' + blocks.join('/')];
        for (let nn = 0; nn < redef.length; nn++) {
          vars[redef[nn]] = vars[blocks.join('/') + '/' + redef[nn]];
          if (vars[redef[nn]] === undefined) delete vars[redef[nn]];
          vars[blocks.join('/') + '/' + redef[nn]] = null;
        }
        blocks.pop();
        // console.log(vars);
        continue;
      }

      if (op.opcode === '.ENT') {
        opts.ENT = Parser.evaluate(op.params[0], vars);
        continue;
      }

      if (op.opcode === '.BINFROM') {
        opts.BINFROM = Parser.evaluate(op.params[0], vars);
        continue;
      }

      if (op.opcode === '.BINTO') {
        opts.BINTO = Parser.evaluate(op.params[0], vars);
        continue;
      }

      /*
        //not yet implemented
        if (op.opcode === ".SETPHASE") {
          if (!opts.PHASES) opts.PHASES = {};
          opts.PHASES[op.addr] = op.params[0];
          continue;
        }
        */

      if (op.opcode === '.ENGINE') {
        opts.ENGINE = op.params[0];
        continue;
      }
      /*
      if (op.opcode === ".PRAGMA") {
        opts.PRAGMAS=opts.PRAGMAS || [];
        opts.PRAGMAS.push(op.params[0].toUpperCase());
        continue;
      }
      */
      if (op.opcode === 'EQU') {
        // console.log(op.label);
        if (!op.label) {
          throw new Error(
            'EQU without label',
            {
              cause: op
            }
          );
        }
        vars[op.label] = Parser.evaluate(op.params[0], vars);
        continue;
      }
      if (op.opcode === '.SET' || op.opcode === ':=') {
        // console.log(op.label, op.params[0], vars);
        vars[op.label] = Parser.evaluate(op.params[0], vars);
        continue;
      }
      if (op.opcode === 'DB' || op.opcode === 'FCB') {
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.lens[bts++] = Math.floor(m % 256);
            continue;
          }
          if (typeof m === 'string') {
            for (let mm = 0; mm < m.length; mm++) {
              op.lens[bts++] = m.charCodeAt(mm);
            }
            continue;
          }
        }
        continue;
      }
      if (op.opcode === 'FCC') {
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          const mystring = op.params[l].trim();
          const m = mystring.substr(1, mystring.length - 2);
          for (let mm = 0; mm < m.length; mm++) {
            op.lens[bts++] = m.charCodeAt(mm);
          }
        }
        continue;
      }

      if (op.opcode === '.CSTR') {
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.lens[bts++] = Math.floor(m % 256);
            continue;
          }
          if (typeof m === 'string') {
            for (let mm = 0; mm < m.length; mm++) {
              op.lens[bts++] = m.charCodeAt(mm);
            }
            continue;
          }
        }
        op.lens[bts++] = 0;
        continue;
      }

      if (op.opcode === '.PSTR') {
        bts = 1;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.lens[bts++] = Math.floor(m % 256);
            continue;
          }
          if (typeof m === 'string') {
            for (let mm = 0; mm < m.length; mm++) {
              op.lens[bts++] = m.charCodeAt(mm);
            }
            continue;
          }
        }
        op.lens[0] = bts - 1;
        continue;
      }

      if (op.opcode === '.ISTR') {
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            op.lens[bts++] = Math.floor(m % 128);
            continue;
          }
          if (typeof m === 'string') {
            for (let mm = 0; mm < m.length; mm++) {
              op.lens[bts++] = m.charCodeAt(mm) & 0x7f;
            }
            continue;
          }
        }
        op.lens[bts - 1] = op.lens[bts - 1] | 0x80;
        continue;
      }

      if (op.opcode === 'DW' || op.opcode === 'FDB') {
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            if (opts.endian) {
              op.lens[bts++] = Math.floor(m / 256);
              op.lens[bts++] = Math.floor(m % 256);
            } else {
              op.lens[bts++] = Math.floor(m % 256);
              op.lens[bts++] = Math.floor(m / 256);
            }
            continue;
          }
        }
        continue;
      }

      if (op.opcode === 'DD') {
        // console.error("DD")
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            // console.error(m)
            const b = new ArrayBuffer(4);
            const c = new Int32Array(b);
            c[0] = m;
            const a = new Uint8Array(b);
            if (opts.endian) {
              op.lens[bts++] = a[3];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[0];
            } else {
              op.lens[bts++] = a[0];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[3];
            }
            continue;
          }
        }
        continue;
      }

      if (op.opcode === 'DF') {
        // console.error("DD")
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            // console.error(m)
            const b = new ArrayBuffer(4);
            const c = new Float32Array(b);
            c[0] = m;
            const a = new Uint8Array(b);
            if (opts.endian) {
              op.lens[bts++] = a[3];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[0];
            } else {
              op.lens[bts++] = a[0];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[3];
            }
            continue;
          }
        }
        continue;
      }
      if (op.opcode === 'DFF') {
        // console.error("DD")
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            // console.error(m)
            const b = new ArrayBuffer(8);
            const c = new Float64Array(b);
            c[0] = m;
            const a = new Uint8Array(b);
            if (opts.endian) {
              op.lens[bts++] = a[7];
              op.lens[bts++] = a[6];
              op.lens[bts++] = a[5];
              op.lens[bts++] = a[4];
              op.lens[bts++] = a[3];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[0];
            } else {
              op.lens[bts++] = a[0];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[3];
              op.lens[bts++] = a[4];
              op.lens[bts++] = a[5];
              op.lens[bts++] = a[6];
              op.lens[bts++] = a[7];
            }
            continue;
          }
        }
        continue;
      }

      if (op.opcode === 'DFZXS') {
        // console.error("DD")
        bts = 0;
        op.lens = [];
        for (l = 0; l < op.params.length; l++) {
          m = Parser.evaluate(op.params[l], vars);
          if (typeof m === 'number') {
            // console.error(m)
            const a = fptozx(m, false); // uncomment if you want to use the old fptozx with no ZX int number support
            // let a = fptozx(m);
            // console.log(m,a)
            if (opts.endian) {
              op.lens[bts++] = a[4];
              op.lens[bts++] = a[3];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[0];
            } else {
              op.lens[bts++] = a[0];
              op.lens[bts++] = a[1];
              op.lens[bts++] = a[2];
              op.lens[bts++] = a[3];
              op.lens[bts++] = a[4];
            }
            continue;
          }
        }
        continue;
      }

      /*
      if (op.opcode === "DS") {
        console.log(op);
      }
*/
      // Tady se děje magie s instrukcí
      if (op.anonymousLabel) {
        // console.log(op);
        vars['ANON_PREV_2'] = ['ANON_PREV_1'];
        vars['ANON_PREV_1'] = op.addr;
        // console.log(vars);
      }

      if (op.lens && op.lens[1] && typeof op.lens[1] === 'function') {
        if (op.lens[2] === 'addr24') {
          // 3 bytes - 65816 modes
          dta = op.lens[1](vars);
          if (opts.endian) {
            op.lens[3] = Math.floor(dta % 256);
            op.lens[2] = Math.floor((dta >> 8) % 256);
            op.lens[1] = Math.floor((dta >> 16) & 0xff);
          } else {
            op.lens[1] = Math.floor(dta % 256);
            op.lens[2] = Math.floor((dta >> 8) % 256);
            op.lens[3] = Math.floor((dta >> 16) & 0xff);
          }
        } else if (op.lens[2] === 'addr32') {
          // 3 bytes - 65816 modes
          dta = op.lens[1](vars);
          if (opts.endian) {
            op.lens[4] = Math.floor(dta % 256);
            op.lens[3] = Math.floor((dta >> 8) % 256);
            op.lens[2] = Math.floor((dta >> 16) & 0xff);
            op.lens[1] = Math.floor((dta >> 24) & 0xff);
          } else {
            op.lens[1] = Math.floor(dta % 256);
            op.lens[2] = Math.floor((dta >> 8) % 256);
            op.lens[3] = Math.floor((dta >> 16) & 0xff);
            op.lens[4] = Math.floor((dta >> 24) & 0xff);
          }
        } else if (op.lens[2] === null) {
          // 2 bytes
          dta = op.lens[1](vars);
          if (typeof dta === 'string') {
            if (opts.endian) {
              op.lens[1] = dta.charCodeAt(0) & 0xff;
              op.lens[2] = dta.charCodeAt(1) & 0xff;
            } else {
              op.lens[2] = dta.charCodeAt(0) & 0xff;
              op.lens[1] = dta.charCodeAt(1) & 0xff;
            }
          } else {
            if (opts.endian) {
              op.lens[2] = Math.floor(dta % 256);
              op.lens[1] = Math.floor(dta / 256);
            } else {
              op.lens[1] = Math.floor(dta % 256);
              op.lens[2] = Math.floor(dta / 256);
            }
          }
        } else {
          dta = op.lens[1](vars);
          op.lens[1] = charVar8(dta);
        }
      }
      if (op.lens && op.lens.length > 2 && typeof op.lens[2] === 'function') {
        // console.log("OPLENS3",op.lens[3], op.lens[2]);
        dta = op.lens[2](vars);
        if (op.lens[3] === null) {
          dta = op.lens[2](vars);
          if (typeof dta === 'string') {
            if (opts.endian) {
              op.lens[2] = dta.charCodeAt(0) & 0xff;
              op.lens[3] = dta.charCodeAt(1) & 0xff;
            } else {
              op.lens[3] = dta.charCodeAt(0) & 0xff;
              op.lens[2] = dta.charCodeAt(1) & 0xff;
            }
          } else {
            if (opts.endian) {
              op.lens[3] = dta & 0xff;
              op.lens[2] = dta >> 8;
            } else {
              op.lens[2] = dta & 0xff;
              op.lens[3] = dta >> 8;
            }
          }
        } else {
          op.lens[2] = charVar8(dta);
        }
      }

      if (op.lens && op.lens.length > 3 && typeof op.lens[3] === 'function') {
        dta = op.lens[3](vars);
        if (op.lens[4] === null) {
          dta = op.lens[3](vars);
          if (typeof dta === 'string') {
            if (opts.endian) {
              op.lens[3] = dta.charCodeAt(0) & 0xff;
              op.lens[4] = dta.charCodeAt(1) & 0xff;
            } else {
              op.lens[4] = dta.charCodeAt(0) & 0xff;
              op.lens[3] = dta.charCodeAt(1) & 0xff;
            }
          } else {
            if (opts.endian) {
              op.lens[4] = dta & 0xff;
              op.lens[3] = dta >> 8;
            } else {
              op.lens[3] = dta & 0xff;
              op.lens[4] = dta >> 8;
            }
          }
        } else {
          op.lens[3] = charVar8(dta);
        }

        // op.lens[3] = charVar8(op.lens[3](vars)) & 0xff;
      }

      if (op.lens && op.lens.length > 1) {
        if (typeof op.lens[1] === 'string') {
          op.lens[1] = op.lens[1].charCodeAt(0);
        }
        if (isNaN(op.lens[1])) {
          // console.log(1201,op)
          throw new Error(
            'param out of bounds, NaN'
          );
        }
        if ((op.lens[1] > 255 || op.lens[1] < -128) && op.lens.length === 2) {
          throw new Error(
            'param out of bounds - ' + op.lens[1]
          );
        }
        if (op.lens[1] < 0) {
          op.lens[1] = 256 + op.lens[1];
        }
      }

      // console.log(op.lens,op)
      // xref usage
    } catch (e) {
      throw new Error(
        e.msg,
        {
          cause: {
            s: op,
            e: e
          }
        }
      );
    }
  }

  return [V, vars];
};
