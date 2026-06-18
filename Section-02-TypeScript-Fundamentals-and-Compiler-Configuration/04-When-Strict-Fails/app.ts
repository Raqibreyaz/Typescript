import {x} from './app'

interface Settings {
  darkMode: boolean;
  lastSaved: Date;
  [custom: string]: string | number | boolean | Date;
}

const setting: Settings = {
  darkMode: true,
  lastSaved: new Date(),
};

class Box {
  private value: number;

  constructor(val:number) {
    this.value = val;
  }

  close() {
    console.log("Closing Lid");
  }
}

class Model extends Box {
  override close() {
    console.log("Closed");
  }
}
