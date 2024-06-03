import { execSync } from 'child_process';

import { printBanner } from './banner';
import { CypressRunnerConfig } from './cypress-runner-config';
import { loadConfiguration } from './load-configuration';
import { startWebServerCommands } from './start-web-server-commands';
import { waitWebServices } from './wait-web-services';

export const cypressRunner = async () => {
  await printBanner();

  const processArguments = [...process.argv];
  processArguments.splice(0, 2);

  const configuration: CypressRunnerConfig = loadConfiguration();
  const isDebug = configuration.debug;

  isDebug && console.log('Configuration: ', JSON.stringify(configuration, undefined, 2));

  isDebug && console.debug('starting web server commands');

  const webServersKiller = startWebServerCommands(configuration);

  try {
    isDebug && console.debug('waiting on endpoints');

    await waitWebServices(configuration);

    isDebug && console.debug('web server commands ready to tests, running cypress');

    execSync(`cypress ${processArguments}`, {
      cwd: process.cwd(),
      stdio: 'inherit',
      env: process.env,
    });
  } catch {
    throw new Error('Ooops! Something went wrong :(');
  } finally {
    await webServersKiller().catch(() => null);
  }
};
