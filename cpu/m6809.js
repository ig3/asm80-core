export const M6809 = {
  endian: true,
  cpu: "m6809",
  ext: "a09",
  set: {
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
    let r = s;
    let n = vars;
    const e = M6809;
    r._dp || (r._dp = 0);
    var t, s, a, u, l, o = function(e) {
        var r = ["D", "X", "Y", "U", "S", "PC", "", "", "A", "B", "CC", "DP"].indexOf(e.toUpperCase());
        if (r < 0) throw "Not recognized register name";
        return r
      },
      i = function(e) {
        if ("D" == e.toUpperCase()) return 6;
        var r = ["CC", "A", "B", "DP", "X", "Y", "U", "PC"].indexOf(e.toUpperCase());
        if (r < 0) throw "Not recognized register name";
        return 1 << r
      },
      f = function(e) {
        if ("D" == e.toUpperCase()) return 6;
        var r = ["CC", "A", "B", "DP", "X", "Y", "S", "PC"].indexOf(e.toUpperCase());
        if (r < 0) throw "Not recognized register name";
        return 1 << r
      },
      B = e.set[r.opcode],
      p = 0,
      C = -1,
      L = 0,
      S = null;
    if (r.lens = [], "EXG" == r.opcode && (r.lens[0] = 30), "TFR" == r.opcode && (r.lens[0] = 31), "EXG" == r.opcode || "TFR" == r.opcode) {
      if (r.bytes = 2, 2 != r.params.length) throw r.opcode + " needs exactly 2 registers  at line " + r.numline;
      return r.lens[1] = (o(r.params[0]) << 4) + o(r.params[1]), r
    }
    if ("PSHS" == r.opcode) {
      for (r.lens[0] = 52, r.bytes = 2, r.lens[1] = 0, l = 0; l < r.params.length; l++) r.lens[1] |= i(r.params[l]);
      return r
    }
    if ("PULS" == r.opcode) {
      for (r.lens[0] = 53, r.bytes = 2, r.lens[1] = 0, l = 0; l < r.params.length; l++) r.lens[1] |= i(r.params[l]);
      return r
    }
    if ("PSHU" == r.opcode) {
      for (r.lens[0] = 54, r.bytes = 2, r.lens[1] = 0, l = 0; l < r.params.length; l++) r.lens[1] |= f(r.params[l]);
      return r
    }
    if ("PULU" == r.opcode) {
      for (r.lens[0] = 55, r.bytes = 2, r.lens[1] = 0, l = 0; l < r.params.length; l++) r.lens[1] |= f(r.params[l]);
      return r
    }
    if (B) {
      if (B[0] >= 0) return B[0] > 255 ? (r.lens = [B[0] >> 8, 255 & B[0]], r.bytes = 2, r) : (r.lens = [B[0]], r.bytes = 1, r);
      if (1 == r.params.length && "[" !== r.params[0][0]) {
        if (r.bytes = 0, "#" == (s = r.params[0])[0] ? (L = 1, p = 5, B[5] < 0 && B[6] >= 0 && (p = 6)) : "<" == s[0] ? (L = 1, p = 1) : ">" == s[0] ? (L = 1, p = 3) : (B[1] >= 0 && (p = 1), B[3] >= 0 && (p = 3), B[4] >= 0 && (p = 4), B[7] >= 0 && (p = 7), function(e, r, n) {
            if (n._dp < 0 || n._dp > 255) return !1;
            try {
              if (null !== (t = Parser.evaluate(e, r)) && void 0 !== t && t >> 8 === n._dp) return !0
            } catch (e) {
              return !1
            }
            return !1
          }(s, n, r) && B[1] >= 0 && (p = 1)), -1 == B[p]) throw "Bad addressing mode at line " + r.numline;
        if (C = B[p], 4 != p && 7 != p && (S = L ? function(e) {
            return Parser.evaluate(s.substr(1), e)
          } : function(e) {
            return Parser.evaluate(s, e)
          }), 1 === p && 0 != r._dp) {
          var A = 256 * r._dp;
          S = L ? function(e) {
            return Parser.evaluate(s.substr(1), e) - A
          } : function(e) {
            return Parser.evaluate(s, e) - A
          }
        }
        return r.bytes += C > 255 ? 2 : 1, 4 == p && (S = function(e) {
          var r = Parser.evaluate(s, e) - e._PC - 2;
          if (r > 127) throw "Target out of range";
          if (r < -128) throw "Target out of range";
          return r < 0 && (r = 256 + r), r
        }), 7 == p && (S = function(e) {
          var n = Parser.evaluate(s, e) - e._PC - r.bytes;
          return n < 0 && (n = 65536 + n), n
        }), r.lens = C > 255 ? [C >> 8, 255 & C, S] : [C, S], 1 == p && r.bytes++, 5 == p && r.bytes++, 4 == p && r.bytes++, 3 == p && (r.bytes += 2, r.lens[r.bytes - 1] = null), 6 == p && (r.bytes += 2, r.lens[r.bytes - 1] = null), 7 == p && (r.bytes += 2, r.lens[r.bytes - 1] = null), r
      }
      var c = 1;
      if (r.bytes = 2, 1 == r.params.length && "[" === r.params[0][0]) return B[2] > 256 ? (r.lens[0] = B[2] >> 8, r.lens[1] = 255 & B[2], c = 2, r.bytes++) : r.lens[0] = B[2], s = r.params[0], r.lens[c] = 159, r.lens[c + 1] = function(e) {
        return Parser.evaluate(s.substr(1, s.length - 2), e)
      }, r.lens[c + 2] = null, r.bytes += 2, r;
      if (B[2] <= 0 || 2 !== r.params.length) throw "Bad addressing mode at line " + r.numline;
      B[2] > 256 ? (r.lens[0] = B[2] >> 8, r.lens[1] = 255 & B[2], c = 2, r.bytes++) : r.lens[0] = B[2];
      var d = 0;
      s = r.params[0], a = r.params[1], u = s, a, "[" == s[0] && "]" == a[a.length - 1] && (d = 16, s = s.substr(1), a = a.substr(0, a.length - 1));
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
      if ("" === s) {
        if ("-" == a[0])
          if ("-" == a[1]) r.lens[c] = 131 | P(a.substr(2)) | d;
          else {
            if (d > 0) throw "Cannot use predecrement with 1";
            r.lens[c] = 130 | P(a.substr(1))
          }
        else if ("+" == a[1])
          if ("+" == a[2]) r.lens[c] = 129 | P(a.substr(0, 1)) | d;
          else {
            if (d > 0) throw "Cannot use postincrement with 1";
            r.lens[c] = 128 | P(a.substr(0, 1))
          }
        else r.lens[c] = 132 | P(a) | d;
        return r
      }
      if ("A" === s.toUpperCase()) return r.lens[c] = 134 | P(a) | d, r;
      if ("B" === s.toUpperCase()) return r.lens[c] = 133 | P(a) | d, r;
      if ("D" === s.toUpperCase()) return r.lens[c] = 139 | P(a) | d, r;
      try {
        t = Parser.evaluate(s, n), "PC" == a.toUpperCase() && (t -= n._PC)
      } catch (e) {
        t = null
      }
      return t > 65519 && 4 != b(a) ? (r.lens[c] = P(a) | d | 32 - (65536 - t) & 31, r) : t < 16 && t > -17 && 4 != b(a) ? (r.lens[c] = P(a) | d | 31 & t, r) : t < 128 && t > -129 && null !== t ? (t < 0 && (t = 256 + t), r.lens[c] = b(a) | d | 136, r.bytes++, "PC" == a.toUpperCase() ? r.lens[c + 1] = d ? function(e) {
        var n = Parser.evaluate(u.substr(1), e) - e._PC - r.bytes;
        return n < 0 && (n = 256 + n), n
      } : function(e) {
        var n = Parser.evaluate(u, e) - e._PC - r.bytes;
        return n < 0 && (n = 256 + n), n
      } : r.lens[c + 1] = d ? function(e) {
        return Parser.evaluate(u.substr(1), e)
      } : function(e) {
        return Parser.evaluate(u, e)
      }, r) : (r.bytes += 2, r.lens[c] = b(a) | d | 137, "PC" == a.toUpperCase() ? r.lens[c + 1] = d ? function(e) {
        var n = Parser.evaluate(u.substr(1), e) - e._PC - r.bytes;
        return n < 0 && (n += 65536), n
      } : function(e) {
        var n = Parser.evaluate(u, e) - e._PC - r.bytes;
        return n < 0 && (n += 65536), n
      } : r.lens[c + 1] = d ? function(e) {
        return Parser.evaluate(u.substr(1), e)
      } : function(e) {
        return Parser.evaluate(u, e)
      }, r.lens[c + 2] = null, r)
    }
    return null
  },
};