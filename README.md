Dopie
=================

A cli to download One Piece from the [OpEx](https://onepieceex.net)

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/@fabyosk/dopie)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/FabyoSK/dopie/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @fabyosk/dopie
$ dopie COMMAND
running command...
$ dopie (--version)
@fabyosk/dopie/0.1.0 darwin-x64 node-v18.11.0
$ dopie --help [COMMAND]
USAGE
  $ dopie COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dopie ep EPISODE QUALITY`](#dopie-ep-episode-quality)

## `dopie ep EPISODE QUALITY`

Download a given episode

```
USAGE
  $ dopie ep [EPISODE] [QUALITY]

ARGUMENTS
  EPISODE  Desire episode to download
  QUALITY  Desire quality to download

DESCRIPTION
  Download a given episode

EXAMPLES
  $ dopie ep 1042 hd
```

_See code: [dist/commands/ep/index.ts](https://github.com/FabyoSK/dopie/blob/v0.1.0/dist/commands/ep/index.ts)_
<!-- commandsstop -->
