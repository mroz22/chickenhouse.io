export declare const config: {
    "chicken-hut": {
        name: string;
        modules: ({
            id: string;
            type: string;
            options: {
                web: {
                    url?: undefined;
                };
                raspberry: {
                    gpio: {
                        motorPin1: number;
                        motorPin2: number;
                        doorStopPinBottom: number;
                        doorStopPinTop: number;
                    };
                };
            };
        } | {
            id: string;
            type: string;
            options: {
                web: {
                    url?: undefined;
                };
                raspberry: {
                    gpio?: undefined;
                };
            };
        } | {
            id: string;
            type: string;
            options: {
                web: {
                    url: string;
                };
                raspberry: {
                    gpio?: undefined;
                };
            };
        })[];
    };
    "chicken-citadel": {
        name: string;
        modules: ({
            id: string;
            type: string;
            options: {
                web: {
                    url?: undefined;
                };
                raspberry: {
                    gpio: {
                        motorPin1: number;
                        motorPin2: number;
                        doorStopPinBottom: number;
                        doorStopPinTop: number;
                    };
                };
            };
        } | {
            id: string;
            type: string;
            options: {
                web: {
                    url?: undefined;
                };
                raspberry: {
                    gpio?: undefined;
                };
            };
        } | {
            id: string;
            type: string;
            options: {
                web: {
                    url: string;
                };
                raspberry: {
                    gpio?: undefined;
                };
            };
        })[];
    };
    "chicken-space-mission": {
        name: string;
        modules: never[];
    };
};
//# sourceMappingURL=config.d.ts.map