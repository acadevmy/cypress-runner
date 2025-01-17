import { register } from 'ts-node';

import { CypressRunnerConfig } from '../cypress-runner-config';
import { ConfigurationLoader } from './configuration-loader';

export class TypeScriptConfigurationLoader extends ConfigurationLoader {
  protected extension = '.ts';

  protected parse(path: string): CypressRunnerConfig {
    register({
      transpileOnly: true,
      compilerOptions: {
        module: 'commonjs',
      },
    });

    const config = require(path).default;
    if (!config) {
      throw new Error('Missing default export configuration');
    }

    return config;
  }
}
