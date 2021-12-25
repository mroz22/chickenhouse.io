export const config = {
  "chicken-hut": {
    name: "Chicken hut",
    modules: [
      {
        id: "door-1",
        type: "door",
        options: {
          web: {},
          raspberry: {},
        },
      },
      {
        id: "light-1",
        type: "light",
        options: {
          web: {},
          raspberry: {},
        },
      },
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
            url: '',
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
          raspberry: {},
        },
      },
      {
        id: "light-1",
        type: "light",
        options: {
          web: {},
          raspberry: {},
        },
      },
      {
        id: "pay-button-1",
        type: "pay-button",
        options: {
          web: {},
          raspberry: {},
        },
      },
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
            url: 'https://rollicking-walrus-0615.dataplicity.io/',
          },
          raspberry: {},
        },
      },
    ],
  },
};
