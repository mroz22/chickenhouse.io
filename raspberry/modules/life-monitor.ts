// @ts-nocheck todo

import {Module} from './module'
import {Gpio} from "../utils/gpio";

export class LifeMonitor extends Module {
  constructor({ id, dataRef }) {

    super({ id, dataRef });

    setInterval(() => {
      this.setState({ lifeMonitor: Date.now() });
    }, 1000 * 10);

    this.init();
  }
}

