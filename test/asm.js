import { asm } from '../asm.js';

import fs from 'fs';

import { fileSystem } from './_asyncFilesystem.js';
import { ihex } from '../utils/ihex.js';
import { isrec, isrec28 } from '../utils/srec.js';
import { lst, html } from '../listing.js';

// QUnit test for parser.js

import QUnit from 'qunit';

QUnit.module('asm');

const asmREL = fs.readFileSync('./test/suite/relocable.a80', 'utf-8');
const asmREL1 = fs.readFileSync('./test/suite/relocable1.a80', 'utf-8');
// const asmREL2 = fs.readFileSync('./test/suite/relocable2.a80', 'utf-8');
const asmLNK = JSON.parse(fs.readFileSync('./test/suite/relocable.lnk', 'utf-8'));

/*
const test_async = async (ok) => {
    if (ok) return 1
    throw "Not OK"
}
*/
import { asyncThrows } from './_asyncThrows.js';
/*
QUnit.test('simple async OK', async assert => {
    //const done = assert.async();
    assert.equal(await test_async(true),1)
    //done()
});

QUnit.test('simple async throw', async assert => {
    asyncThrows(assert, ()=>test_async(false))
});
*/

QUnit.test('relocable 8080 - no asm spec', async assert => {
  // const done = assert.async();

  asyncThrows(assert, () =>

    asm.compile(asmREL, fileSystem, {})

  );
  // done()
});

QUnit.test('relocable 8080 - errr', async assert => {
  asyncThrows(assert, () =>
    asm.compile('Total bullshit', fileSystem, { assembler: 'I8080' })
  );
});

QUnit.test('undefined var', async assert => {
  asyncThrows(assert, () =>
    asm.compile('MVI undef', fileSystem, { assembler: 'I8080' })
  );
});

QUnit.test('relocable 8080', async assert => {
  const { obj } = await asm.compile(asmREL, fileSystem, { assembler: 'I8080' });
  assert.ok(typeof obj === 'object');
  await fileSystem.writeFile('relocable.obj', JSON.stringify(obj, null, 2));
  console.log('DT', await fileSystem.mtime('relocable.obj'));
});
QUnit.test('relocable1 8080', async assert => {
  const { obj } = await asm.compile(asmREL1, fileSystem, { assembler: 'I8080' });
  assert.ok(typeof obj === 'object');
  await fileSystem.writeFile('relocable1.obj', JSON.stringify(obj, null, 2));
});

QUnit.test('relocable2 8080', async assert => {
  const { obj } = await asm.compileFromFile('relocable2.a80', fileSystem, { assembler: 'I8080' });
  assert.ok(typeof obj === 'object');
  await fileSystem.writeFile('relocable2.obj', JSON.stringify(obj, null, 2));
});

QUnit.test('relocable2 Z80', async assert => {
  try {
    const { obj } = await asm.compileFromFile('relocable2z.z80', fileSystem, { assembler: 'Z80' });
    assert.ok(typeof obj === 'object');
    await fileSystem.writeFile('relocable2z.obj', JSON.stringify(obj, null, 2));
  } catch (e) {
    console.log(e);
  }
});

QUnit.test('link 8080', async assert => {
  await asm.link(asmLNK, fileSystem, 'relocable');
  assert.ok(true);
});

QUnit.test('link 8080 - all segs', async assert => {
  const lnk = {
    segments: {
      CSEG: '10',
      DSEG: '20',
      ESEG: '30',
      BSSEG: '40',
    },
    vars: {
      BIOS_PRINT: '0x5'
    },
    modules: ['relocable'],
    library: ['relocable1', 'relocable2'],

    entrypoint: 'main'
  };
  await asm.link(lnk, fileSystem, 'relocable');
  assert.ok(true);
});

QUnit.test('link 8080 - errr', async assert => {
  asyncThrows(assert, () =>
    asm.link({ modules: ['nonexistent'] }, fileSystem, 'relocable')
  );
});

QUnit.test('link 8080 - errr2', async assert => {
  asyncThrows(assert, () =>
    asm.link({ modules: ['relocable'] }, fileSystem, 'relocable')
  );
});

QUnit.test('link 8080+Z80', async assert => {
  asyncThrows(assert, () => {
    return asm.link({ modules: ['relocable', 'relocable2z'] }, fileSystem, 'relocable');
  });
});

QUnit.test('link 8080+Z80', async assert => {
  asyncThrows(assert, () => {
    return asm.link({ modules: ['relocable'], library: ['relocable2z'] }, fileSystem, 'relocable');
  });
});

QUnit.test('link 8080 - errr3', async assert => {
  asyncThrows(assert, () => {
    return asm.link({ modules: ['relocable'], library: ['nonexistent'] }, fileSystem, 'relocable');
  });
});

QUnit.test('link 8080 - errr4', async assert => {
  asyncThrows(assert, () => {
    return asm.link({ modules: ['relocable'], library: ['relocable'] }, fileSystem, 'relocable');
  });
});

QUnit.test('link 8080 - errr5', async assert => {
  const lnk = {
    segments: {
      CSEG: '10'
    },
    vars: {
      BIOS_PRINT: '0x5'
    },
    modules: ['relocable1', 'relocable1'],
    library: ['relocable2'],

    entrypoint: 'main'
  };
  asyncThrows(assert, () => {
    return asm.link(lnk, fileSystem, 'relocable');
  });
});

QUnit.test('hex', async assert => {
  const result = await asm.compileFromFile('test.a80', fileSystem, { assembler: 'I8080' });
  assert.ok(typeof result.dump === 'object');
  const listing = lst(result, true, false);
  await fileSystem.writeFile('test.a80.lst', listing);
  const htmlList = html(result, true, false);
  await fileSystem.writeFile('test.a80.html', htmlList);
  const hex = ihex(result);
  await fileSystem.writeFile('test.a80.hex', hex);
  // check
  const hexmaster = await fileSystem.readFile('test.a80.master.hex');
  assert.equal(hex, hexmaster);
});

QUnit.test('hex2', async assert => {
  const result = await asm.compileFromFile('tinybasic.a80', fileSystem, { assembler: 'I8080' });
  // fileSystem.writeFile("tinybasic.a80.obj", JSON.stringify(result,null,2))
  assert.ok(typeof result.dump === 'object');
  const hex = ihex(result);
  isrec(result);
  isrec28(result);
  await fileSystem.writeFile('tinybasic.a80.hex', hex);
  // check
  const hexmaster = await fileSystem.readFile('tinybasic.a80.master.hex');
  assert.equal(hex, hexmaster);
});
