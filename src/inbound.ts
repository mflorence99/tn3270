import { LU3270 } from './lu3270';

/**
 * Model the inbound data stream ie: from the 3270 to the host
 *
 * @see http://publibz.boulder.ibm.com/cgi-bin/bookmgr_OS390/
 *        BOOKS/CN7P4000/CCONTENTS?DT=19920626112004
 */

export class Inbound {

  /** ctor */
  constructor(public lu3270: LU3270) { }

    /** Handle the raw buffer */
    process(data: Buffer): Buffer {
      console.log('3270 => Host', data);
      return new Buffer([]);
    }

}
