import * as net from 'net';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Telnet } from './data-stream';

/**
 * Raw Telnet to 3270
 *
 * @see https://tools.ietf.org/html/rfc1576
 * @see https://tools.ietf.org/html/rfc1647
 * @see http://users.cs.cf.ac.uk/Dave.Marshall/Internet/node141.html
 */

export class Tn3270 {

  stream$: Observable<Buffer>;

  private socket: net.Socket;
  private modelBytes: number[] = [];

  /** ctor */
  constructor(public host: string,
              public port: number,
              public model: string) {
    // we need the model as an array of bytes
    for (let i = 0; i < model.length; i++)
      this.modelBytes.push(model.charCodeAt(i));
    // build observable stream over 3270 data
    this.stream$ = Observable.create((observer: Observer<Buffer>) => {
      this.socket = new net.Socket();
      this.socket.on('data', (data: Buffer) => this.dataHandler(data, observer));
      this.socket.on('error', (error: Error) => observer.error(error));
      this.socket.on('end', () => observer.complete());
      this.socket.setNoDelay(true);
      this.socket.connect({host, port}, () => {
        console.log(`Connected to ${host}:${port}`);
      });
      return () => this.socket.destroy();
    });
  }

  /** Write raw bytes to 3270 */
  write(bytes: any): void {
    if (bytes instanceof Buffer)
      this.socket.write(bytes);
    else this.socket.write(Buffer.from(bytes));
  }

  // private methods

  private dataHandler(data: Buffer,
                      observer: Observer<Buffer>): void {
    if (data[0] === Telnet.IAC) {
      console.log('IAC', data);
      if (data[1] === Telnet.DO && data[2] === Telnet.TERMINAL_TYPE)
        this.write([Telnet.IAC, Telnet.WILL, Telnet.TERMINAL_TYPE]);
      if (data[1] === Telnet.DO && data[2] === Telnet.EOR)
        this.write([Telnet.IAC, Telnet.WILL, Telnet.EOR, Telnet.IAC, Telnet.DO, Telnet.EOR]);
      if (data[1] === Telnet.DO && data[2] === Telnet.BINARY)
        this.write([Telnet.IAC, Telnet.WILL, Telnet.BINARY, Telnet.IAC, Telnet.DO, Telnet.BINARY]);
      if (data[1] === Telnet.SB && data[2] === Telnet.TERMINAL_TYPE)
        this.write([Telnet.IAC, Telnet.SB, Telnet.TERMINAL_TYPE, 0, ...this.modelBytes, Telnet.IAC, Telnet.SE]);
    }
    else observer.next(data);
  }

}
