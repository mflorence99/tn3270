import { Tn3270 } from './tn3270';

const tn3270 = new Tn3270('localhost', 3270, 'IBM-3278-4-E');
const connection = tn3270.stream$.subscribe({
  next: (data: Buffer) => console.log(data),
  error: (error: Error) => console.log(error),
  complete: () => console.log('All done!')
});

process.on('SIGINT', () => {
  console.log('Exit');
  connection.unsubscribe();
  process.exit();
});
