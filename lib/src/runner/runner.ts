import { execSync } from 'child_process';

import { printBanner } from './banner';
import { CypressRunnerConfig } from './cypress-runner-config';
import { loadConfiguration } from './load-configuration';
import { startWebServerCommands } from './start-web-server-commands';
import { waitWebServices } from './wait-web-services';

const SCRIPT_ARG_START_INDEX = 2;
const JSON_PRETTY_PRINT_INDENT = 2;

export const cypressRunner = async (): Promise<void> => {
  await printBanner();

  const processArguments = [...process.argv];
  processArguments.splice(0, SCRIPT_ARG_START_INDEX);

  const configuration: CypressRunnerConfig = loadConfiguration();
  const isDebug = configuration.debug;

  if (isDebug) {
    console.log('Configuration: ', JSON.stringify(configuration, void 0, JSON_PRETTY_PRINT_INDENT));
    console.debug('starting web server commands');
  }

  const webServersKiller = startWebServerCommands(configuration);

  try {
    if (isDebug) {
      console.debug('waiting on endpoints');
    }

    await waitWebServices(configuration);

    if (isDebug) {
      console.debug('web server commands ready to tests, running cypress');
    }

    // this command executes the cypress command using the OS api
    // eslint-disable-next-line sonarjs/os-command
    execSync(`cypress ${processArguments.join(' ')}`, {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: process.env,
    });
  } catch (error) {
    throw new Error(`something went wrong during execution.\n${error}`);
  } finally {
    await webServersKiller().catch(() => null);
  }
};
