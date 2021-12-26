const Gpio = require("onoff").Gpio;

class GpioMock {
  writeSync(value) {
    console.log("virtual gpio write sync: ", value);
  }

  readSync() {
    console.log("virtual gpio read sync: ", value);
  }

  watch() {
    console.log('virtual gpio watch');
  }
}

module.exports = Gpio.accessible ? Gpio : GpioMock;
