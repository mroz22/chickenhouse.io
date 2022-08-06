const Gpio = require("onoff").Gpio;

class GpioMock {
  writeSync(value) {
    console.log("virtual gpio write sync: ", value);
  }

  readSync(value) {
    console.log("virtual gpio read sync: ", value);
  }

  watch() {
    console.log("virtual gpio watch");
  }
}

if (Gpio.accessible) {
  console.log('Gpio.accessible, using real pins')
} else {
  console.log('Gpio not accessible, using mocked pins')

}

module.exports = Gpio.accessible ? Gpio : GpioMock;
