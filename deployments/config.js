const config = {
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
              doorStopPinTop: 6,
            },
          },
        },
      },
      // {
      //   id: "light-1",
      //   type: "light",
      //   options: {
      //     web: {},
      //     raspberry: {
      //       gpio: {
      //         pin: 22,
      //       },
      //     },
      //   },
      // },
      {
        id: "reboot-1",
        type: "reboot",
        options: {
          web: {},
          raspberry: {},
        },
      },
      {
        id: "camera-1",
        type: "camera",
        options: {
          web: {
            url: "https://rollicking-walrus-0615.dataplicity.io/",
          },
          raspberry: {},
        },
      },
    ],
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
              doorStopPinTop: 6,
            },
          },
        },
      },
      // {
      //   id: "light-1",
      //   type: "light",
      //   options: {
      //     web: {},
      //     raspberry: {
      //       gpio: {
      //         pin: 22,
      //       },
      //     },
      //   },
      // },
      {
        id: "reboot-1",
        type: "reboot",
        options: {
          web: {},
          raspberry: {},
        },
      },
      {
        id: "camera-1",
        type: "camera",
        options: {
          web: {
            url: "https://rollicking-walrus-0615.dataplicity.io/",
          },
          raspberry: {},
        },
      },
    ],
  },
  "chicken-space-mission": {
    name: "Chicken space mission",
    modules: [
    ],
  },
};

module.exports = config;
