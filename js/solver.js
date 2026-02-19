import {Layout} from "./layout.js";

export class Solver {
  maxPoints;
  maxLayout;
  constructor(newsItems) {
    this.newsItems = newsItems;
    this.maxPoints = 0;
  }

  solve() {
    for (let i = 0; i < this.newsItems.length; i++) {
      for (let j = 0; j < this.newsItems.length; j++) {
        if (j === i) {
          continue;
        }
        for (let k = 0; k < this.newsItems.length; k++) {
          if (k === j || k === i) {
            continue;
          }
          console.log(i, j, k);
          const layout = new Layout(this.newsItems[i], this.newsItems[j], this.newsItems[k]);
          let points = layout.points;
          if (points > this.maxPoints) {
            this.maxPoints = points;
            this.maxLayout = layout;
          }
        }
      }
    }
  }
}
