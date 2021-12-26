const exec = require("child_process").exec;
const Gpio = require("onoff").Gpio;
const sensor = require("node-dht-sensor");
const EventEmitter = require("events");

class Module extends EventEmitter {
  constructor({ id, dataRef, onStateChange }) {
    super();
    if (!id || !dataRef) throw new Error("Module: missing required prop");

    this.id = id;
    this.dataRef = dataRef;
    this.state = {};

    this.dataRef.onSnapshot(async function (doc) {
      if (!doc || !doc.data()) {
        console.log("no data");
        return;
      }
      this.state = doc.data();

      console.log("onSnapshot", this.state);
      console.log('this.onStateChange', this.onStateChange);
      if (onStateChange) {
        onStateChange(this.state);
      }
    });
  }

  onInit() {
    throw new Error("Module: onInit needs override");
  }

  setState(state) {
    // this.emit("module/next-state", {
    //   [this.id]: state,
    // });
    dataRef.update({ [this.id]: { ...this.state, ...state } });
  }
}

module.exports = Module;
