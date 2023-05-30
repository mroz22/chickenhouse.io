import { Module } from "./module";
import { Gpio } from "../utils/gpio";
export declare class Door extends Module {
    PIN_DOOR_MOTOR_1: typeof Gpio;
    PIN_DOOR_MOTOR_2: typeof Gpio;
    PIN_DOOR_STOP_BOTTOM: typeof Gpio;
    PIN_DOOR_STOP_TOP: typeof Gpio;
    constructor({ id, dataRef, gpio }: {
        id: any;
        dataRef: any;
        gpio: any;
    });
    setMovementFailsafeTimeout(): void;
    moveDown(): void;
    moveUp(): void;
    stop(): void;
    onInit(): void;
}
//# sourceMappingURL=door.d.ts.map