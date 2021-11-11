# Nandu CLI

Nandu Open NPM Registry CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/nandu-cli.svg)](https://npmjs.org/package/nandu-cli)
[![Downloads/week](https://img.shields.io/npm/dw/nandu-cli.svg)](https://npmjs.org/package/nandu-cli)
[![License](https://img.shields.io/npm/l/nandu-cli.svg)](https://github.com/taskforcesh/nandu-cli/blob/master/package.json)

<!-- toc -->

- [Quick Start](#quickstart)
- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Quick Start

In order to quickly get a working Nandu NPM registry you can follow this steps and recommendations.

Nandu uses env variables for configuring all its settings, inclusive the ROOT user credentials. The root
user is the one that can bootstrap the service, by creating new users and so on. Also the root user
has godlike permissions, therefore it is important to only use it for bootstrapping, and the first thing to
do is to create a new user and give it "admin" permissions.

When you start Nandu for the first time it will create such root user that you can then use to interact with the
registry. 

```bash
$ nandu start
Nandu is running on port 4567.
```

You will get a lot of debug logs unless you set ```NODE_ENV``` to ```production```.

By default Nandu will use Sqlite for storing the registry metadata, and the database file will be
stored at ```./storage/db/nandu.db```. You can change this setting with the ```NANDU_SEQUELIZE_URI``` env
variable.

The next step is to create an authentication token for the root user, you need to use the nandu cli for this as well,

```bash
$ nandu token:create root
username: root
password: ******

New token created for user root {
  id: 'ad4ac909-2cea-40ba-be4e-03ec4fbb57bf',
  token: 'c0463461-23fb-4642-a927-820b0d71ffb8',
  readonly: false,
  created: '2021-11-11T08:09:47.532Z'
}
```

You can create tokens on behalf of other users if the user you use for creating the tokens has the correct permissions.





# Usage

<!-- usage -->

```sh-session
$ npm install -g nandu-cli
$ nandu COMMAND
running command...
$ nandu (-v|--version|version)
nandu-cli/1.0.0 darwin-x64 node-v14.17.6
$ nandu --help [COMMAND]
USAGE
  $ nandu COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

- [`nandu start`](#nandu-start)
- [`nandu help [COMMAND]`](#nandu-help-command)

## `nandu start`

Starts the Nandu NPM Registry.

```
USAGE
  $ nandu start

OPTIONS
  -h, --help       show CLI help
  -p, --port=port  port to use for the Nandu registry service

EXAMPLE
  $ nandu start -p 4568
  Nandu is running on port 4568.
```

_See code: [src/commands/start.ts](https://github.com/taskforcesh/nandu-cli/blob/v1.0.0/src/commands/start.ts)_

## `nandu help [COMMAND]`

Display help for nandu

```
USAGE
  $ nandu help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.4/src/commands/help.ts)_

<!-- commandsstop -->
