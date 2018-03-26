/// <reference types="node" />
import { WCC } from './data-stream';
import { LU3270 } from './lu3270';
export declare class Outbound {
    lu3270: LU3270;
    constructor(lu3270: LU3270);
    process(data: Buffer): WCC;
    private processOrdersAndData(data);
    private processStructuredFields(data);
}
