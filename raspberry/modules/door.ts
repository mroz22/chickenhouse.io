// @ts-nocheck
// todo

import { Module } from "./module";
import { Gpio } from "../utils/gpio";

const DOOR_OPEN = 1;
const DOOR_CLOSE = -1;
const DOOR_STOP = 0;

export class Door extends Module {
  PIN_DOOR_MOTOR_1: typeof Gpio;
  PIN_DOOR_MOTOR_2: typeof Gpio
  PIN_DOOR_STOP_BOTTOM: typeof Gpio
  PIN_DOOR_STOP_TOP: typeof Gpio

  constructor({ id, dataRef, gpio }) {

    const onStateChange = (state) => {
      const { door_movement, door_position } = state;
      if (door_movement === DOOR_OPEN && door_position !== "top") {
        this.moveUp();
      }
      if (door_movement === DOOR_CLOSE && door_position !== "bottom") {
        this.moveDown();
      }
      if (door_movement === DOOR_STOP) this.stop();
    };

    super({ id, dataRef, onStateChange });

    const { motorPin1, motorPin2, doorStopPinBottom, doorStopPinTop } = gpio;

    this.PIN_DOOR_MOTOR_1 = new Gpio(motorPin1, "out"); // -> 17
    this.PIN_DOOR_MOTOR_2 = new Gpio(motorPin2, "out"); // -> 27
    this.PIN_DOOR_STOP_BOTTOM = new Gpio(doorStopPinBottom, "in", "both"); // -> 5
    this.PIN_DOOR_STOP_TOP = new Gpio(doorStopPinTop, "in", "both"); // -> 6

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

  onInit() {
    this.stop();
  }
}

