export class Layout {
  constructor(tripleSlot, sSlot, tSlot) {
    this.tripleSlot = tripleSlot;
    this.sSlot = sSlot;
    this.tSlot = tSlot;
    this.points = this.calcPoints();
  }

  calcPoints() {
    let points = 3 * 2500 * this.tripleSlot.tags.length;
    points += 2500 * this.sSlot.tags.length;
    points += 2500 * this.tSlot.tags.length;
    return points;
  }
}
