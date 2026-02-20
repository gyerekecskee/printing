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
    let points = this.mul * 2500 * this.mSlot.tags.length + 2500 * this.sSlot.tags.length + 2500 * this.tSlot.tags.length;
    points += countCombos(this.mSlot.tags, this.sSlot.tags, this.tSlot.tags) * 2500;
    return points;

    function countCombos(...lists) {
      const counts = {};
      for (const list of lists) {
        console.log(list);
        const seen = new Set(list); // avoid double-counting within same list
        for (const num of seen) {
          counts[num] = (counts[num] || 0) + 1;
        }
      }
      return Object.values(counts)
        .filter(c => c > 1)
        .reduce((sum, c) => sum + (c - 1), 0);
    }
  }

}
