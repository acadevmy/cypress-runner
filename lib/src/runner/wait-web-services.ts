import { isEmpty, isNil } from 'lodash';
import waitOn from 'wait-on';

import { CypressRunnerConfig } from './cypress-runner-config';

export const waitWebServices = async (configuration: CypressRunnerConfig): Promise<void> => {
  const waitOnConfigs = configuration.waitOn;
  if (isNil(waitOnConfigs) || isEmpty(waitOnConfigs?.resources)) {
    return;
  }

  try {
    await waitOn(waitOnConfigs);
  } catch (error) {
    throw new Error(
      `The commands have not yet pulled up all the services expected to start cypress.\n${error}`,
    );
  }
};
