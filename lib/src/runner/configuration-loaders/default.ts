import * as fs from 'fs';

import { CypressRunnerConfig } from '../cypress-runner-config';
import { JsonConfigurationLoader } from './json';

export class DefaultConfigurationLoader extends JsonConfigurationLoader {
  protected extension = '';

  protected parse(path: string): CypressRunnerConfig {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
}
