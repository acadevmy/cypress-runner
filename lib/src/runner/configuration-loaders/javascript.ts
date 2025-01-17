import { CypressRunnerConfig } from '../cypress-runner-config';
import { ConfigurationLoader } from './configuration-loader';

export class JavaScriptConfigurationLoader extends ConfigurationLoader {
  protected extension = '.js';

  protected parse(path: string): CypressRunnerConfig {
    return require(path);
  }
}
