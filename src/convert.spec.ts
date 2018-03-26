import { a2e, e2a } from './';

console.log(`Verify Hello World: ${a2e('Hello World')}`);

console.log(`Verify Hello World: ${e2a(new Uint8Array([200, 133, 147, 147, 150, 64, 230, 150, 153, 147, 132]))}`);
