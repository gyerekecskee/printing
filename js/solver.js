import {Layout} from "./layout.js";

export class Solver {
  maxPoints;
  maxLayout;
  constructor(newsItems, numOfPages) {
    this.newsItems = newsItems;
    this.maxPoints = 0;
    this.numOfPages = numOfPages;
  }

  solve() {
    const permutations = this.getPermutations(this.newsItems, this.numOfPages * 3);
    for (let i = 0; i < permutations.length; i++) {
      const layout = new Layout(permutations[i]);
      const points = layout.points;
      if (points > this.maxPoints) {
        this.maxPoints = points;
        this.maxLayout = layout;
      }
    }
  }

  getPermutations(arr, k) {
    const result = [];

    function backtrack(path, used) {
      if (path.length === k) {
        result.push([...path]);
        return;
      }

      for (let i = 0; i < arr.length; i++) {
        if (used[i]) continue;

        used[i] = true;
        path.push(arr[i]);

        backtrack(path, used);

        path.pop();
        used[i] = false;
      }
    }

    backtrack([], Array(arr.length).fill(false));
    return result;
  }
}
