// @ts-nocheck todo

import EventEmitter from "events";

export class Module extends EventEmitter {
  id: string;
  dataRef: any; // todo
  state: any; // todo;

  constructor({ id, dataRef, onStateChange }) {
    super();
    if (!id || !dataRef) throw new Error(`Module: ${id} missing required prop`);
    this.id = id;
    this.dataRef = dataRef;
    this.state = {};
    this.onStateChange = onStateChange;

    console.log(`Module: ${id}. Registered`)
  }

  init() {
    this.dataRef.onSnapshot(async function (doc) {
      if (!doc || !doc.data()) {
        console.log("no data");
        return;
      }
      this.state = doc.data();

      console.log("detected database change. next state: ", this.state);
      console.log('this.onStateChange', this.onStateChange);
      
      if (onStateChange) {
        this.onStateChange(this.state);
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
    console.log(`Module ${this.id}: initiating state update`)
    this.dataRef.update({ [this.id]: { ...this.state, ...state } });
  }
}

