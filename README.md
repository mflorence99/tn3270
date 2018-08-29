# tn3270

tn3270 is a pure TypeScript implementation of the Telnet protocol necessary to negotiate a connection from a software 3270 emulator and a host that accepts 3270 connections.

I use tn3270 as the basis for my own 3270 emulator [EL-3270](https://github.com/mflorence99/el-3270). I factored out the connection code to better expose it for others to use in their own emulators. I hope that it also exposes the protocol in an easy to understand way.

<!-- toc -->

- [References](#references)
- [Installation](#installation)
- [API](#api)
  * [Example](#example)
- [3270 Font](#3270-font)

<!-- tocstop -->

## References

These two documents explain the protocol exhaustively.

* [RFC1756](https://tools.ietf.org/html/rfc1576) TN3270 Current Practices
* [RFC1647](https://tools.ietf.org/html/rfc1647) TN3270 Enhancements

I also found [this summary](http://users.cs.cf.ac.uk/Dave.Marshall/Internet/node141.html) of Telnet commands by Dave Marshall very helpful.

## Installation

```
npm install --save tn3270
```

## API

tn3270 negotiates a session with the host and if successful returns an `Observable` stream of data from the host to the emulator. A `write` API supports data transfer from the emulator back to the host.

All the other complex details of the 3270 data stream are delegated to the emulator, of which [EL-3270](https://github.com/mflorence99/el-3270) is a good example.

Because the API surface is so small, I've reproduced it here in full.

```typescript
import { Observable } from 'rxjs/Observable';
export declare class Tn3270 {
  host: string;
  port: number;
  model: string;
  stream$: Observable<Buffer>;
  constructor(host: string, port: number, model: string);
  write(bytes: any): void;
}
```

> `write` accepts either an array of bytes or a Node.js `Buffer`.

### Example

Here's how I use tn3270 in my Electron 3270 emulator.

```typescript
import { Tn3270 } from 'tn3270';

ipcMain.on('connect', (event: any,
                       host: string,
                       port: number,
                       model: string) => {
  theTn3270 = new Tn3270(host, port, model);
  theConnection = theTn3270.stream$.subscribe({
    next: (data: Buffer) => {
      const view = new Uint8Array(data.length);
      for (let i = 0; i < data.length; i++)
        view[i] = data[i];
      theWindow.webContents.send('data', view);
    },
    error: (error: Error) => theWindow.webContents.send('error', error.message),
    complete: () => theWindow.webContents.send('disconnected')
  });
});
```

## 3270 Font

Many thanks to Ricardo Bánffy for his [3270 Font](https://github.com/rbanffy/3270font), republished here for convenience. I actually grabbed the TTF versions from the S3 bucket <https://s3.amazonaws.com/3270font/3270_fonts_4cfe95c.zip> that Ricardo references.

The 3270 font can be included in your app simply via the `fonts/3270.css` file. Here's how I use it in my Angular CLI projects, just like any other font in `angular.json`.

```json
"styles": [
  "node_modules/roboto-fontface/css/roboto/roboto-fontface.css",
  "node_modules/tn3270/fonts/3270.css"
],
```
