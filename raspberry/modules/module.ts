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

    console.log(`Module: ${id}. Registered`);
  }

  init() {
    this.dataRef.onSnapshot(async (doc) => {
      if (!doc || !doc.data()) {
        console.log("no data");
        return;
      }
      this.state = doc.data();

      console.log(`${this.id}: detected database change. next state: ${JSON.stringify(this.state)} `);

      if (this.onStateChange) {
        this.onStateChange(this.state);
      } else {
        console.log(`${this.id}: no onStateChange handler registered`);
      }
    });
  }

  onInit() {
    throw new Error("Module: onInit needs override");
  }

  log(message: string) {
    console.log(`${this.id}: ${message}`)
  }
  
  setState(state) {
    // this.emit("module/next-state", {
    //   [this.id]: state,
    // });
    console.log(`Module ${this.id}: initiating state update with values:`, JSON.stringify(state))
    this.dataRef.update({ ...this.state, ...state } );
  }
}

