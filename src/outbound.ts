import { Attributes, Cell, Command, Order, WCC, addressFromBytes } from './data-stream';

import { LU3270 } from './lu3270';
import { e2a } from './convert';

/**
 * Model the outbound data stream ie: from the host to the 3270
 *
 * @see http://publibz.boulder.ibm.com/cgi-bin/bookmgr_OS390/
 *        BOOKS/CN7P4000/CCONTENTS?DT=19920626112004
 */

export class Outbound {

  /** ctor */
  constructor(public lu3270: LU3270) { }

  /** Handle the raw buffer */
  process(data: Buffer): WCC {
    console.log('Host ==> 3270', data);
    const command = data[0];
    let wcc;
    switch (command) {
      case Command.WSF:
        wcc = new WCC();
        this.processStructuredFields(data.slice(1));
        break;
      default:
        wcc = WCC.fromByte(data[1]);
        this.processOrdersAndData(data.slice(2));
        break;
    }
    return wcc;
  }

  // private methods

  private processOrdersAndData(data: Buffer): void {
    let offset = 0;
    while (offset < data.length) {
      const order = data[offset++];
      switch (order) {
        case Order.SF:
          const attributes = Attributes.fromByte(data[offset++]);
          while (data[offset] && data[offset] >= 0x40) {
            const value = e2a(new Uint8Array([data[offset++]]));
            this.lu3270.buffer[this.lu3270.address++] = new Cell(value, attributes);
          }
          break;
        case Order.SFE:
          console.log('SFE oh oh!');
          break;
        case Order.SBA:
          this.lu3270.address = addressFromBytes(new Uint8Array([data[offset++], data[offset++]]));
          break;
        case Order.SA:
          console.log('SA oh oh!');
          break;
        case Order.MF:
          console.log('MF oh oh!');
          break;
        case Order.IC:
          this.lu3270.cursor = this.lu3270.address;
          break;
        case Order.PT:
          console.log('PT oh oh!');
          break;
        case Order.RA:
          console.log('RA oh oh!');
          break;
        case Order.EUA:
          console.log('EUA oh oh!');
          break;
      }
    }
  }

  private processStructuredFields(data: Buffer): void {
    data.keys();
  }

}
