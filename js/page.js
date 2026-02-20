export class Page {
  mul;
  mSlot;
  sSlot;
  tSlot;

  constructor(mul, mSlot, sSlot, tSlot, hotTopic) {
    this.mul = mul;
    this.mSlot = mSlot;
    this.sSlot = sSlot;
    this.tSlot = tSlot;
    this.hotTopic = hotTopic;
  }

  getPoints() {
    let mPoints = this.mul * 2500 * this.mSlot.tags.length;
    if (this.mSlot.tags.includes(this.hotTopic)) {
      mPoints += 2500;
    }
    let sPoints = 2500 * this.sSlot.tags.length;
    if (this.sSlot.tags.includes(this.hotTopic)) {
      sPoints += 2500;
    }
    let tPoints = 2500 * this.tSlot.tags.length;
    if (this.tSlot.tags.includes(this.hotTopic)) {
      tPoints += 2500;
    }
    let points =  mPoints + sPoints + tPoints;
    points += countCombos(this.mSlot.tags, this.sSlot.tags, this.tSlot.tags) * 2500;
    return points;

    function countCombos(...lists) {
      const counts = {};
      for (const list of lists) {
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
