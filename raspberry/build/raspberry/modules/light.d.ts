import { Module } from './module';
export declare class Light extends Module {
    constructor({ id, dataRef, gpio }: {
        id: any;
        dataRef: any;
        gpio: any;
    });
    turnOn(): void;
    turnOff(): void;
    onInit(): void;
}
//# sourceMappingURL=light.d.ts.map