export const M6809 = {
  endian: true,
  cpu: "m6809",
  ext: "a09",
  set: {
    // [Inherent, Direct, Indexed, Extended, Immediate-I8, Immediate-M8, Immediate-M16, Relative]
    NEG: [-1, 0, 96, 112, -1, -1, -1, -1],
    COM: [-1, 3, 99, 115, -1, -1, -1, -1],
    LSR: [-1, 4, 100, 116, -1, -1, -1, -1],
    ROR: [-1, 6, 102, 118, -1, -1, -1, -1],
    ASR: [-1, 7, 103, 119, -1, -1, -1, -1],
    LSL: [-1, 8, 104, 120, -1, -1, -1, -1],
    ASL: [-1, 8, 104, 120, -1, -1, -1, -1],
    ROL: [-1, 9, 105, 121, -1, -1, -1, -1],
    DEC: [-1, 10, 106, 122, -1, -1, -1, -1],
    INC: [-1, 12, 108, 124, -1, -1, -1, -1],
    TST: [-1, 13, 109, 125, -1, -1, -1, -1],
    JMP: [-1, 14, 110, 126, -1, -1, -1, -1],
    CLR: [-1, 15, 111, 127, -1, -1, -1, -1],
    LEAX: [-1, -1, 48, -1, -1, -1, -1, -1],
    LEAY: [-1, -1, 49, -1, -1, -1, -1, -1],
    LEAS: [-1, -1, 50, -1, -1, -1, -1, -1],
    LEAU: [-1, -1, 51, -1, -1, -1, -1, -1],
    NOP: [18, -1, -1, -1, -1, -1, -1, -1],
    SYNC: [19, -1, -1, -1, -1, -1, -1, -1],
    DAA: [25, -1, -1, -1, -1, -1, -1, -1],
    SEX: [29, -1, -1, -1, -1, -1, -1, -1],
    RTS: [57, -1, -1, -1, -1, -1, -1, -1],
    ABX: [58, -1, -1, -1, -1, -1, -1, -1],
    RTI: [59, -1, -1, -1, -1, -1, -1, -1],
    CWAI: [-1, -1, -1, -1, -1, 60, -1, -1],
    MUL: [61, -1, -1, -1, -1, -1, -1, -1],
    SWI: [63, -1, -1, -1, -1, -1, -1, -1],
    SWI2: [4159, -1, -1, -1, -1, -1, -1, -1],
    SWI3: [4415, -1, -1, -1, -1, -1, -1, -1],
    NEGA: [64, -1, -1, -1, -1, -1, -1, -1],
    COMA: [67, -1, -1, -1, -1, -1, -1, -1],
    LSRA: [68, -1, -1, -1, -1, -1, -1, -1],
    RORA: [70, -1, -1, -1, -1, -1, -1, -1],
    ASRA: [71, -1, -1, -1, -1, -1, -1, -1],
    LSLA: [72, -1, -1, -1, -1, -1, -1, -1],
    ASLA: [72, -1, -1, -1, -1, -1, -1, -1],
    ROLA: [73, -1, -1, -1, -1, -1, -1, -1],
    DECA: [74, -1, -1, -1, -1, -1, -1, -1],
    INCA: [76, -1, -1, -1, -1, -1, -1, -1],
    TSTA: [77, -1, -1, -1, -1, -1, -1, -1],
    CLRA: [79, -1, -1, -1, -1, -1, -1, -1],
    NEGB: [80, -1, -1, -1, -1, -1, -1, -1],
    COMB: [83, -1, -1, -1, -1, -1, -1, -1],
    LSRB: [84, -1, -1, -1, -1, -1, -1, -1],
    RORB: [86, -1, -1, -1, -1, -1, -1, -1],
    ASRB: [87, -1, -1, -1, -1, -1, -1, -1],
    LSLB: [88, -1, -1, -1, -1, -1, -1, -1],
    ASLB: [88, -1, -1, -1, -1, -1, -1, -1],
    ROLB: [89, -1, -1, -1, -1, -1, -1, -1],
    DECB: [90, -1, -1, -1, -1, -1, -1, -1],
    INCB: [92, -1, -1, -1, -1, -1, -1, -1],
    TSTB: [93, -1, -1, -1, -1, -1, -1, -1],
    CLRB: [95, -1, -1, -1, -1, -1, -1, -1],
    SUBA: [-1, 144, 160, 176, -1, 128, -1, -1],
    CMPA: [-1, 145, 161, 177, -1, 129, -1, -1],
    SBCA: [-1, 146, 162, 178, -1, 130, -1, -1],
    ANDA: [-1, 148, 164, 180, -1, 132, -1, -1],
    BITA: [-1, 149, 165, 181, -1, 133, -1, -1],
    LDA: [-1, 150, 166, 182, -1, 134, -1, -1],
    STA: [-1, 151, 167, 183, -1, -1, -1, -1],
    EORA: [-1, 152, 168, 184, -1, 136, -1, -1],
    ADCA: [-1, 153, 169, 185, -1, 137, -1, -1],
    ORA: [-1, 154, 170, 186, -1, 138, -1, -1],
    ADDA: [-1, 155, 171, 187, -1, 139, -1, -1],
    JSR: [-1, 157, 173, 189, -1, -1, -1, -1],
    SUBD: [-1, 147, 163, 179, -1, -1, 131, -1],
    CMPX: [-1, 156, 172, 188, -1, -1, 140, -1],
    LDX: [-1, 158, 174, 190, -1, -1, 142, -1],
    STX: [-1, 159, 175, 191, -1, -1, -1, -1],
    CMPD: [-1, 4243, 4259, 4275, -1, -1, 4227, -1],
    CMPY: [-1, 4252, 4268, 4284, -1, -1, 4236, -1],
    LDY: [-1, 4254, 4270, 4286, -1, -1, 4238, -1],
    STY: [-1, 4255, 4271, 4287, -1, -1, -1, -1],
    LDS: [-1, 4318, 4334, 4350, -1, -1, 4302, -1],
    STS: [-1, 4319, 4335, 4351, -1, -1, -1, -1],
    SUBB: [-1, 208, 224, 240, -1, 192, -1, -1],
    CMPB: [-1, 209, 225, 241, -1, 193, -1, -1],
    SBCB: [-1, 210, 226, 242, -1, 194, -1, -1],
    ANDB: [-1, 212, 228, 244, -1, 196, -1, -1],
    BITB: [-1, 213, 229, 245, -1, 197, -1, -1],
    LDB: [-1, 214, 230, 246, -1, 198, -1, -1],
    STB: [-1, 215, 231, 247, -1, -1, -1, -1],
    EORB: [-1, 216, 232, 248, -1, 200, -1, -1],
    ADCB: [-1, 217, 233, 249, -1, 201, -1, -1],
    ORB: [-1, 218, 234, 250, -1, 202, -1, -1],
    ADDB: [-1, 219, 235, 251, -1, 203, -1, -1],
    ADDD: [-1, 211, 227, 243, -1, -1, 195, -1],
    LDD: [-1, 220, 236, 252, -1, -1, 204, -1],
    STD: [-1, 221, 237, 253, -1, -1, -1, -1],
    LDU: [-1, 222, 238, 254, -1, -1, 206, -1],
    STU: [-1, 223, 239, 255, -1, -1, -1, -1],
    CMPS: [-1, 4508, 4524, 4540, -1, -1, 4492, -1],
    CMPU: [-1, 4499, 4515, 4531, -1, -1, 4483, -1],
    LBRA: [-1, -1, -1, -1, -1, -1, -1, 22],
    LBSR: [-1, -1, -1, -1, -1, -1, -1, 23],
    BSR: [-1, -1, -1, -1, 141, -1, -1, -1],
    BRA: [-1, -1, -1, -1, 32, -1, -1, -1],
    BRN: [-1, -1, -1, -1, 33, -1, -1, -1],
    BHI: [-1, -1, -1, -1, 34, -1, -1, -1],
    BLS: [-1, -1, -1, -1, 35, -1, -1, -1],
    BHS: [-1, -1, -1, -1, 36, -1, -1, -1],
    BCC: [-1, -1, -1, -1, 36, -1, -1, -1],
    BLO: [-1, -1, -1, -1, 37, -1, -1, -1],
    BCS: [-1, -1, -1, -1, 37, -1, -1, -1],
    BNE: [-1, -1, -1, -1, 38, -1, -1, -1],
    BEQ: [-1, -1, -1, -1, 39, -1, -1, -1],
    BVC: [-1, -1, -1, -1, 40, -1, -1, -1],
    BVS: [-1, -1, -1, -1, 41, -1, -1, -1],
    BPL: [-1, -1, -1, -1, 42, -1, -1, -1],
    BMI: [-1, -1, -1, -1, 43, -1, -1, -1],
    BGE: [-1, -1, -1, -1, 44, -1, -1, -1],
    BLT: [-1, -1, -1, -1, 45, -1, -1, -1],
    BGT: [-1, -1, -1, -1, 46, -1, -1, -1],
    BLE: [-1, -1, -1, -1, 47, -1, -1, -1],
    LBRN: [-1, -1, -1, -1, -1, -1, -1, 4129],
    LBHI: [-1, -1, -1, -1, -1, -1, -1, 4130],
    LBLS: [-1, -1, -1, -1, -1, -1, -1, 4131],
    LBHS: [-1, -1, -1, -1, -1, -1, -1, 4132],
    LBCC: [-1, -1, -1, -1, -1, -1, -1, 4132],
    LBLO: [-1, -1, -1, -1, -1, -1, -1, 4133],
    LBCS: [-1, -1, -1, -1, -1, -1, -1, 4133],
    LBNE: [-1, -1, -1, -1, -1, -1, -1, 4134],
    LBEQ: [-1, -1, -1, -1, -1, -1, -1, 4135],
    LBVC: [-1, -1, -1, -1, -1, -1, -1, 4136],
    LBVS: [-1, -1, -1, -1, -1, -1, -1, 4137],
    LBPL: [-1, -1, -1, -1, -1, -1, -1, 4138],
    LBMI: [-1, -1, -1, -1, -1, -1, -1, 4139],
    LBGE: [-1, -1, -1, -1, -1, -1, -1, 4140],
    LBLT: [-1, -1, -1, -1, -1, -1, -1, 4141],
    LBGT: [-1, -1, -1, -1, -1, -1, -1, 4142],
    LBLE: [-1, -1, -1, -1, -1, -1, -1, 4143],
    ORCC: [-1, -1, -1, -1, -1, 26, -1, -1],
    ANDCC: [-1, -1, -1, -1, -1, 28, -1, -1]
  },
  parseOpcode: function(line,vars,Parser) {
    line._dp || (line._dp = 0);
    let term, param1, param2, origParam1, len;
    const opcodes = M6809.set[line.opcode];
    if (line.lens = [], "EXG" == line.opcode && (line.lens[0] = 30), "TFR" == line.opcode && (line.lens[0] = 31), "EXG" == line.opcode || "TFR" == line.opcode) {
      if (line.bytes = 2, 2 != line.params.length) throw line.opcode + " needs exactly 2 registers  at line " + line.numline;
      const getRegisterIndex = function(e) {
        var registerIndex = ["D", "X", "Y", "U", "S", "PC", "", "", "A", "B", "CC", "DP"].indexOf(e.toUpperCase());
        if (registerIndex < 0) throw "Not recognized register name";
        return registerIndex
      };
      return line.lens[1] = (getRegisterIndex(line.params[0]) << 4) + getRegisterIndex(line.params[1]), line
    }
    const getPshPulRegisterIndex = function(e) {
      if ("D" == e.toUpperCase()) return 6;
      var registerIndex = ["CC", "A", "B", "DP", "X", "Y", "U", "PC"].indexOf(e.toUpperCase());
      if (registerIndex < 0) throw "Not recognized register name";
      return 1 << registerIndex
    };
    if ("PSHS" == line.opcode) {
      for (line.lens[0] = 52, line.bytes = 2, line.lens[1] = 0, len = 0; len < line.params.length; len++) line.lens[1] |= getPshPulRegisterIndex(line.params[len]);
      return line
    }
    if ("PULS" == line.opcode) {
      for (line.lens[0] = 53, line.bytes = 2, line.lens[1] = 0, len = 0; len < line.params.length; len++) line.lens[1] |= getPshPulRegisterIndex(line.params[len]);
      return line
    }
    const getPshuPuluRegisterIndex = function(e) {
      if ("D" == e.toUpperCase()) return 6;
      var registerIndex = ["CC", "A", "B", "DP", "X", "Y", "S", "PC"].indexOf(e.toUpperCase());
      if (registerIndex < 0) throw "Not recognized register name";
      return 1 << registerIndex
    };
    if ("PSHU" == line.opcode) {
      for (line.lens[0] = 54, line.bytes = 2, line.lens[1] = 0, len = 0; len < line.params.length; len++) line.lens[1] |= getPshuPuluRegisterIndex(line.params[len]);
      return line
    }
    if ("PULU" == line.opcode) {
      for (line.lens[0] = 55, line.bytes = 2, line.lens[1] = 0, len = 0; len < line.params.length; len++) line.lens[1] |= getPshuPuluRegisterIndex(line.params[len]);
      return line
    }
    if (opcodes) {
      // Inherhent address mode
      if (opcodes[0] >= 0) return opcodes[0] > 255 ? (line.lens = [opcodes[0] >> 8, 255 & opcodes[0]], line.bytes = 2, line) : (line.lens = [opcodes[0]], line.bytes = 1, line);
      // 1 parameter, not starting with '['
      if (1 == line.params.length && "[" !== line.params[0][0]) {
        let opcodesIndex = 0;
        let stripPrefix = false;
        if (line.bytes = 0, "#" == (param1 = line.params[0])[0] ? (stripPrefix = true, opcodesIndex = 5, opcodes[5] < 0 && opcodes[6] >= 0 && (opcodesIndex = 6)) : "<" == param1[0] ? (stripPrefix = true, opcodesIndex = 1) : ">" == param1[0] ? (stripPrefix = true, opcodesIndex = 3) : (opcodes[1] >= 0 && (opcodesIndex = 1), opcodes[3] >= 0 && (opcodesIndex = 3), opcodes[4] >= 0 && (opcodesIndex = 4), opcodes[7] >= 0 && (opcodesIndex = 7), function(e, r, vars) {
            if (vars._dp < 0 || vars._dp > 255) return !1;
            try {
              if (null !== (term = Parser.evaluate(e, r)) && void 0 !== term && term >> 8 === vars._dp) return !0
            } catch (e) {
              return !1
            }
            return !1
          }(param1, vars, line) && opcodes[1] >= 0 && (opcodesIndex = 1)), -1 == opcodes[opcodesIndex]) throw "Bad addressing mode at line " + line.numline;
        let opcode = opcodes[opcodesIndex];

        let evalFunction = null;

        if (4 != opcodesIndex && 7 != opcodesIndex && (evalFunction = stripPrefix ? function(e) {
            return Parser.evaluate(param1.substr(1), e)
          } : function(e) {
            return Parser.evaluate(param1, e)
          }), 1 === opcodesIndex && 0 != line._dp) {
          var A = 256 * line._dp;
          evalFunction = stripPrefix ? function(e) {
            return Parser.evaluate(param1.substr(1), e) - A
          } : function(e) {
            return Parser.evaluate(param1, e) - A
          }
        }
        return line.bytes += opcode > 255 ? 2 : 1, 4 == opcodesIndex && (evalFunction = function(e) {
          var term = Parser.evaluate(param1, e) - e._PC - 2;
          if (term > 127) throw "Target out of range";
          if (term < -128) throw "Target out of range";
          return term < 0 && (term = 256 + term), term
        }), 7 == opcodesIndex && (evalFunction = function(e) {
          var n = Parser.evaluate(param1, e) - e._PC - line.bytes;
          return n < 0 && (n = 65536 + n), n
        }), line.lens = opcode > 255 ? [opcode >> 8, 255 & opcode, evalFunction] : [opcode, evalFunction], 1 == opcodesIndex && line.bytes++, 5 == opcodesIndex && line.bytes++, 4 == opcodesIndex && line.bytes++, 3 == opcodesIndex && (line.bytes += 2, line.lens[line.bytes - 1] = null), 6 == opcodesIndex && (line.bytes += 2, line.lens[line.bytes - 1] = null), 7 == opcodesIndex && (line.bytes += 2, line.lens[line.bytes - 1] = null), line
      }
      var c = 1;
      // 1 parameter starting with '['
      if (line.bytes = 2, 1 == line.params.length && "[" === line.params[0][0]) return opcodes[2] > 256 ? (line.lens[0] = opcodes[2] >> 8, line.lens[1] = 255 & opcodes[2], c = 2, line.bytes++) : line.lens[0] = opcodes[2], param1 = line.params[0], line.lens[c] = 159, line.lens[c + 1] = function(e) {
        return Parser.evaluate(param1.substr(1, param1.length - 2), e)
      }, line.lens[c + 2] = null, line.bytes += 2, line;
      if (opcodes[2] <= 0 || 2 !== line.params.length) throw "Bad addressing mode at line " + line.numline;
      opcodes[2] > 256 ? (line.lens[0] = opcodes[2] >> 8, line.lens[1] = 255 & opcodes[2], c = 2, line.bytes++) : line.lens[0] = opcodes[2];
      param1 = line.params[0];
      param2 = line.params[1];
      origParam1 = param1;
      param2;
      // d = 0 for non-indirect addressing modes and 16 for indirect addressing modes
      var d = 0;
      if ("[" == param1[0] && "]" == param2[param2.length - 1]) { // Indirect addressing
        d = 16;
        param1 = param1.substr(1);
        param2 = param2.substr(0, param2.length - 1);
      }
      var P = function(e) {
          var registerIndex = ["X", "Y", "U", "S"].indexOf(e.toUpperCase());
          if (registerIndex < 0) throw "Register name not recognized: " + e;
          return registerIndex << 5
        },
        b = function(e) {
          var registerIndex = ["X", "Y", "U", "S", "PC"].indexOf(e.toUpperCase());
          if (4 == registerIndex) return 4;
          if (registerIndex < 0) throw "Register name not recognized: " + e;
          return registerIndex << 5
        };
      if ("" === param1) {
        if ("-" == param2[0])
          if ("-" == param2[1]) line.lens[c] = 131 | P(param2.substr(2)) | d;
          else {
            if (d > 0) throw "Cannot use predecrement with 1";
            line.lens[c] = 130 | P(param2.substr(1))
          }
        else if ("+" == param2[1])
          if ("+" == param2[2]) line.lens[c] = 129 | P(param2.substr(0, 1)) | d;
          else {
            if (d > 0) throw "Cannot use postincrement with 1";
            line.lens[c] = 128 | P(param2.substr(0, 1))
          }
        else line.lens[c] = 132 | P(param2) | d;
        return s
      }
      if ("A" === param1.toUpperCase()) return line.lens[c] = 134 | P(param2) | d, line;
      if ("B" === param1.toUpperCase()) return line.lens[c] = 133 | P(param2) | d, line;
      if ("D" === param1.toUpperCase()) return line.lens[c] = 139 | P(param2) | d, line;
      // Variables may not be defined in the first pass
      try {
        term = Parser.evaluate(param1, vars);
      } catch (e) {
        term = null;
      }
      if (term > 65519 && 4 != b(param2) && d === 0) {
        // 5-bit offset, non-indirect
        // where offset is 16-bit two's complement
        // e.g. '0xFFFF,R'
        line.lens[c] = P(param2) | 32 - (65536 - term) & 31;
        return line;
      } else if (term < 16 && term > -17 && 4 != b(param2) && d === 0) {
        // 5-bit offset, non-indirect
        line.lens[c] = P(param2) | 31 & term;
        return line;
      } else if (term !== null && term < 128 && term > -129) {
        // 8-bit offset, indirect or non-indirect
        if (term < 0) term = 256 + term;
        line.bytes += 1;
        line.lens[c] = b(param2) | d | 136;
        line.lens[c+1] = term;
        return line;
      } else if (term !== null && term < 32768 && term > -32769) {
        // 16-bit offset, indirect or non-indirect
        line.bytes += 2;
        line.lens[c] = b(param2) | d | 137;
        line.lens[c+1] = term >> 8;
        line.lens[c+2] = term;
        return line;
      } else {
        throw('16-bit offset overflow: ' + term);
      }
    }
    return null
  },
};