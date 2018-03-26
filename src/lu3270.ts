import * as events from 'events';

import { AID, Cell, Command } from './data-stream';

import { Inbound } from './inbound';
import { Outbound } from './outbound';
import { Subscription } from 'rxjs/Subscription';
import { Tn3270 } from './tn3270';

/**
 * Logical 3270 device
 *
 * @see http://www.tommysprinkle.com/mvs/P3270/start.htm
 * @see http://publibz.boulder.ibm.com/cgi-bin/bookmgr_OS390/
 *        BOOKS/CN7P4000/CCONTENTS?DT=19920626112004
 * @see http://www.simotime.com/asc2ebc1.htm
 * @see https://www.ibm.com/support/knowledgecenter/en/
 *        SSGMCP_5.5.0/applications/designing/dfhp3b4.html
 * @see https://www.ibm.com/support/knowledgecenter/en/
 *        SSGMCP_5.5.0/applications/designing/dfhp3c7.html
 * @see http://www.prycroft6.com.au/misc/3270.html
 */

export class LU3270 extends events.EventEmitter {

  address: number;
  aid: AID;
  buffer: Cell[];
  cursor: number;

  private connection: Subscription;
  private inbound: Inbound;
  private outbound: Outbound;
  private tn3270: Tn3270;

  /** ctor */
  constructor(public host: string,
              public port: number,
              public model: string,
              public numCols: number,
              public numRows: number) {
    super();
    this.inbound = new Inbound(this);
    this.outbound = new Outbound(this);
    this.tn3270 = new Tn3270(host, port, model);
  }

  /** Connect to 3270 */
  connect() {
    this.reset();
    this.disconnect();
    this.connection = this.tn3270.stream$.subscribe({
      next: (data: Buffer) => {
        switch (data[0]) {
          case Command.EAU:
          case Command.EW:
          case Command.EWA:
          case Command.W:
          case Command.WSF:
            const wcc = this.outbound.process(data);
            console.log(wcc.toString());
            this.emit('outbound');
            break;
          case Command.RB:
          case Command.RM:
          case Command.RMA:
            const buffer = this.inbound.process(data);
            this.tn3270.write(buffer);
            break;
        }
      },
      error: (error: Error) => console.log(error)
    });
  }

  /** Disconnect from 3270 */
  disconnect() {
    if (this.connection) {
      this.connection.unsubscribe();
      delete this.connection;
    }
  }

  /** Reset and start over */
  reset() {
    this.address = 0;
    this.aid = AID.DEFAULT;
    this.buffer = new Array<Cell>(this.numCols * this.numRows);
    this.cursor = 0;
  }

}
