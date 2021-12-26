const exec = require("child_process").exec;
const Gpio = require("onoff").Gpio;
const sensor = require("node-dht-sensor");
const EventEmitter = require("events");

console.log("Starting");
class Chickenhouse extends EventEmitter {
  PIN_DHT_22_INDOOR = 3;
  PIN_DHT_22_OUTDOOR = 4;

  constructor() {
    super();
    setInterval(() => {
      console.log("interval");
      this.readDht22(this.PIN_DHT_22_INDOOR);
      this.readDht22(this.PIN_DHT_22_OUTDOOR);
    }, 1000 * 60);

  }


  readDht22(pin) {
    console.log("dht read pin ", pin);
    const _this = this;
    sensor.read(22, pin, function (err, temperature, humidity) {
      console.log("err, temperature, humidity", err, temperature, humidity);
      if (!err) {
        return _this.emit("dht/result", {
          [pin]: {
            ts: Date.now(),
            temp: temperature,
            hum: humidity,
            error: "",
          },
        });
      }
      _this.emit("dht/result", {
        [pin]: {
          ts: Date.now(),
          temp: "",
          hum: "",
          error: err.message,
        },
      });
    });
  }

  async reboot() {
    console.log("reboot command received");
    exec("shutdown -r now", function (error, stdout, stderr) {
      console.log(stdout);
    });
  }
}

module.exports = Chickenhouse;
