import { concurrently } from 'concurrently';
import { castArray, isEmpty, isNil, negate } from 'lodash';

import { CypressRunnerConfig } from './cypress-runner-config';
import { killConcurrentlyResult } from './kill-concurrently-result';

export const startWebServerCommands = (
  configuration: CypressRunnerConfig,
): (() => Promise<void>) => {
  const commands = castArray(configuration.startWebServerCommands).filter(negate(isNil));

  if (isEmpty(commands)) {
    throw new Error('no web server commands provided');
  }

  const server = concurrently(commands, {
    successCondition: 'all',
    cwd: process.cwd(),
  });

  const killer = () => killConcurrentlyResult(server);

  [
    `exit`,
    `SIGINT`,
    `SIGUSR1`,
    `SIGUSR2`,
    `uncaughtException`,
    `SIGTERM`,
    'SIGHUP',
    'beforeExit',
    'disconnect',
  ].forEach((event) => process.on(event, () => killer().catch(() => null)));

  return killer;
};
