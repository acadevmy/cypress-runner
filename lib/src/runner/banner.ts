import figlet from 'figlet';

export const printBanner = async (): Promise<void> => {
  const banner = await figlet.text('Cypress Runner', { font: 'Standard' });

  console.log(banner + '\n\n');
};
