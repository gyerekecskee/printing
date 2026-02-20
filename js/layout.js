import {Page} from "./page.js";

export class Layout {
  constructor(slots) {
    this.pages = [];
    for (let i = 0; i < slots.length; i+=3) {
      let mul = 3;
      if (i > 0) {
        mul = 2;
      }
      this.pages.push(new Page(mul, slots[i], slots[i+1], slots[i+2]));
    }
    this.points = this.calcPoints();
  }

  calcPoints() {
    let points = 0;
    for (let i = 0; i < this.pages.length; i++) {
      points += this.pages[i].getPoints();
    }
    return points;
  }
}
