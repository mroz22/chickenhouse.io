const Module = require("./module");
const Gpio = require("../utils/gpio");

class Light extends Module {
  constructor({ id, dataRef, gpio }) {
    const onStateChange = (state) => {
      const { light_state } = state;
      if (light_state) {
        this.turnOn();
      } else {
        this.turnOff();
      }
    };

    super({ id, dataRef, onStateChange });

    const { pin } = gpio;
    this.PIN = new Gpio(pin, "out");
  }

  turnOn() {
    this.PIN.writeSync(1);
  }

  turnOff() {
    this.PIN.writeSync(0);
  }

  onInit() {
    this.turnOn();
  }
}

module.exports = Light;