/// <reference types="node" />
import { LU3270 } from './lu3270';
export declare class Inbound {
    lu3270: LU3270;
    constructor(lu3270: LU3270);
    process(data: Buffer): Buffer;
}
