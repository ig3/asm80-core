import {I8080} from "../cpu/i8080.js";
import {lst, html} from "../listing.js"

import fs from "fs";

import { pass1 } from "../pass1.js";
import {pass2} from "../pass2.js";
import {objCode, linkModules} from "../objcode.js"

//QUnit test for parser.js

import QUnit from "qunit";

import * as Parser from "../parser.js";
import { get } from "http";
import { parse } from "path";

QUnit.module('relocable');

let asmREL = fs.readFileSync("./test/suite/relocable.a80","utf-8");
let asmREL1 = fs.readFileSync("./test/suite/relocable1.a80","utf-8");
let asmREL2 = fs.readFileSync("./test/suite/relocable2.a80","utf-8");
let asmLNK = JSON.parse(fs.readFileSync("./test/suite/relocable.lnk","utf-8"));
const fileGet = (filename) => {
    //console.log("INCLUDE", filename)
    return `nop
    .block blk
    oma: dw 1
    .endblock`
}

const doPass = (data, showError=false, assembler=I8080, name="") => {
    let opts = {assembler, fileGet, PRAGMAS:[], endian:assembler.endian,}
    
    try {
        let o = Parser.parse(data, opts);
    //console.log("BEUAbc",o)
    let vx = pass1(o, null, opts)
    vx = pass1(vx[0], vx[1], opts);
    vx = pass1(vx[0], vx[1], opts);
    vx = pass1(vx[0], vx[1], opts);
    vx = pass1(vx[0], vx[1], opts);

    vx[1]["__PRAGMAS"] = opts.PRAGMAS;
    //console.log(ASM.PRAGMAS,vx[1])
    vx = pass2(vx, opts);
    //console.log("VARS",vx[1])
    //console.log("XREF",opts.xref)

    if (showError==2) console.log(vx)
    let l = lst(vx[0],vx[1],false, true,opts)
    if (name) fs.writeFileSync("./test/suite/"+name+".lst",l)
    if (name) fs.writeFileSync("./test/suite/"+name+".dump",JSON.stringify(vx[0],null,2))
    let obj = objCode(vx[0],vx[1],opts,name)
    if (name) fs.writeFileSync("./test/suite/"+name+".obj",JSON.stringify(obj,null,2))
    let l2 = lst(vx[0],vx[1], true, false, opts)
    let www = html(vx[0],vx[1],false, true,opts)
    let www2 = html(vx[0],vx[1],true, false,opts)
    if (showError==3)console.log(l)
    return vx
    } catch (e) {
        if (showError)console.log(JSON.stringify(e))
        if (e.e) throw e.e
        throw e
    }
}




const doLink = (data, showError=false, assembler=I8080, name="") => {
    let modules = data.modules.map(m => {
        let f = JSON.parse(fs.readFileSync("./test/suite/"+m+".obj","utf-8"))
        return f
    })
    let library = data.library.map(m => {
        let f = JSON.parse(fs.readFileSync("./test/suite/"+m+".obj","utf-8"))
        return f
    })

    data.endian = assembler.endian

    let out = linkModules(data,modules, library)

    fs.writeFileSync("./test/suite/"+name+".combined",JSON.stringify(out,null,2))    
}


QUnit.test('relocable 8080', assert => {
    doPass(asmREL, true, I8080, "relocable")
    assert.ok(true)
});
QUnit.test('relocable1 8080', assert => {
    doPass(asmREL1, true, I8080, "relocable1")
    assert.ok(true)
});

QUnit.test('relocable2 8080', assert => {
    doPass(asmREL2, true, I8080, "relocable2")
    assert.ok(true)
});

QUnit.test('link 8080', assert => {
    doLink(asmLNK, true, I8080, "relocable")
    assert.ok(true)
});
