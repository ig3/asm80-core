/// <reference path="../expression-parser.js" />

import {I8080} from "../cpu/i8080.js";

//QUnit test for expression-parser.js

import QUnit from "qunit";

import {Parser} from "../expression-parser.js";


QUnit.module('expression-parser');
QUnit.config.hidepassed = true;




const doParse = (data) => {
    try {

    
    let lines = Parser.evaluate(data);
    //console.log(Parser.parse(data).tokens.map(x=>x.toString()))
    return lines
    } catch (e) {
        console.log(e)
        return e
    }
}


QUnit.test('vanilla', assert => {
  assert.equal(doParse(`2+3*4`), 14, "2+3*4");
});

QUnit.test('2PI', assert => {
    assert.equal(doParse(`2*5`), 10, "2+3*4");
    assert.equal(doParse(`0x10`), 16, "0x10");
    assert.equal(doParse(`$10`), 16, "$10");
    assert.equal(doParse(`1 + +1 \t \n \r`), 2, "$10");

    assert.equal(doParse(`lsb(2)`), 2, "2+3*4");
  });
  

  
QUnit.test("(2+3*4", assert => {
    assert.throws(() => {
        let data = `(2+3*4`
        Parser.parse(data);
    })
})


  
QUnit.test("(2+3*4))", assert => {
    assert.throws(() => {
        let data = `(2+3*4))`
        Parser.parse(data);
    })
})