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
    let mPoints = this.mul * this.mSlot.rawPoints();
    if (this.mSlot.tags.includes(this.hotTopic)) {
      mPoints += 2500;
    }
    let sPoints = this.sSlot.rawPoints();
    if (this.sSlot.tags.includes(this.hotTopic)) {
      sPoints += 2500;
    }
    let tPoints = this.tSlot.rawPoints();
    if (this.tSlot.tags.includes(this.hotTopic)) {
      tPoints += 2500;
    }
    let points =  mPoints + sPoints + tPoints;
    points += countCombos(this.mSlot.tags, this.sSlot.tags, this.tSlot.tags) * 2500;
    return points;

    function countCombos(...lists) {
      const counts = new Map();
      for (const list of lists) {
        const seen = new Set(list); // avoid double-counting within same list
        for (const tag of seen) {
          counts.set(tag, (counts.get(tag) || 0) + 1);
        }
      }
      return [...counts.values()]
        .filter(c => c > 1)
        .reduce((sum, c) => sum + (c - 1), 0);
    }
  }

}
