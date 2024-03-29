"use strict";
exports.__esModule = true;
exports.config = void 0;
exports.config = {
    "chicken-hut": {
        name: "Chicken hut",
        modules: [
            {
                id: "door-1",
                type: "door",
                options: {
                    web: {},
                    raspberry: {
                        gpio: {
                            motorPin1: 17,
                            motorPin2: 27,
                            doorStopPinBottom: 5,
                            doorStopPinTop: 6
                        }
                    }
                }
            },
            {
                id: "reboot-1",
                type: "reboot",
                options: {
                    web: {},
                    raspberry: {}
                }
            },
            {
                id: "life-monitor-1",
                type: "life-monitor",
                options: {
                    web: {},
                    raspberry: {}
                }
            },
            {
                id: "camera-1",
                type: "camera",
                options: {
                    web: {
                        url: "https://rollicking-walrus-0615.dataplicity.io/"
                    },
                    raspberry: {}
                }
            },
        ]
    },
    "chicken-citadel": {
        name: "Chicken citadel",
        modules: [
            {
                id: "door-1",
                type: "door",
                options: {
                    web: {},
                    raspberry: {
                        gpio: {
                            motorPin1: 17,
                            motorPin2: 27,
                            doorStopPinBottom: 5,
                            doorStopPinTop: 6
                        }
                    }
                }
            },
            {
                id: "reboot-1",
                type: "reboot",
                options: {
                    web: {},
                    raspberry: {}
                }
            },
            {
                id: "life-monitor-1",
                type: "life-monitor",
                options: {
                    web: {},
                    raspberry: {}
                }
            },
            {
                id: "camera-1",
                type: "camera",
                options: {
                    web: {
                        url: "https://rollicking-walrus-0615.dataplicity.io/"
                    },
                    raspberry: {}
                }
            },
        ]
    },
    "chicken-space-mission": {
        name: "Chicken space mission",
        modules: []
    }
};
//# sourceMappingURL=config.js.map