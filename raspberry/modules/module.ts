// @ts-nocheck

import EventEmitter from "events";
import {updateDoc, onSnapshot } from 'firebase/firestore';

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
    onSnapshot(this.dataRef, async (doc) => {
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
    console.log(`Module ${this.id}: initiating state update with values:`, JSON.stringify(state))
    updateDoc(this.dataRef, { ...this.state, ...state } );
  }
}

