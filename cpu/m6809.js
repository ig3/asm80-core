export const M6809 = {
  endian: true,
  cpu: 'm6809',
  ext: 'a09',
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
  parseOpcode: function (line, vars, Parser) {
    const opcodes = M6809.set[line.opcode];

    let term, param1, param2;

    if (!line._dp) line._dp = 0;
    line.lens = [];

    if (line.opcode === 'EXG') (line.lens[0] = 30);
    if (line.opcode === 'TFR') (line.lens[0] = 31);
    if (line.opcode === 'EXG' || line.opcode === 'TFR') {
      line.bytes = 2;
      if (line.params.length !== 2) {
        throw new Error(
          line.opcode + ' needs exactly 2 registers at line ' + line.numline
        );
      }
      const getRegisterIndex = function (e) {
        const registerIndex = (
          ['D', 'X', 'Y', 'U', 'S', 'PC', '', '', 'A', 'B', 'CC', 'DP']
          .indexOf(e.toUpperCase())
        );
        if (registerIndex < 0) throw new Error('Not recognized register name');
        return registerIndex;
      };
      line.lens[1] =
        (getRegisterIndex(line.params[0]) << 4) +
        getRegisterIndex(line.params[1]);
      return line;
    }
    const getPshPulRegisterIndex = function (e) {
      if (e.toUpperCase() === 'D') return 6;
      const registerIndex =
        ['CC', 'A', 'B', 'DP', 'X', 'Y', 'U', 'PC'].indexOf(e.toUpperCase());
      if (registerIndex < 0) throw new Error('Not recognized register name');
      return 1 << registerIndex;
    };
    if (line.opcode === 'PSHS') {
      line.bytes = 2;
      line.lens[0] = 52;
      line.lens[1] = 0;
      for (let i = 0; i < line.params.length; i++) {
        line.lens[1] |= getPshPulRegisterIndex(line.params[i]);
      }
      return line;
    }
    if (line.opcode === 'PULS') {
      line.bytes = 2;
      line.lens[0] = 53;
      line.lens[1] = 0;
      for (let i = 0; i < line.params.length; i++) {
        line.lens[1] |= getPshPulRegisterIndex(line.params[i]);
      }
      return line;
    }
    const getPshuPuluRegisterIndex = function (e) {
      if (e.toUpperCase() === 'D') return 6;
      const registerIndex =
        ['CC', 'A', 'B', 'DP', 'X', 'Y', 'S', 'PC'].indexOf(e.toUpperCase());
      if (registerIndex < 0) throw new Error('Not recognized register name');
      return 1 << registerIndex;
    };
    if (line.opcode === 'PSHU') {
      line.bytes = 2;
      line.lens[0] = 54;
      line.lens[1] = 0;
      for (let i = 0; i < line.params.length; i++) {
        line.lens[1] |= getPshuPuluRegisterIndex(line.params[i]);
      }
      return line;
    }
    if (line.opcode === 'PULU') {
      line.bytes = 2;
      line.lens[0] = 55;
      line.lens[1] = 0;
      for (let i = 0; i < line.params.length; i++) {
        line.lens[1] |= getPshuPuluRegisterIndex(line.params[i]);
      }
      return line;
    }
    if (opcodes) {
      // Inherhent address mode
      if (opcodes[0] >= 0) {
        if (opcodes[0] > 255) {
          line.lens = [opcodes[0] >> 8, 255 & opcodes[0]];
          line.bytes = 2;
        } else {
          line.lens = [opcodes[0]];
          line.bytes = 1;
        }
        return line;
      }

      // 1 parameter, not indirect
      if (
        line.params.length === 1 && // Single parameter
        line.params[0][0] !== '['   // Not indirect
      ) {
        line.bytes = 0;
        let stripPrefix = 0;
        let opcodesIndex = 0; // Inherent
        param1 = line.params[0];
        if (param1[0] === '#') {
          stripPrefix = 1;
          opcodesIndex = 5;
          if (opcodes[5] < 0 && opcodes[6] >= 0) opcodesIndex = 6;
        } else if (param1[0] === '<') {
          stripPrefix = 1;
          opcodesIndex = 1;
        } else if (param1[0] === '>') {
          stripPrefix = 1;
          opcodesIndex = 3;
        } else {
          if (opcodes[1] >= 0) opcodesIndex = 1; // Direct
          if (opcodes[3] >= 0) opcodesIndex = 3; // Extended
          if (opcodes[4] >= 0) opcodesIndex = 4; // Immediate-I8
          if (opcodes[7] >= 0) opcodesIndex = 7; // Relative
          const result = (function (e, r, vars) {
            if (vars._dp < 0 || vars._dp > 255) return false;
            try {
              term = Parser.evaluate(e, r);
              if (
                term !== null &&
                term !== undefined &&
                term >> 8 === vars._dp
              ) return true;
            } catch (e) {
              return false;
            }
            return false;
          })(param1, vars, line);
          if (result && opcodes[1] >= 0) opcodesIndex = 1;
        }

        if (opcodes[opcodesIndex] === -1) {
          throw new Error('Bad addressing mode at line ' + line.numline);
        }

        let evalFunction = null;
        if (opcodesIndex === 4) {
          evalFunction = function (e) {
            let term = Parser.evaluate(param1, e) - e._PC - 2;
            if (
              term > 127 ||
              term < -128
            ) throw new Error('Target out of range');
            if (term < 0) term = 256 + term;
            return term;
          };
        } else if (opcodesIndex === 7) {
          evalFunction = function (e) {
            let term = Parser.evaluate(param1, e) - e._PC - line.bytes;
            if (term < 0) term = 65536 + term;
            return term;
          };
        } else {
          if (opcodesIndex === 1 && line._dp !== 0) {
            const A = 256 * line._dp;
            evalFunction = function (e) {
              return Parser.evaluate(param1.substr(stripPrefix), e) - A;
            };
          } else {
            evalFunction = function (e) {
              return Parser.evaluate(param1.substr(stripPrefix), e);
            };
          }
        }

        const opcode = opcodes[opcodesIndex];
        if (opcode > 255) {
          line.lens = [opcode >> 8, 255 & opcode, evalFunction];
        } else {
          line.lens = [opcode, evalFunction];
        }
        line.bytes += (opcode > 255 ? 2 : 1);
        if (opcodesIndex === 1) {
          line.bytes++;
        } else if (opcodesIndex === 3) {
          line.bytes += 2;
          line.lens[line.bytes - 1] = null;
        } else if (opcodesIndex === 4) {
          line.bytes++;
        } else if (opcodesIndex === 5) {
          line.bytes++;
        } else if (opcodesIndex === 6) {
          line.bytes += 2;
          line.lens[line.bytes - 1] = null;
        } else if (opcodesIndex === 7) {
          line.bytes += 2;
          line.lens[line.bytes - 1] = null;
        }
        return line;
      }

      line.bytes = 0;
      // 1 parameter starting with '['
      if (line.params.length === 1 && line.params[0][0] === '[') {
        if (opcodes[2] > 256) {
          // CMPD, CMPY, LDY, STY, LDS, STS, CMPS, CMPU
          line.lens[line.bytes++] = opcodes[2] >> 8;
          line.lens[line.bytes++] = 255 & opcodes[2];
        } else {
          line.lens[line.bytes++] = opcodes[2];
        }
        line.lens[line.bytes++] = 159;
        param1 = line.params[0];
        line.lens[line.bytes++] = function (e) {
          return Parser.evaluate(param1.substr(1, param1.length - 2), e);
        };
        line.lens[line.bytes++] = null;
        return line;
      }

      if (opcodes[2] <= 0 || line.params.length !== 2) {
        throw new Error('Bad addressing mode at line ' + line.numline);
      }

      // Indexed addressing
      if (opcodes[2] > 256) {
        line.lens[line.bytes++] = opcodes[2] >> 8;
        line.lens[line.bytes++] = 255 & opcodes[2];
      } else {
        line.lens[line.bytes++] = opcodes[2];
      }

      param1 = line.params[0];
      param2 = line.params[1];

      // d = 0 for non-indirect addressing modes
      // or 16 for indirect addressing modes
      let indirectBit = 0;
      // Indirect addressing
      if (param1[0] === '[' && param2[param2.length - 1] === ']') {
        indirectBit = 16;
        param1 = param1.substr(1);
        param2 = param2.substr(0, param2.length - 1);
      }

      const registerBits = function (R) {
        const registerIndex = ['X', 'Y', 'U', 'S'].indexOf(R.toUpperCase());
        if (registerIndex < 0) {
          throw new Error(
            'Register name not recognized: ' + R
          );
        }
        return registerIndex << 5;
      };

      const registerOrPCBits = function (R) {
        if (
          R.toUpperCase() === 'PC' ||
          R.toUpperCase() === 'PCR'
        ) {
          return 4;
        }
        return registerBits(R);
      };

      // ',R', '[,R]', ',R+', ',R++', '[,R++], ',-R', ',--R', '[,--R]'
      if (param1 === '') { // no offset: ',R', '[,R]', ',R+', '[,R+]', etc.
        if (param2[0] === '-') {
          if (param2[1] === '-') {
            // predecrement by 2
            line.lens[line.bytes++] = 131 | registerBits(param2.substr(2)) | indirectBit;
          } else {
            // predecrement by 1
            if (indirectBit > 0) {
              throw new Error(
                'Cannot use predecrement with indirect addressing'
              );
            }
            line.lens[line.bytes++] = 130 | registerBits(param2.substr(1));
          }
        } else if (param2[1] === '+') {
          if (param2[2] === '+') {
            line.lens[line.bytes++] = 129 | registerBits(param2.substr(0, 1)) | indirectBit;
          } else {
            if (indirectBit > 0) {
              throw new Error(
                'Cannot use postincrement with indirect addressing'
              );
            }
            line.lens[line.bytes++] = 128 | registerBits(param2.substr(0, 1));
          }
        } else {
          line.lens[line.bytes++] = 132 | registerBits(param2) | indirectBit;
        }
        return line;
      }

      // 'A,R' or '[A,R]'
      if (param1.toUpperCase() === 'A') {
        line.lens[line.bytes++] = 134 | registerBits(param2) | indirectBit;
        return line;
      }
      // 'B,R' or '[B,R]'
      if (param1.toUpperCase() === 'B') {
        line.lens[line.bytes++] = 133 | registerBits(param2) | indirectBit;
        return line;
      }
      // 'D,R' or '[D,R]'
      if (param1.toUpperCase() === 'D') {
        line.lens[line.bytes++] = 139 | registerBits(param2) | indirectBit;
        return line;
      }

      // 'n,R' or '[n,R]' where n may be an expression
      // n may be 5bit, 8bit or 16bit, two's complement
      try {
        // Variables may not be defined in the first pass
        // In which chase this will throw.
        term = Parser.evaluate(param1, vars);
      } catch (e) {
        term = null;
      }
      if (
        term !== null &&
        term > 0xFFEF &&
        term < 0x10000 &&
        registerOrPCBits(param2) !== 4 &&
        indirectBit === 0
      ) {
        // 5-bit offset, non-indirect only
        // where offset is 16-bit two's complement
        // e.g. '0xFFFF,R'
        // TODO: is this legit?
        // Given this, there are 16bit offsets that are unavailable
        line.lens[line.bytes++] =
          registerBits(param2) | 32 - (65536 - term) & 31;
      } else if (
        term !== null &&
        term < 16 &&
        term > -17 &&
        registerOrPCBits(param2) !== 4 &&
        indirectBit === 0
      ) {
        // 5-bit offset, non-indirect only
        line.lens[line.bytes++] = registerBits(param2) | 31 & term;
      } else if (term !== null && term < 128 && term > -129) {
        // 8-bit offset, indirect or non-indirect
        if (term < 0) term = 256 + term;
        line.lens[line.bytes++] = registerBits(param2) | indirectBit | 136;
        line.lens[line.bytes++] = term;
      } else if (term !== null && term < 32768 && term > -32769) {
        // 16-bit offset, indirect or non-indirect
        line.lens[line.bytes++] = registerBits(param2) | indirectBit | 137;
        line.lens[line.bytes++] = term >> 8;
        line.lens[line.bytes++] = 0xFF & term;
      } else if (term === null) {
        // Unresolved term, could end up being 16bit
        line.lens[line.bytes++] = registerBits(param2) | indirectBit | 137;
        line.lens[line.bytes++] = function (e) {
          return Parser.evaluate(param1, e);
        };
        line.lens[line.bytes++] = null;
      } else {
        throw new Error('16-bit offset overflow: ' + term);
      }
      return line;
    }
    return null;
  },
};
