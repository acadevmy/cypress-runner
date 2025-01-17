import * as fs from 'fs';
import * as path from 'path';

import { CypressRunnerConfig } from '../cypress-runner-config';

/**
 * Object delegated to load CypressRunnerConfig.
 * Each loader in the chain is responsible for attempting to load a configuration file
 * based on its specific file extension. If a loader cannot find or parse the file,
 * it delegates the responsibility to the next loader in the chain.
 */
export abstract class ConfigurationLoader {
  private static readonly CYPRESS_RUNNER_CONFIG_FILENAME = '.cypressrunnerrc';

  private _next: ConfigurationLoader | undefined;
  private _parent: ConfigurationLoader | undefined;
  private get supportedExtensions(): string[] {
    const parentFormats = this._parent?.supportedExtensions ?? [];

    return [...parentFormats, this.extension];
  }

  /**
   * The file extension supported by this loader.
   */
  protected abstract readonly extension: string;

  /**
   * Parse the configuration file at the given path.
   */
  protected abstract parse(path: string): CypressRunnerConfig;

  /**
   * Attempts to load the configuration file. If the file is found and valid,
   * it is parsed and returned. Otherwise, the responsibility is delegated
   * to the next loader in the chain.
   */
  public load(): CypressRunnerConfig {
    const jsonPath = this.resolveConfigurationPath();
    if (fs.existsSync(jsonPath)) {
      return this.parse(jsonPath);
    }

    return this.next();
  }

  /**
   * Sets the next loader in the chain and establishes a parent-child relationship.
   */
  public setNext(loader: ConfigurationLoader): ConfigurationLoader {
    this._next = loader;
    loader._parent = this;

    return loader;
  }

  /**
   * Delegates the loading process to the next loader in the chain.
   * Throws an error if no configuration file is found by any loader in the chain.
   */
  protected next(): CypressRunnerConfig {
    const { CYPRESS_RUNNER_CONFIG_FILENAME } = ConfigurationLoader;
    if (!this._next) {
      const supportedExtensions = this.supportedExtensions
        .filter((extension) => extension.trim().length > 0)
        .join('|');

      throw new Error(
        `No configuration file found. Please create a ${CYPRESS_RUNNER_CONFIG_FILENAME} file with the appropriate format: ${CYPRESS_RUNNER_CONFIG_FILENAME}{${supportedExtensions}}?.`,
      );
    }

    return this._next.load();
  }

  /**
   * Resolves the path to the configuration file based on the current working directory
   * and the file extension supported by this loader.
   */
  protected resolveConfigurationPath(): string {
    const { CYPRESS_RUNNER_CONFIG_FILENAME } = ConfigurationLoader;

    return path.resolve(process.cwd(), CYPRESS_RUNNER_CONFIG_FILENAME + this.extension);
  }
}
