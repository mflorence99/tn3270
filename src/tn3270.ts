import * as net from 'net';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

const chalk = require('chalk');

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

  /** ctor */
  constructor(public host: string,
              public port: number,
              public model: string) {
    // build observable stream over 3270 data
    this.stream$ = Observable.create((observer: Observer<Buffer>) => {
      this.socket = new net.Socket();
      this.socket.on('data', (data: Buffer) => this.dataHandler(data, observer));
      this.socket.on('error', (error: Error) => {
        console.log(chalk.green('3270 -> HOST'), chalk.red(error.message));
        observer.error(error);
      });
      this.socket.on('end', () => {
        console.log(chalk.green('3270 -> HOST'), chalk.cyan('Disconnected'));
        observer.complete();
      });
      this.socket.setNoDelay(true);
      this.socket.connect({host, port}, () => {
        console.log(chalk.green('3270 -> HOST'), chalk.blue(`Connected at ${host}:${port}`));
      });
      return () => this.socket.end();
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
      const negotiator = new Negotiator(data);
      let response;
      if (negotiator.matches(['IAC', 'DO', 'TERMINAL_TYPE']))
        response = ['IAC', 'WILL', 'TERMINAL_TYPE'];
      if (negotiator.matches(['IAC', 'DO', 'EOR']))
        response = ['IAC', 'WILL', 'EOR', 'IAC', 'DO', 'EOR'];
      if (negotiator.matches(['IAC', 'DO', 'BINARY']))
        response = ['IAC', 'WILL', 'BINARY', 'IAC', 'DO', 'BINARY'];
      if (negotiator.matches(['IAC', 'SB', 'TERMINAL_TYPE']))
        response = ['IAC', 'SB', 'TERMINAL_TYPE', '0x00', this.model, 'IAC', 'SE'];
      // send response
      if (response) {
        console.log(chalk.yellow('HOST -> 3270'), chalk.white(negotiator.decode()));
        console.log(chalk.green('3270 -> HOST'), chalk.gray(response));
        this.write(negotiator.encode(response));
      }
    }
    else observer.next(data);
  }

}

/**
 * Negotiate Telnet connection 3270 <-> Host
 */

enum Telnet {
  BINARY        = 0,
  DO            = 253,
  DONT          = 254,
  EOR           = 25,
  IAC           = 255,
  SB            = 250,
  SE            = 240,
  TERMINAL_TYPE = 24,
  WILL          = 251,
  WONT          = 252
}

class Negotiator {

  private static lookup = {
    'BINARY': Telnet.BINARY,
    'DO': Telnet.DO,
    'DONT': Telnet.DONT,
    'EOR': Telnet.EOR,
    'IAC': Telnet.IAC,
    'SB': Telnet.SB,
    'SE': Telnet.SE,
    'TERMINAL_TYPE': Telnet.TERMINAL_TYPE,
    'WILL': Telnet.WILL,
    'WONT': Telnet.WONT
  };

  private static reverse = Object.keys(Negotiator.lookup)
    .reduce((acc, k) => {
      acc[String(Negotiator.lookup[k])] = k;
      return acc;
    }, { });

  /** ctor */
  constructor(private data: Buffer) { }

  /** Decode IAC command */
  decode(): string[] {
    const commands: string[] = [];
    for (let ix = 0; ix < this.data.length; ix++) {
      const byte = this.data[ix];
      let decoded = Negotiator.reverse[String(byte)];
      // decode anything not in lookup as 0xXX
      if (typeof(decoded) === 'undefined')
        decoded = `0x${(byte < 16)? '0' : ''}${byte.toString(16)}`;
      commands.push(decoded);
    }
    return commands;
  }

  /** Encode IAC response */
  encode(commands: string[]): number[] {
    return commands.reduce((acc, command) => {
      const encoded = Negotiator.lookup[command];
      // leave raw numbers as is
      if (typeof(command) === 'number')
        acc.push(command);
      // convert hex strings to decimal
      else if (command.startsWith('0x'))
        acc.push(parseInt(command.substring(3), 16));
      // anything not in lookup is a string, so decode bytes
      else if (typeof(encoded) === 'undefined') {
        for (let ix = 0; ix < command.length; ix++)
          acc.push(command.charCodeAt(ix));
      }
      else acc.push(encoded);
      return acc;
    }, [] as any);
  }

  /** Which IAC command sequence? */
  matches(commands: string[]): boolean {
    return commands.every((command, ix) =>  {
      return Negotiator.lookup[command] === this.data[ix];
    });
  }

}
