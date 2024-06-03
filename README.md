# Cypress Runner

Cypress Runner is a command-line interface (CLI) tool designed to launch specified frontend and backend servers before running Cypress tests. The CLI expects to find a `.cypressrunnerrc` configuration file in the current working directory (cwd).

## Installation

To install Cypress Runner, you can use npm:

```sh
npm install -g @devmy/cypress-runner
```



## Configuration

Cypress Runner requires a `.cypressrunnerrc` file in the directory where it is executed. This file should export a configuration object that matches the interface [CypressRunnerConfig](lib/src/runner/cypress-runner-config.ts)


### Example `.cypressrunnerrc` File

```json
{
  "debug": true,
  "startWebServerCommands": [
    { "command": "npm run start:frontend", "name": "frontend" },
    { "command": "npm run start:backend", "name": "backend" }
  ],
  "waitOn": {
    "resources": ["http://localhost:3000", "http://localhost:4000"],
    "delay": 1000,
    "timeout": 30000
  }
};
```

### Example `.cypressrunnerrc.json` File

```json
{
  "debug": true,
  "startWebServerCommands": [
    { "command": "npm run start:frontend", "name": "frontend" },
    { "command": "npm run start:backend", "name": "backend" }
  ],
  "waitOn": {
    "resources": ["http://localhost:3000", "http://localhost:4000"],
    "delay": 1000,
    "timeout": 30000
  }
};
```

### Example `.cypressrunnerrc.js` File

```js
/** @type import('@devmy/cypress-runner').CypressRunnerConfig*/
const config = {
  debug: true,
  startWebServerCommands: [
    { command: "npm run start:frontend", name: "frontend" },
    { command: "npm run start:backend", name: "backend" }
  ],
  waitOn: {
    resources: ["http://localhost:3000", "http://localhost:4000"],
    delay: 1000,
    timeout: 30000
  }
};

exports.default = config;
```

### Example `.cypressrunnerrc.ts` File

```ts
import { CypressRunnerConfig } from '@devmy/cypress-runner';

const config: CypressRunnerConfig = {
  debug: true,
  startWebServerCommands: [
    { command: "npm run start:frontend", name: "frontend" },
    { command: "npm run start:backend", name: "backend" }
  ],
  waitOn: {
    resources: ["http://localhost:3000", "http://localhost:4000"],
    delay: 1000,
    timeout: 30000
  }
};

export default config;
```

## Usage

After configuring your `.cypressrunnerrc` file, you can run Cypress Runner from your project’s root directory:

```sh
cypress-runner [cypress options]
```

All additional parameters passed to the CLI will be forwarded directly to Cypress.

### Example

```sh
cypress-runner open
```

In this example, `cypress-runner` will:
1. Start the frontend and backend servers as specified in the `.cypressrunnerrc` file.
2. Wait until the servers are up and running based on the `waitOn` configuration.
3. Launch the Cypress test runner with the `open` option.

## Options

### debug

- **Type:** `boolean`
- **Description:** Enables debug logging for the Cypress Runner.
- **Default:** `false`

### startWebServerCommands

- **Type:** `Array<ConcurrentlyCommandInput>` | `ConcurrentlyCommandInput`
- **Description:** Commands to start the frontend and backend servers. This uses the `concurrently` package to run multiple commands concurrently.

### waitOn

- **Type:** `WaitOnOptions`
- **Description:** Configuration options for the `wait-on` package to wait for resources (such as HTTP endpoints) to become available before starting Cypress.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.