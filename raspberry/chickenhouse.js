const exec = require("child_process").exec;
const Gpio = require("onoff").Gpio;
const sensor = require("node-dht-sensor");
const EventEmitter = require("events");

console.log("Starting");
class Chickenhouse extends EventEmitter {
  PIN_DHT_22_INDOOR = 3;
  PIN_DHT_22_OUTDOOR = 4;
  PIN_DOOR_MOTOR_1 = new Gpio(17, "out");
  PIN_DOOR_MOTOR_2 = new Gpio(27, "out");
  PIN_LIGHT_RELAY = new Gpio(22, "out");
  PIN_DOOR_STOP_BOTTOM = new Gpio(5, "in", "both");
  PIN_DOOR_STOP_TOP = new Gpio(6, "in", "both");

  constructor() {
    super();
    setInterval(() => {
      console.log("interval");
      this.readDht22(this.PIN_DHT_22_INDOOR);
      this.readDht22(this.PIN_DHT_22_OUTDOOR);
    }, 1000 * 60);

    this.PIN_DOOR_STOP_BOTTOM.watch((err, value) => {
      if (err) {
        return console.log("PIN_DOOR_STOP_BOTTOM error", err.message);
      }
      this.emit("door-stop-bottom", value);
    });

    this.PIN_DOOR_STOP_TOP.watch((err, value) => {
      if (err) {
        return console.log("PIN_DOOR_STOP_TOP error", err.message);
      }
      this.emit("door-stop-top", value);
    });
  }

  setlight_state(state) {
    this.PIN_LIGHT_RELAY.writeSync(Number(state));
  }

  moveDown() {
    this.PIN_DOOR_MOTOR_1.writeSync(0);
    this.PIN_DOOR_MOTOR_2.writeSync(1);
    console.log("moving down");
  }

  moveUp() {
    this.PIN_DOOR_MOTOR_1.writeSync(1);
    this.PIN_DOOR_MOTOR_2.writeSync(0);
    console.log("moving up");
  }

  stop() {
    this.PIN_DOOR_MOTOR_1.writeSync(0);
    this.PIN_DOOR_MOTOR_2.writeSync(0);
    console.log("stopped");
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
