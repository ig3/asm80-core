import t from '@ig3/test';

import * as utils from '../utils/utils.js';

t.test('Number of methods', t => {
  t.equal(Object.keys(utils).length, 7, 'Number of methods');
  t.end();
});

t.test('nonempty', t => {
  const lines = [
    { line: '' },
    { line: ' ' },
    { line: '  ' },
    { line: '                                                             ' },
    { line: 'x' },
    { line: ' x' },
    { line: 'x ' },
    { line: ' x ' },
    { line: 'x' },
    { line: '  x' },
    { line: 'x  ' },
    { line: '  x  ' },
  ];
  const result = utils.nonempty(lines);
  t.equal(result.length, 8, 'Empty lines removed');
  t.end();
});

t.test('norm', t => {
  t.test('&lt;', t => {
    const result = utils.norm([
      { line: 'a &lt; b' },
      { line: 'a &lt;&lt; b' },
      { line: 'a &lt; b &lt; c' }
    ]);
    t.deepEqual(result,
      [
        { line: 'a < b' },
        { line: 'a << b' },
        { line: 'a < b < c' }
      ],
      '&lt; is changed to "<"'
    );
    t.end();
  });
  t.test('&gt;', t => {
    const result = utils.norm([
      { line: 'a &gt; b' },
      { line: 'a &gt;&gt; b' },
      { line: 'a &gt; b &gt; c' }
    ]);
    t.deepEqual(result, [
      { line: 'a > b' },
      { line: 'a >> b' },
      { line: 'a > b > c' }
    ],
    '&gt; is changed to ">"'
    );
    t.end();
  });
  t.test('Trailing space removed', t => {
    const result = utils.norm([
      { line: 'x        ' }
    ]);
    t.deepEqual(result, [
      { line: 'x' }
    ],
    'all trailing space is removed'
    );
    t.end();
  });
  t.test('Leading space collapsed to single space', t => {
    const result = utils.norm([
      { line: '   x' }
    ]);
    t.deepEqual(result, [
      { line: ' x' }
    ],
    'leading space is collapsed to a single space'
    );
    t.end();
  });
  t.end();
});

t.test('toHex2', t => {
  t.equal(utils.toHex2(0), '00', 'two digits');
  t.equal(utils.toHex2(0x0a), '0A', 'Upper case alpha');
  t.equal(utils.toHex2(0x10a), '0A', 'Excess leading digits ignored');
  t.equal(utils.toHex2(-1), 'FF', 'Negative 1');
  t.equal(utils.toHex2(-2), 'FE', 'Negative 2');
  t.end();
});
t.test('toHex4', t => {
  t.equal(utils.toHex4(0), '0000', 'four digits');
  t.equal(utils.toHex4(0x0a), '000A', 'Upper case alpha');
  t.equal(utils.toHex4(0xffff), 'FFFF', 'Maximum');
  t.equal(utils.toHex4(0x10000), '0000', 'Overflow');
  t.equal(utils.toHex4(-1), 'FFFF', 'Negative 1');
  t.equal(utils.toHex4(-2), 'FFFE', 'Negative 2');
  t.end();
});
t.test('toHex6', t => {
  t.equal(utils.toHex6(0), '000000', 'six digits');
  t.equal(utils.toHex6(0x0a), '00000A', 'Upper case alpha');
  t.equal(utils.toHex6(0xffffff), 'FFFFFF', 'Maximum');
  t.equal(utils.toHex6(0x1000000), '000000', 'Overflow');
  t.equal(utils.toHex6(-1), 'FFFFFF', 'Negative 1');
  t.equal(utils.toHex6(-2), 'FFFFFE', 'Negative 2');
  t.end();
});
t.test('toHex8', t => {
  t.equal(utils.toHex8(0), '00000000', '0');
  t.equal(utils.toHex8(0x0a), '0000000A', 'Upper case alpha');
  t.equal(utils.toHex8(1), '00000001', '1');
  t.equal(utils.toHex8(0xffffffff), 'FFFFFFFF', 'Maximum');
  t.equal(utils.toHex8(0x100000000), '00000000', 'Overflow');
  t.equal(utils.toHex8(-1), 'FFFFFFFF', 'Negative 1');
  t.equal(utils.toHex8(-2), 'FFFFFFFE', 'Negative 2');
  t.end();
});
t.test('toInternal', t => {
  t.deepEqual(
    utils.toInternal('a\nb'),
    [
      { line: 'a', numline: 1, addr: null, bytes: 0 },
      { line: 'b', numline: 2, addr: null, bytes: 0 },
    ],
    'To internal representation');
  t.end();
});
