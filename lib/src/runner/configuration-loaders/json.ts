import * as fs from 'fs';

import { CypressRunnerConfig } from '../cypress-runner-config';
import { ConfigurationLoader } from './configuration-loader';

export class JsonConfigurationLoader extends ConfigurationLoader {
  protected extension = '.json';

  protected parse(path: string): CypressRunnerConfig {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  }
}
