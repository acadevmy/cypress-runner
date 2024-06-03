import { ConcurrentlyCommandInput } from 'concurrently';
import { WaitOnOptions } from 'wait-on';

export interface CypressRunnerConfig {
  debug?: boolean;
  startWebServerCommands: Array<ConcurrentlyCommandInput> | ConcurrentlyCommandInput;
  waitOn?: WaitOnOptions;
}
