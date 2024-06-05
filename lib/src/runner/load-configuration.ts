import * as fs from 'fs';
import * as path from 'path';
import { register } from 'ts-node';

import { CypressRunnerConfig } from './cypress-runner-config';

export const loadConfiguration = (): CypressRunnerConfig => {
  const configFileName = '.cypressrunnerrc';
  const extensions = ['', '.json', '.js', '.ts'];

  for (const ext of extensions) {
    const filePath = path.resolve(process.cwd(), configFileName + ext);
    try {
      if (fs.existsSync(filePath)) {
        if (ext === '.json' || ext === '') {
          return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } else if (ext === '.js') {
          return require(filePath);
        } else if (ext === '.ts') {
          register({
            transpileOnly: true,
            compilerOptions: {
              module: 'commonjs',
            },
          });
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          return require(filePath).default;
        }
      }
    } catch (e) {
      throw new Error(`failed to load ${filePath}.\n${e}`);
    }
  }

  const supportedFormats = extensions.map((ext) => configFileName + ext).join(', ');

  throw new Error(
    `No configuration file found. Please create a ${configFileName} file with the appropriate format (${supportedFormats}).`,
  );
};
