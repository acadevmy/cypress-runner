import * as fs from 'fs';
import * as path from 'path';
import { register } from 'ts-node';

import { CypressRunnerConfig } from './cypress-runner-config';

const JSON_FILE_EXTENSION = '.json';
const EMPTY_FILE_EXTENSION = '';
const JAVASCRIPT_FILE_EXTENSION = '.js';
const TYSESCRIPT_FILE_EXTENSION = '.ts';
const CYPRESS_RUNNER_CONFIG_FILENAME = '.cypressrunnerrc';

const CYPRESS_RUNNER_SUPPORTED_FILE_EXTENSIONS = [
  EMPTY_FILE_EXTENSION,
  JSON_FILE_EXTENSION,
  JAVASCRIPT_FILE_EXTENSION,
  TYSESCRIPT_FILE_EXTENSION,
];

export const loadConfiguration = (): CypressRunnerConfig => {
  for (const ext of CYPRESS_RUNNER_SUPPORTED_FILE_EXTENSIONS) {
    const filePath = path.resolve(process.cwd(), CYPRESS_RUNNER_CONFIG_FILENAME + ext);
    try {
      if (fs.existsSync(filePath)) {
        if (ext === JSON_FILE_EXTENSION || ext === EMPTY_FILE_EXTENSION) {
          return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } else if (ext === JAVASCRIPT_FILE_EXTENSION) {
          return require(filePath);
        } else if (ext === TYSESCRIPT_FILE_EXTENSION) {
          register({
            transpileOnly: true,
            compilerOptions: {
              module: 'commonjs',
            },
          });

          return require(filePath).default;
        }
      }
    } catch (error) {
      throw new Error(`failed to load ${filePath}.\n${error}`);
    }
  }

  const supportedFormats = CYPRESS_RUNNER_SUPPORTED_FILE_EXTENSIONS.map(
    (ext) => CYPRESS_RUNNER_CONFIG_FILENAME + ext,
  ).join(', ');

  throw new Error(
    `No configuration file found. Please create a ${CYPRESS_RUNNER_CONFIG_FILENAME} file with the appropriate format (${supportedFormats}).`,
  );
};
