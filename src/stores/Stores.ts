import {poloniexStore, PoloniexStore} from './PoloniexStore';

export class Stores {
  poloniex: PoloniexStore;

  constructor() {
    this.poloniex = poloniexStore as PoloniexStore;
  }
}

export const stores = new Stores();
