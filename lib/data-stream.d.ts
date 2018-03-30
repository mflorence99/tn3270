export declare class Attributes {
    protect: boolean;
    numeric: boolean;
    highlight: boolean;
    hidden: boolean;
    modified: boolean;
    blink: boolean;
    reverse: boolean;
    underscore: boolean;
    color: Color;
    static fromByte(byte: number): Attributes;
    static fromBytes(bytes: Uint8Array): Attributes;
    constructor(protect?: boolean, numeric?: boolean, highlight?: boolean, hidden?: boolean, modified?: boolean, blink?: boolean, reverse?: boolean, underscore?: boolean, color?: Color);
    toString(): string;
}
export declare class Cell {
    value: string;
    attributes: Attributes;
    constructor(value: string, attributes: Attributes);
}
export declare class WCC {
    alarm: boolean;
    reset: boolean;
    resetMDT: boolean;
    unlockKeyboard: boolean;
    static fromByte(byte: number): WCC;
    constructor(alarm?: boolean, reset?: boolean, resetMDT?: boolean, unlockKeyboard?: boolean);
    toByte(): number;
    toString(): string;
}
export declare function addressFromBytes(bytes: Uint8Array): number;
export declare function addressToBytes(address: number): Uint8Array;
export declare function reverseMap(obj: any): any;
export declare enum AID {
    DEFAULT = 136,
    CLEAR = 109,
    ENTER = 125,
    PA1 = 108,
    PA2 = 110,
    PA3 = 107,
    PF1 = 241,
    PF2 = 242,
    PF3 = 243,
    PF4 = 244,
    PF5 = 245,
    PF6 = 246,
    PF7 = 247,
    PF8 = 248,
    PF9 = 249,
    PF10 = 122,
    PF11 = 123,
    PF12 = 124,
    PF13 = 193,
    PF14 = 194,
    PF15 = 195,
    PF16 = 196,
    PF17 = 197,
    PF18 = 198,
    PF19 = 199,
    PF20 = 200,
    PF21 = 201,
    PF22 = 74,
    PF23 = 75,
    PF24 = 76,
}
export declare enum Color {
    DEFAULT = 0,
    BLUE = 241,
    RED = 242,
    PINK = 243,
    GREEN = 244,
    TURQUOISE = 245,
    YELLOW = 246,
    WHITE = 247,
}
export declare enum Command {
    EAU = 111,
    EW = 245,
    EWA = 126,
    RB = 242,
    RM = 246,
    RMA = 110,
    W = 241,
    WSF = 243,
}
export declare enum Highlight {
    BLINK = 241,
    REVERSE = 242,
    UNDERSCORE = 244,
}
export declare enum Order {
    SF = 29,
    SFE = 41,
    SBA = 17,
    SA = 40,
    MF = 44,
    IC = 19,
    PT = 5,
    RA = 60,
    EUA = 18,
    GE = 8,
}
export declare enum Telnet {
    BINARY = 0,
    DO = 253,
    DONT = 254,
    EOR = 25,
    IAC = 255,
    SB = 250,
    SE = 240,
    TERMINAL_TYPE = 24,
    WILL = 251,
    WONT = 252,
}
export declare enum TypeCode {
    BASIC = 192,
    HIGHLIGHT = 65,
    COLOR = 66,
}
