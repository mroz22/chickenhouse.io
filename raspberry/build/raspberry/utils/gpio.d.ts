import { Gpio as GpioOrig } from "onoff";
declare class GpioMock {
    writeSync(value: any): void;
    readSync(value: any): void;
    watch(): void;
}
export declare const Gpio: typeof GpioMock | typeof GpioOrig;
export {};
//# sourceMappingURL=gpio.d.ts.map