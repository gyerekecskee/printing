export class Page {
  mul;
  mSlot;
  sSlot;
  tSlot;

  constructor(mul, mSlot, sSlot, tSlot) {
    this.mul = mul;
    this.mSlot = mSlot;
    this.sSlot = sSlot;
    this.tSlot = tSlot;
  }

  getPoints() {
    return this.mul * 2500 * this.mSlot.tags.length + 2500 * this.sSlot.tags.length + 2500 * this.tSlot.tags.length;
  }

}
