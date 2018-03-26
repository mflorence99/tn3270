import { addressFromBytes, addressToBytes } from './';

console.log(`Verify 0x4040 is address 0: ${addressFromBytes(new Uint8Array([0x40, 0x40]))}`);
console.log(`Verify 0xC14F is address 79: ${addressFromBytes(new Uint8Array([0xC1, 0x4F]))}`);
console.log(`Verify 0xC150 is address 80: ${addressFromBytes(new Uint8Array([0xC1, 0x50]))}`);
console.log(`Verify 0x5D7F is address 1919: ${addressFromBytes(new Uint8Array([0x5D, 0x7F]))}`);

console.log(`Verify address 0 is 0x4040: ${addressToBytes(0)}`);
console.log(`Verify address 79 is 0xC14F: ${addressToBytes(79)}`);
console.log(`Verify address 80 is 0xC150: ${addressToBytes(80)}`);
console.log(`Verify address 1919 is 0x5D7F: ${addressToBytes(1919)}`);
