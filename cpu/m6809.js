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
  parseOpcode: function(s,vars,Parser) {
    s._dp || (s._dp = 0);
    var t, param1, a, u, l;
    const opcodes = M6809.set[s.opcode];
    if (s.lens = [], "EXG" == s.opcode && (s.lens[0] = 30), "TFR" == s.opcode && (s.lens[0] = 31), "EXG" == s.opcode || "TFR" == s.opcode) {
      if (s.bytes = 2, 2 != s.params.length) throw s.opcode + " needs exactly 2 registers  at line " + s.numline;
      const getRegisterIndex = function(e) {
        var r = ["D", "X", "Y", "U", "S", "PC", "", "", "A", "B", "CC", "DP"].indexOf(e.toUpperCase());
        if (r < 0) throw "Not recognized register name";
        return r
      };
      return s.lens[1] = (getRegisterIndex(s.params[0]) << 4) + getRegisterIndex(s.params[1]), s
    }
    const getPshPulRegisterIndex = function(e) {
      if ("D" == e.toUpperCase()) return 6;
      var r = ["CC", "A", "B", "DP", "X", "Y", "U", "PC"].indexOf(e.toUpperCase());
      if (r < 0) throw "Not recognized register name";
      return 1 << r
    };
    if ("PSHS" == s.opcode) {
      for (s.lens[0] = 52, s.bytes = 2, s.lens[1] = 0, l = 0; l < s.params.length; l++) s.lens[1] |= getPshPulRegisterIndex(s.params[l]);
      return s
    }
    if ("PULS" == s.opcode) {
      for (s.lens[0] = 53, s.bytes = 2, s.lens[1] = 0, l = 0; l < s.params.length; l++) s.lens[1] |= getPshPulRegisterIndex(s.params[l]);
      return s
    }
    const getPshuPuluRegisterIndex = function(e) {
      if ("D" == e.toUpperCase()) return 6;
      var r = ["CC", "A", "B", "DP", "X", "Y", "S", "PC"].indexOf(e.toUpperCase());
      if (r < 0) throw "Not recognized register name";
      return 1 << r
    };
    if ("PSHU" == s.opcode) {
      for (s.lens[0] = 54, s.bytes = 2, s.lens[1] = 0, l = 0; l < s.params.length; l++) s.lens[1] |= getPshuPuluRegisterIndex(s.params[l]);
      return s
    }
    if ("PULU" == s.opcode) {
      for (s.lens[0] = 55, s.bytes = 2, s.lens[1] = 0, l = 0; l < s.params.length; l++) s.lens[1] |= getPshuPuluRegisterIndex(s.params[l]);
      return s
    }
    if (opcodes) {
      // Inherhent address mode
      if (opcodes[0] >= 0) return opcodes[0] > 255 ? (s.lens = [opcodes[0] >> 8, 255 & opcodes[0]], s.bytes = 2, s) : (s.lens = [opcodes[0]], s.bytes = 1, s);
      // 1 parameter, not starting with '['
      if (1 == s.params.length && "[" !== s.params[0][0]) {
        let opcodesIndex = 0;
        let stripPrefix = false;
        if (s.bytes = 0, "#" == (param1 = s.params[0])[0] ? (stripPrefix = true, opcodesIndex = 5, opcodes[5] < 0 && opcodes[6] >= 0 && (opcodesIndex = 6)) : "<" == param1[0] ? (stripPrefix = true, opcodesIndex = 1) : ">" == param1[0] ? (stripPrefix = true, opcodesIndex = 3) : (opcodes[1] >= 0 && (opcodesIndex = 1), opcodes[3] >= 0 && (opcodesIndex = 3), opcodes[4] >= 0 && (opcodesIndex = 4), opcodes[7] >= 0 && (opcodesIndex = 7), function(e, r, vars) {
            if (vars._dp < 0 || vars._dp > 255) return !1;
            try {
              if (null !== (t = Parser.evaluate(e, r)) && void 0 !== t && t >> 8 === vars._dp) return !0
            } catch (e) {
              return !1
            }
            return !1
          }(param1, vars, s) && opcodes[1] >= 0 && (opcodesIndex = 1)), -1 == opcodes[opcodesIndex]) throw "Bad addressing mode at line " + s.numline;
        let opcode = opcodes[opcodesIndex];

        let evalFunction = null;

        if (4 != opcodesIndex && 7 != opcodesIndex && (evalFunction = stripPrefix ? function(e) {
            return Parser.evaluate(param1.substr(1), e)
          } : function(e) {
            return Parser.evaluate(param1, e)
          }), 1 === opcodesIndex && 0 != s._dp) {
          var A = 256 * s._dp;
          evalFunction = stripPrefix ? function(e) {
            return Parser.evaluate(param1.substr(1), e) - A
          } : function(e) {
            return Parser.evaluate(param1, e) - A
          }
        }
        return s.bytes += opcode > 255 ? 2 : 1, 4 == opcodesIndex && (evalFunction = function(e) {
          var r = Parser.evaluate(param1, e) - e._PC - 2;
          if (r > 127) throw "Target out of range";
          if (r < -128) throw "Target out of range";
          return r < 0 && (r = 256 + r), r
        }), 7 == opcodesIndex && (evalFunction = function(e) {
          var n = Parser.evaluate(param1, e) - e._PC - s.bytes;
          return n < 0 && (n = 65536 + n), n
        }), s.lens = opcode > 255 ? [opcode >> 8, 255 & opcode, evalFunction] : [opcode, evalFunction], 1 == opcodesIndex && s.bytes++, 5 == opcodesIndex && s.bytes++, 4 == opcodesIndex && s.bytes++, 3 == opcodesIndex && (s.bytes += 2, s.lens[s.bytes - 1] = null), 6 == opcodesIndex && (s.bytes += 2, s.lens[s.bytes - 1] = null), 7 == opcodesIndex && (s.bytes += 2, s.lens[s.bytes - 1] = null), s
      }
      var c = 1;
      // 1 parameter starting with '['
      if (s.bytes = 2, 1 == s.params.length && "[" === s.params[0][0]) return opcodes[2] > 256 ? (s.lens[0] = opcodes[2] >> 8, s.lens[1] = 255 & opcodes[2], c = 2, s.bytes++) : s.lens[0] = opcodes[2], param1 = s.params[0], s.lens[c] = 159, s.lens[c + 1] = function(e) {
        return Parser.evaluate(param1.substr(1, param1.length - 2), e)
      }, s.lens[c + 2] = null, s.bytes += 2, s;
      if (opcodes[2] <= 0 || 2 !== s.params.length) throw "Bad addressing mode at line " + s.numline;
      opcodes[2] > 256 ? (s.lens[0] = opcodes[2] >> 8, s.lens[1] = 255 & opcodes[2], c = 2, s.bytes++) : s.lens[0] = opcodes[2];
      param1 = s.params[0];
      a = s.params[1];
      u = param1;
      a;
      // d = 0 for non-indirect addressing modes and 16 for indirect addressing modes
      var d = 0;
      if ("[" == param1[0] && "]" == a[a.length - 1]) { // Indirect addressing
        d = 16;
        param1 = param1.substr(1);
        a = a.substr(0, a.length - 1);
      }
      var P = function(e) {
          var r = ["X", "Y", "U", "S"].indexOf(e.toUpperCase());
          if (r < 0) throw "Register name not recognized: " + e;
          return r << 5
        },
        b = function(e) {
          var r = ["X", "Y", "U", "S", "PC"].indexOf(e.toUpperCase());
          if (4 == r) return 4;
          if (r < 0) throw "Register name not recognized: " + e;
          return r << 5
        };
      if ("" === param1) {
        if ("-" == a[0])
          if ("-" == a[1]) s.lens[c] = 131 | P(a.substr(2)) | d;
          else {
            if (d > 0) throw "Cannot use predecrement with 1";
            s.lens[c] = 130 | P(a.substr(1))
          }
        else if ("+" == a[1])
          if ("+" == a[2]) s.lens[c] = 129 | P(a.substr(0, 1)) | d;
          else {
            if (d > 0) throw "Cannot use postincrement with 1";
            s.lens[c] = 128 | P(a.substr(0, 1))
          }
        else s.lens[c] = 132 | P(a) | d;
        return s
      }
      if ("A" === param1.toUpperCase()) return s.lens[c] = 134 | P(a) | d, s;
      if ("B" === param1.toUpperCase()) return s.lens[c] = 133 | P(a) | d, s;
      if ("D" === param1.toUpperCase()) return s.lens[c] = 139 | P(a) | d, s;
      // Variables may not be defined in the first pass
      try {
        t = Parser.evaluate(param1, vars);
      } catch (e) {
        t = null;
      }
      if (t > 65519 && 4 != b(a) && d === 0) {
        // 5-bit offset, non-indirect
        // where offset is 16-bit two's complement
        // e.g. '0xFFFF,R'
        s.lens[c] = P(a) | 32 - (65536 - t) & 31;
        return s;
      } else if (t < 16 && t > -17 && 4 != b(a) && d === 0) {
        // 5-bit offset, non-indirect
        s.lens[c] = P(a) | 31 & t;
        return s;
      } else if (t !== null && t < 128 && t > -129) {
        // 8-bit offset, indirect or non-indirect
        if (t < 0) t = 256 + t;
        s.bytes += 1;
        s.lens[c] = b(a) | d | 136;
        s.lens[c+1] = t;
        return s;
      } else if (t !== null && t < 32768 && t > -32769) {
        // 16-bit offset, indirect or non-indirect
        s.bytes += 2;
        s.lens[c] = b(a) | d | 137;
        s.lens[c+1] = t >> 8;
        s.lens[c+2] = t;
        return s;
      } else {
        throw('16-bit offset overflow: ' + t);
      }
    }
    return null
  },
};