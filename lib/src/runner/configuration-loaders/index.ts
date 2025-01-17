import { DefaultConfigurationLoader } from './default';
import { JavaScriptConfigurationLoader } from './javascript';
import { JsonConfigurationLoader } from './json';
import { TypeScriptConfigurationLoader } from './typescript';

export * from './configuration-loader';
export * from './default';
export * from './javascript';
export * from './json';
export * from './typescript';

const defaultLoader = new DefaultConfigurationLoader();
defaultLoader
  .setNext(new JsonConfigurationLoader())
  .setNext(new JavaScriptConfigurationLoader())
  .setNext(new TypeScriptConfigurationLoader());

export const loader = defaultLoader;
