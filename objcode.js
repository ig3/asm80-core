const get16 = (s, endian = false) => {
  const a = s.lens[s.wia];
  const b = s.lens[s.wia + 1];
  if (endian) {
    return (a << 8) | b;
  } else {
    return (b << 8) | a;
  }
};
const put16 = (s, v, endian = false) => {
  const a = v & 0xff;
  const b = (v >> 8) & 0xff;
  if (endian) {
    s.lens[s.wia] = b;
    s.lens[s.wia + 1] = a;
  } else {
    s.lens[s.wia] = a;
    s.lens[s.wia + 1] = b;
  }
};

// generate object code from the parsed assembly

export const objCode = (V, vars, opts, moduleName = 'noname') => {
  const out = [];
  const externs = [];
  const used = [];
  const exports = {};

  const varsSegs = {};
  for (const ln of V) {
    if (ln.label) {
      varsSegs[ln.label.toUpperCase()] = ln.segment;
    }
  }

  const seglen = {
    CSEG: 0,
    DSEG: 0,
    ESEG: 0,
    BSSEG: 0,
  };

  let lastOne = null;

  for (const ln of V) {
    if (!ln.opcode) {
      continue;
    }
    if (ln.ifskip) {
      continue;
    }

    const op = {
      lens: ln.lens,
      segment: ln.segment,
    };

    const opcode = ln.opcode;
    if (opcode === '.EXTERN') {
      // must resolve the address
      let name = ln.params[0];
      if (!name) name = ln.label;
      externs.push(name.toUpperCase());
    }
    if (opcode === '.EXPORT') {
      // must export this var
      let name = ln.params[0];
      // if (!name) name = ln.label
      name = name.toUpperCase();
      exports[name] = { addr: vars[name], seg: varsSegs[name] };
    }

    // BSS reserved space
    if (ln.segment === 'BSSEG') {
      seglen.BSSEG += ln.bytes;
      continue;
    }

    if (!ln.lens || !ln.lens.length) continue;

    // seglen++
    seglen[ln.segment] += ln.lens.length;

    // is there some variables used?
    if (ln.usage && ln.usage.length) {
      // op.dirty = true;
      const usage = ln.usage;
      for (const u of usage) {
        if (externs.indexOf(u) < 0) {
          // internal variable
          op.rel = true;
          op.relseg = varsSegs[u];
        } else {
          op.ext = u;
          used.push(u);
        }
      }
      op.add = get16(ln, opts.endian);
      op.wia = ln.wia;
    }

    // is this only code? And the last one?
    if (typeof op.rel === 'undefined' && typeof op.ext === 'undefined' && lastOne && lastOne.segment === op.segment) {
      // join them
      lastOne.lens = lastOne.lens.concat(op.lens);
      continue;
    }

    out.push(op);
    if (typeof op.rel === 'undefined' && typeof op.ext === 'undefined') {
      lastOne = op;
    } else {
      lastOne = null;
    }
  }

  /**
     * code: array of instructions
     * instruction:
     * {
     *      lens: array of bytes (mandatory)
     *      segment: segment where the instruction is (mandatory)
     *      rel: if the instruction has a relative address (optional)
     *      relseg: segment of the relative address (optional)
     *      ext: if the instruction has an external address (optional)
     *      add: the address to add to the external address (optional)
     *      wia: where is the address in the instruction (optional)
     *      resolved: the resolved address (optional, defined by linker)
     *      base: the base address for the relative address (optional, defined by linker)
     * }
     */

  return {
    code: out, // the code itself
    externs: used, // foreign labels
    exports: exports, // labels to use outside
    cpu: opts.assembler.cpu, // cpu id
    endian: opts.assembler.endian, // endianness
    name: moduleName, // module name
    seglen: seglen, // segment lengths
  };
};

// linkModules

// findInLibrary
/**
 *
 * @param {*} name
 * @param {*} library
 * @returns the module in the library, null if not found
 */
const findInLibrary = (name, library) => {
  for (let i = 0; i < library.length; i++) {
    const mod = library[i];
    const exports = Object.keys(mod.exports);
    if (exports.indexOf(name) >= 0) {
      return mod;
    }
  }
  return null;
};

// addModule

const addModule = (mod, st, out) => {
  // module processor
  const cbase = st.caddr;
  const dbase = st.daddr;
  const ebase = st.eaddr;
  const bsbase = st.bsaddr;
  // resolve vars
  for (const k in mod.exports) {
    const v = mod.exports[k];
    if (typeof st.resolves[k] === 'undefined') {
      throw new Error('Variable ' + k + ' is not resolved');
    }
    if (v.seg === 'CSEG') v.addr += st.caddr;
    else if (v.seg === 'DSEG') v.addr += st.daddr;
    else if (v.seg === 'ESEG') v.addr += st.eaddr;
    else if (v.seg === 'BSSEG') v.addr += st.bsaddr;
    st.resolves[k] = v;
    // remove K from notresolved
    st.notresolved = st.notresolved.filter((item) => item !== k);
  }
  for (const s of mod.code) {
    let addr = st.caddr;
    if (s.segment === 'DSEG') addr = st.daddr;
    else if (s.segment === 'ESEG') addr = st.eaddr;
    else if (s.segment === 'BSSEG') addr = st.bsaddr;
    s.addr = addr;
    // new address in the given segment
    addr += s.lens.length;
    if (s.segment === 'CSEG') st.caddr = addr;
    else if (s.segment === 'DSEG') st.daddr = addr;
    else if (s.segment === 'ESEG') st.eaddr = addr;
    else if (s.segment === 'BSSEG') st.bsaddr = addr;
    // local relocs
    if (s.rel) {
      if (s.relseg === 'CSEG') s.base = cbase;
      else if (s.relseg === 'DSEG') s.base = dbase;
      else if (s.relseg === 'ESEG') s.base = ebase;
      else if (s.relseg === 'BSSEG') s.base = bsbase;
    }
    // no unresolved at this point
    /*
        if (s.ext) {
            if (!st.resolves[s.ext]) {
                //we need to resolve this external
                //console.log("Not resolved yet: "+s.ext)
                st.notresolved.push(s.ext)
            }
        }
        */
    out.push(s);
  }
  return st;
};

export const linkModules = (data, modules, library) => {
  const entrypoint = data.entrypoint ? data.entrypoint.toUpperCase() : '_MAIN';

  const out = [];
  const resolves = {};
  let notresolved = [];
  for (const v in data.vars) {
    const val = parseInt(data.vars[v]);
    resolves[v] = { addr: val, seg: null };
  }
  // console.log("PASS1: Resolves init: ", resolves)

  // resolve references
  const resolveModule = (mod) => {
    // module needs to be resolved
    for (const k of mod.externs) {
      if (resolves[k]) {
        continue;
      }
      if (notresolved.indexOf(k) < 0) {
        notresolved.push(k);
      }
    }

    for (const k in mod.exports) {
      if (resolves[k]) {
        throw new Error('Variable ' + k + ' is already defined');
      }
      resolves[k] = mod.exports[k];
      notresolved = notresolved.filter((item) => item !== k);
    }
  };

  for (const mod of modules) {
    // take each module and check externs/exports
    // TODO: Should this resolveModule(k)???
    // eslint-disable-next-line no-unused-vars
    for (const k in mod.exports) {
      resolveModule(mod);
    }
  }
  while (notresolved.length) {
    const name = notresolved.pop();
    const mod = findInLibrary(name, library);
    if (mod) {
      resolveModule(mod);
      // add module to the module list
      modules.push(mod);
    } else {
      throw new Error('PASS1 Unresolved external ' + name);
    }
  }

  // all modules are resolved now
  // console.log("PASS1: Resolved: ", resolves, notresolved)
  // console.log("PASS1: Modules: ", modules.map(q=>q.name))

  const seglen = {
    CSEG: 0,
    DSEG: 0,
    ESEG: 0,
    BSSEG: 0,
  };

  // How long are the segments?
  for (const mod of modules) {
    for (const s in mod.seglen) {
      seglen[s] += mod.seglen[s];
    }
  }
  // console.log("PASS1: Seglen: ", seglen)

  const CSEG = data.segments.CSEG ? parseInt(data.segments.CSEG) : 0;
  const DSEG = data.segments.DSEG ? parseInt(data.segments.DSEG) : CSEG + seglen.CSEG;
  const ESEG = data.segments.ESEG ? parseInt(data.segments.ESEG) : DSEG + seglen.DSEG;
  const BSSEG = data.segments.BSSEG ? parseInt(data.segments.BSSEG) : ESEG + seglen.ESEG;
  const caddr = CSEG;
  const daddr = DSEG;
  const eaddr = ESEG;
  const bsaddr = BSSEG;

  /*
    //drop all, do it again then
    notresolved=[]
    resolves = {}
    for (let v in data.vars) {
        let val = parseInt(data.vars[v])
        resolves[v] = {addr:val,seg:null}
    }
    */
  let state = { caddr, daddr, eaddr, bsaddr, resolves, notresolved, library };

  // add all modules we have specified in link recipe
  for (const mod of modules) {
    state = addModule(mod, state, out);
  }

  // with pre-resolving, we don't need this anymore
  /*
    //still not resolved?!
    console.log("Not resolved: ", state.notresolved)
    while (state.notresolved.length) {
        let name = state.notresolved.pop()
        let mod = findInLibrary(name, library)
        console.log("Resolving "+name, mod)
        if (mod) {
            state = addModule(mod, state, out)
        } else {
            throw {msg:"Unresolved external "+name}
        }
    }
    */

  // resolves
  for (const s of out) {
    if (s.ext) {
      if (resolves[s.ext]) {
        s.resolved = resolves[s.ext].addr;
      } else {
        throw new Error('Unresolved external ' + s.ext);
      }
    }
  }

  // internal relocs
  for (const s of out) {
    if (s.rel) {
      // let add = get16(s, data.endian)
      // s.add = add
      const base = s.base;
      put16(s, s.add + base, data.endian);
    }
  }

  // external relocs
  for (const s of out) {
    if (s.resolved) {
      // let add = get16(s, data.endian)
      // s.add = add
      const base = s.resolved;
      put16(s, s.add + base, data.endian);
    }
  }

  //    console.log("PASS2: CSEG", CSEG, "DSEG", DSEG, "ESEG", ESEG, "BSSEG", BSSEG)

  // cleaning
  for (const s of out) {
    delete s.rel;
    delete s.relseg;
    delete s.ext;
    delete s.add;
    delete s.wia;
    delete s.base;
    delete s.resolved;
  }

  out.sort((a, b) => a.addr - b.addr);

  return {
    // notresolved,
    CSEG: CSEG,
    DSEG: DSEG,
    ESEG: ESEG,
    BSSEG: BSSEG,
    seglen: seglen,
    entry: resolves[entrypoint],
    dump: out,

  };

  /*
    return {
        CSEG, DSEG, ESEG, BSSEG: addresses of segments
        seglen: lengths of segments
        entry: entry point
        code: array of instructions/data
    }

    code:
    {
        lens: array of bytes
        addr: address
        segment: segment
    }

    */
};
