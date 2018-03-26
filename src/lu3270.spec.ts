import { LU3270 } from './';

const lu3270 = new LU3270('localhost', 3270, 'IBM-3278-4-E', 80, 43);

lu3270.connect();

process.on('SIGINT', () => {
  console.log('Exit');
  lu3270.disconnect();
  process.exit();
});
