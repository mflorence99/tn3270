/// <reference types="node" />
import * as events from 'events';
import { AID, Cell } from './data-stream';
export declare class LU3270 extends events.EventEmitter {
    host: string;
    port: number;
    model: string;
    numCols: number;
    numRows: number;
    address: number;
    aid: AID;
    buffer: Cell[];
    cursor: number;
    private connection;
    private inbound;
    private outbound;
    private tn3270;
    constructor(host: string, port: number, model: string, numCols: number, numRows: number);
    connect(): void;
    disconnect(): void;
    reset(): void;
}
