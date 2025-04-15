# @ig3/asm80-core
This repository contains an assembler supporting multiple CPU architectures
as an ES6 module and with a command line interface.

## Installation

```
$ npm install @ig3/asm80-core
```

## Usage

```
import {asm,lst,ihex} from '@ig3/asm80-core';
import {readFileSync, writeFileSync} from 'node:fs';
import * as fs from 'node:fs/promises';

const result = await asm.compile(
  readFileSync('program.a09'),
  fs,
  {assembler: 'M6809'}
);
writeFileSync(
  'program.lst',
  lst(result, true, false)
);
writeFileSync(
  'program.hex',
  ihex(result)
);
```

See asm80-core.js and the tests for more complete examples.

### CLI

```
$ asm80-core file
```

## Background
[This](https://github.com/ig3/asm80-core)
is a fork of
[asm80/asm80-core](https://github.com/asm80/asm80-core)
which appears to be an update to
[asm80/asm80-node](https://github.com/asm80/asm80-node).

The former was updated as recently as Mar 2024 while the latter has not
been updated since Aug 2020.

The asm80/asm80-node assembler has support for the M6809 processor but with
a bug affecting indirect addressing mode, reported in
[Issue#17 - M6809 JSR [1,x] is assembled to AD 11 but should be AD 98 01](https://github.com/asm80/asm80-node/issues/17).

The asm80/asm80-core assembler does not have support for the M6809
processor or a command line interface. Also, significant parts of it are
minified with the unminified code not in the repository. This makes it
difficult to investigate and fix bugs.

So I created this fork to add support for the M6809 processor and to add a
command line interface. In passing, I have somewhat de-minified the parts
of the code relevant to the bug. In particular, the parseOpcode function in
cpu/m6809.js. It's still a mess and not well tested, but better than it
was.

I did this to compile and play with some code that I wrote for M6809 long
ago. I don't have much ongoing need for it, so it probably won't get much
attention. You will probably be better off using and supporting the
original.

## Old README
Core assembler as ES6 module

Currently I am converting codebase from 2010's form to modern. Please be patient. [Support my effort to rewrite and open the source code](https://donate.stripe.com/7sI8yU7jCbzp4wMeUX)

## Alpha stage

!!! Use on your own risk !!!

It works, but not documented yet and the API is not settled yet. [NPM is available](https://www.npmjs.com/package/@asm80/core)

[Code Unit Tests Coverage](https://asm80.github.io/asm80-core/coverage/index.html)

## IDE (aka https://asm80.com)

See [https://github.com/asm80/webide](https://github.com/asm80/webide)

## about ASM80

ASM80.com is a cutting-edge online development environment for 8-bit microprocessors, providing developers and hobbyists a simple and user-friendly way to create, code, and interact with their retro computing projects. Over the 10 years, I've worked hard to improve and maintain this unique platform, but now, it's time for a change.

The technology landscape and best practices have evolved exponentially since the inception of our platform. In order to keep up with these advancements, I must dedicate the time and resources needed to bring our beloved development environment into the modern age. My vision involves overhauling the entire platform, implementing modern technologies, simplifying our expansion, and most importantly, making it available as an open-source project for everyone to use, collaborate, and contribute.

The challenge: This mammoth task cannot be accomplished in the little spare time I have outside my full-time job. To make this vision a reality, I need funding support so I can fully commit and focus on recreating our 8-bit microprocessor development environment to its full potential.

By supporting my effort, you'll help breathe new life into our development platform, benefiting 8-bit microprocessor enthusiasts all around the globe. By doing so, you'll also play your part in expanding the open-source movement, championing collaboration and innovation across the tech industry.

Your contributions will go towards:

- Development costs: Funding will enable me to focus fully on this project and pay for hosting, database, ads etc.
- Increased collaboration: Opening our platform as open-source will enable a wealth of like-minded developers to contribute their expertise and innovations.
- Time: Your generous contributions will allow me to allocate the necessary time and energy required to oversee and direct this major undertaking, ensuring top quality and efficiency every step of the way.

<img src="https://asm80.github.io/asm80-core/docs/qr_7sI8yU7jCbzp4wMeUX.png" width="300px">


