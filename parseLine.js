import { btoax, atobx } from "./utils/base64escaped.js";
import { Parser } from "./expression-parser.js";

const includedLineNumber = (s) => {
    if (!s.includedFile) return s.numline;
    return s.includedFileAtLine + "__" + s.numline;
  }

export const parseLine = (line, macros, opts = {stopFlag:null, olds:null, assembler:null}) => {
    let t = line.line;
    let ll;

    //anonymous labels
    //format: : label
    ll = t.match(/^\s*:\s*(.*)/);
    if (ll) {
      line.anonymousLabel = "anon__" + includedLineNumber(line);
      t = ll[1];
    }

    //console.log(line, ll)
    //labels
    //format: label:
    ll = t.match(/^\s*(\@{0,1}[a-zA-Z0-9-_]+):\s*(.*)/);
    //console.log(t, ll)
    if (ll) {
      line.label = ll[1].toUpperCase();
      t = ll[2];
    }

    //anonymous labels
    //format: : label

    ll = t.match(/^\s*:\s*(.*)/);
    //console.log(line, ll)
    if (ll) {
      line.label = "__@anon" + line.numline;
      t = ll[2];
    }


    line._dp = 0;
    line.params = [];

    //special EQU format as "label = value"
    let oo = t.match(/^\s*(\=)\s*(.*)/);
    if (oo) {
      line.opcode = oo[1].toUpperCase();
      t = oo[2];
    } else {
      oo = t.match(/^\s*([\.a-zA-Z0-9-_]+)\s*(.*)/);
      //console.log("2",oo,t)
      if (oo) {
        line.opcode = oo[1].toUpperCase();
        t = oo[2];
      }
    }
    /*
    oo = t.match(/^\s*(:\=)\s*(.*)/);
    if (oo) {
      line.opcode = "=";
      t = oo[2];
    }
*/
    if (t) {
      //param grouping by {}
      //try {
      //console.log(t)
      while (t.match(/\"(.*?)\"/g)) {
        t = t.replace(/\"(.*?)\"/g, (n) => "00ss" + btoax(n) + "!");
      }

      while (t.match(/\'(.*?)\'/g)) {
        //console.log(t)
        t = t.replace(/\'(.*?)\'/g, (n) => "00ss" + btoax('"' + n.substr(1, n.length - 2) + '"') + "!");
      }

      while (t.match(/\{(.*?)\}/g)) {
        t = t.replace(/\{(.*?)\}/g, (n) => "00bb" + btoax(n.substr(1, n.length - 2)));
      }
      //} catch(e) {
      // console.log(e,t)
      //}
      //semicolon fix
      while (t.match(/"(.*?);(.*?)"/g)) {
        t = t.replace(/"(.*?);(.*?)"/g, '"$1§$2"');
      }
      while (t.match(/'(.*?);(.*?)'/g)) {
        t = t.replace(/'(.*?);(.*?)'/g, '"$1§$2"');
      }

      let pp = t.match(/^\s*([^;]*)(.*)/);
      if (pp && pp[1].length) {
        line.paramstring = pp[1];

        //sane strings
        let ppc = pp[1];
        while (ppc.match(/"(.*?),(.*?)"/g)) {
          ppc = ppc.replace(/"(.*?),(.*?)"/g, '"$1€$2"');
        }
        while (ppc.match(/'(.*?),(.*?)'/g)) {
          ppc = ppc.replace(/'(.*?),(.*?)'/g, '"$1€$2"');
        }

        let n = ppc.match(/([0-9]+)\s*DUP\s*\((.*)\)/i);
        if (n) {
          let dup = parseInt(n[1]);
          let nln = "";
          for (let i = 0; i < dup; i++) {
            nln += n[2] + ",";
          }
          ppc = nln.substring(0, nln.length - 1);
          //console.log(ppc);
        }

        let px = ppc.split(/\s*,\s*/);
        line.params = px.map((ppc) => {
          let p = (ppc.replace(/€/g, ",").replace(/§/g, ";")).trim();
          p = p.replace(/00ss(.*?)\!/g, (n) => atobx(n.substr(4, n.length - 5)));
          return p;
        });

        //console.log(s)
        t = pp[2].replace(/§/g, ";");
      }
    }

    //console.log("SSS",line)
    if (t) {
      let rr = t.match(/^\s*;*(.*)/);
      if (rr) {
        line.remark = rr[1].replace(/00ss(.*?)\!/g, (n) => atobx(n.substr(4, n.length - 5)));
        if (!line.remark) {
          line.remark = " ";
        }
        t = "";
      }
    }
    line.notparsed = t;

    //pokus s opts
    //console.log("ZDECH", line)
    if (line.opcode === "ORG") {
      line.opcode = ".ORG";
    }
    if (line.opcode === ".ERROR") {
      line.paramstring = line.paramstring.replace(/00ss(.*?)\!/g, (n) => atobx(n.substr(4, n.length - 5)));
      return line;
      //console.log(stopFlag,olds,vars)
      //throw { "msg": line.paramstring.replace(/00ss(.*?)\!/g, function (n) { return atobx(n.substr(4, n.length - 5)) }), "s":line};
    }
    if (line.opcode === ".EQU") {
      line.opcode = "EQU";
    }
    if (line.opcode === ".FILL") {
      line.opcode = "FILL";
    }
    if (line.opcode === ".ORG") {
        return line;

        // obsolete - evaluate origin has been suppressed
        /*
      try {
        //				line.addr = Parser.evaluate(line.paramstring);
        return line;
      } catch (e) {
        throw {
          msg: e.msg,
          line: line
        };
      }
      */
    }

    if (line.opcode === "DEFB") {
      line.opcode = "DB";
      return line;
    }
    if (line.opcode === ".BYTE") {
      line.opcode = "DB";
      return line;
    }
    if (line.opcode === ".DB") {
      line.opcode = "DB";
      return line;
    }
    if (line.opcode === ".WORD") {
      line.opcode = "DW";
      return line;
    }
    if (line.opcode === ".DW") {
      line.opcode = "DW";
      return line;
    }
    if (line.opcode === "DEFW") {
      line.opcode = "DW";
      return line;
    }
    if (line.opcode === ".DD") {
      line.opcode = "DD";
      return line;
    }
    if (line.opcode === ".DF") {
      line.opcode = "DF";
      return line;
    }
    if (line.opcode === ".DFZXS") {
      line.opcode = "DFZXS";
      return line;
    }
    if (line.opcode === ".DFF") {
      line.opcode = "DFF";
      return line;
    }
    if (line.opcode === "DEFS") {
      line.opcode = "DS";
      return line;
    }
    if (line.opcode === ".RES") {
      line.opcode = "DS";
      return line;
    }
    if (line.opcode === "DEFM") {
      line.opcode = "DS";
      return line;
    }

    if (line.opcode === ".ALIGN") {
      line.opcode = "ALIGN";
      return line;
    }

    if (line.opcode === ".IFN") {
        line.opcode = "IFN";
        return line;
    }
    
     if (line.opcode === ".IF") {
      line.opcode = "IF";
      return line;
    }
    
    if (line.opcode === ".ELSE") {
      line.opcode = "ELSE";
      return line;
    }
    if (line.opcode === ".ENDIF") {
      line.opcode = "ENDIF";
      return line;
    }

    if (line.opcode === ".PRAGMA") {
      opts.PRAGMAS = opts.PRAGMAS || [];
      opts.PRAGMAS.push(line.params[0].toUpperCase());
      return line;
    }

    if (line.opcode === "EQU" ||
      line.opcode === "=" ||
      line.opcode === ".SET" ||
      line.opcode === "IF" ||
      line.opcode === "IFN" ||
      line.opcode === "ELSE" ||
      line.opcode === "ENDIF" ||
      line.opcode === ".ERROR" ||
      line.opcode === ".INCLUDE" ||
      line.opcode === ".INCBIN" ||
      line.opcode === ".MACRO" ||
      line.opcode === ".ENDM" ||
      line.opcode === ".BLOCK" ||
      line.opcode === ".ENDBLOCK" ||
      line.opcode === ".REPT" ||
      line.opcode === ".CPU" ||
      line.opcode === ".ENT" ||
      line.opcode === ".BINFROM" ||
      line.opcode === ".BINTO" ||
      line.opcode === ".ENGINE" ||
      line.opcode === ".PRAGMA" ||
      line.opcode === "END" ||
      line.opcode === ".END" ||
      //6809 assembler ops
      line.opcode === "BSZ" ||
      line.opcode === "FCB" ||
      line.opcode === "FCC" ||
      line.opcode === "FDB" ||
      line.opcode === "FILL" ||
      line.opcode === "RMB" ||
      line.opcode === "ZMB" ||
      line.opcode === "SETDP" ||
      //65816
      line.opcode === ".M8" ||
      line.opcode === ".X8" ||
      line.opcode === ".M16" ||
      line.opcode === ".X16" ||
      //phase, dephase
      line.opcode === ".PHASE" ||
      line.opcode === ".DEPHASE" ||
      line.opcode === ".SETPHASE" ||
      line.opcode === "ALIGN" ||
      line.opcode === ".CSTR" ||
      line.opcode === ".ISTR" ||
      line.opcode === ".PSTR" ||
      //segments
      line.opcode === ".CSEG" ||
      line.opcode === ".DSEG" ||
      line.opcode === ".ESEG" ||
      line.opcode === ".BSSEG" ||
      //modules
      line.opcode === ".EXPORT" ||
      line.opcode === ".EXTERN" ||
      line.opcode === "DB" ||
      line.opcode === "DW" ||
      line.opcode === "DD" ||
      line.opcode === "DF" ||
      line.opcode === "DFF" ||
      line.opcode === "DFZXS" ||
      line.opcode === "DS") {
      return line;
    }

    if (line.opcode === ".DEBUGINFO" ||
      line.opcode === ".MACPACK" ||
      line.opcode === ".FEATURE" ||
      line.opcode === ".ZEROPAGE" ||
      line.opcode === ".SEGMENT" ||
      line.opcode === ".SETCPU") {
      line.opcode = "";
      return line;
    }

    if (!line.opcode && line.label) {
      return line;
    }
    let ax = null
    try {
      ax = opts.assembler.parseOpcode(line, {}, Parser);
    } catch (e) {
      throw {
        msg: e,
        line: line
      };
    }
    //console.log("SS",JSON.stringify(line),ax)
    if (ax !== null) return ax;

    if (macros[line.opcode]) {
      line.macro = line.opcode;
      return line;
    }

    //label bez dvojtecky
    //console.log(line,s2)
    if (!line.label && !opts.stopFlag) {
      //console.log(line)
      //let s2 = {line:line.line,numline:line.numline, addr:null,bytes:0};
      let s2 = JSON.parse(JSON.stringify(line));
      s2.addr = null;
      s2.bytes = 0;
      s2.oldline = line.line;

      if (line.remark && !line.opcode) {
        return line;
      }
      if (!line.params || line.params.length === 0)
        throw {
          msg: "Unrecognized instruction " + line.opcode,
          line: line
        };
      if (!line.opcode)
        throw {
          msg: "Unrecognized instruction " + line.opcode,
          line: line
        };
      //hotfix
      //console.log(line)
      if (line.params[0].indexOf(":=") === 0)
        line.params[0] = ".SET" + line.params[0].substr(2);
      s2.line = line.opcode + ": " + line.params.join();
      if (line.remark) s2.line += " ;" + line.remark;
      //console.log("ATTEMPT2",s2.line)
      let sx = parseLine(s2, macros, {stopFlag:true, olds:line, ...opts});
      if (!sx.opcode)
        throw {
          msg: "Unrecognized instruction " + line.opcode,
          line: line
        };
      return sx;
    }
    if (opts.stopFlag)
      throw {
        msg: "Unrecognized instruction " + opts.olds.opcode,
        line: line
      };
    throw {
      msg: "Unrecognized instruction " + line.opcode,
      line: line
    };
  };  