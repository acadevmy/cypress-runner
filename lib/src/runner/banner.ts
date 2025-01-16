import figlet from 'figlet';
import { isNil } from 'lodash';

const figletAsync = (
  txt: string,
  options: figlet.Options | undefined,
): Promise<string | undefined> =>
  new Promise((resolve, reject) =>
    figlet(txt, options, (error, data) => {
      if (isNil(error)) {
        resolve(data);
      } else {
        reject(error);
      }
    }),
  );

export const printBanner = async (): Promise<void> => {
  const banner = await figletAsync('Cypress Runner', { font: 'Standard' });

  console.log(banner + '\n\n');
};
