import { ConcurrentlyResult } from 'concurrently';

export const killConcurrentlyResult = async (
  concurrentlyResult: ConcurrentlyResult,
): Promise<void> => {
  concurrentlyResult.commands
    .filter((command) => !(command.exited || command.killed))
    .forEach((command) => {
      console.info(`Shutting down ${command.command}`);
      command.kill();
      console.info(`✅ ${command.name ?? command.command} has been successfully shut down`);
    });

  await concurrentlyResult.result;
};
