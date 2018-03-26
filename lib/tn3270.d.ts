/// <reference types="node" />
import { Observable } from 'rxjs/Observable';
export declare class Tn3270 {
    host: string;
    port: number;
    model: string;
    stream$: Observable<Buffer>;
    private socket;
    private modelBytes;
    constructor(host: string, port: number, model: string);
    write(bytes: any): void;
    private dataHandler(data, observer);
}
