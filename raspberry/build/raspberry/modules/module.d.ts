/// <reference types="node" />
import EventEmitter from "events";
export declare class Module extends EventEmitter {
    id: string;
    dataRef: any;
    state: any;
    constructor({ id, dataRef, onStateChange }: {
        id: any;
        dataRef: any;
        onStateChange: any;
    });
    init(): void;
    onInit(): void;
    log(message: string): void;
    setState(state: any): void;
}
//# sourceMappingURL=module.d.ts.map