import {Layout} from "./layout.js";

export class Solver {
  maxLayout;
  constructor(newsItems, numOfPages, hotTopic) {
    this.numOfPages = numOfPages;
    this.hotTopic = hotTopic;
    this.newsItems = this.filterWeakItems(newsItems);
    this.maxPoints = 0;
  }

  solve() {
    // Seed maxPoints with the round-robin minimum before searching
    this.maxPoints = this.calculateRoundRobinMinimum();

    const items = this.newsItems;
    const sorted = [...items].sort((a, b) => b.rawPoints() - a.rawPoints());
    const topItem = sorted[0];
    const rest = sorted.slice(1);

    const topItemDominates = rest.every(item => topItem.rawPoints() >= item.doublePoints(this.hotTopic));
    console.log(topItem.rawPoints());

    if (topItemDominates) {
      this.solveWithFixedLeader(topItem, rest);
    } else {
      this.solveGeneral(items);
    }
  }

  /**
   * Distributes items in round-robin order across pages/slots, scores the result,
   * and returns that score as a known-achievable minimum.
   *
   * Distribution order: page0-slot0, page1-slot0, page2-slot0,
   *                     page0-slot1, page1-slot1, page2-slot1,
   *                     page0-slot2, page1-slot2, page2-slot2, ...
   */
  calculateRoundRobinMinimum() {
    const n = this.numOfPages;
    const items = [...this.newsItems].sort((a, b) => b.rawPoints() - a.rawPoints());
    const arrangement = new Array(n * 3);

    for (let slot = 0; slot < 3; slot++) {
      for (let page = 0; page < n; page++) {
        const itemIndex = slot * n + page;
        const arrangementIndex = page * 3 + slot;
        if (items[itemIndex]) {
          arrangement[arrangementIndex] = items[itemIndex];
        }
      }
    }

    const layout = new Layout(arrangement.filter(Boolean), this.hotTopic);
    this.maxLayout = layout;
    console.log("Round-robin minimum points:", layout.points);
    return layout.points;
  }

  /**
   * Computes an optimistic upper bound for a partial arrangement.
   * Already-placed items contribute their actual points (factoring in doubling).
   * Remaining items contribute their best possible score (doublePoints in top slot).
   *
   * The bound is: actual points so far + sum of doublePoints for remaining items
   * (assuming every remaining item gets the best possible multiplier).
   */
  upperBound(placedLayout, remainingItems) {
    // Points from already-placed items
    const placedPoints = placedLayout ? placedLayout.points : 0;

    // Optimistic: remaining items all get their doublePoints (best case)
    const remainingPotential = remainingItems.reduce(
      (sum, item) => sum + item.doublePoints(this.hotTopic),
      0
    );

    return placedPoints + remainingPotential;
  }

  solveWithFixedLeader(leader, rest) {
    const page1Companions = this.getCombinations(rest, 2);

    for (const companions of page1Companions) {
      const remaining = rest.filter(item => !companions.includes(item));
      const pageCombinations = this.getPageCombinations(remaining, this.numOfPages - 1);

      for (const pageGroups of pageCombinations) {
        // --- Branch-and-bound: check upper bound before permuting ---
        // Best case for this grouping: all top slots get doublePoints
        const allTopSlotItems = [leader, ...pageGroups.map(g => g[0])];
        const allNonTopItems = [...companions, ...pageGroups.flatMap(g => g.slice(1))];
        const optimisticPoints =
          allTopSlotItems.reduce((s, i) => s + i.doublePoints(this.hotTopic), 0) +
          allNonTopItems.reduce((s, i) => s + i.doublePoints(this.hotTopic), 0);

        if (optimisticPoints <= this.maxPoints) continue;

        const pagePerms = this.getIntraPagePermutations(pageGroups);

        for (const pages of pagePerms) {
          const arrangement = [leader, ...companions, ...pages.flat()];
          const layout = new Layout(arrangement, this.hotTopic);
          if (layout.points > this.maxPoints) {
            this.maxPoints = layout.points;
            this.maxLayout = layout;
          }
        }
      }
    }
  }

  solveGeneral(items) {
    const page1Perms = this.getPermutations(items, 3);

    for (const page1 of page1Perms) {
      // --- Branch-and-bound after fixing page 1 leader ---
      // The leader (page1[0]) may get doublePoints; compute optimistic bound
      const remaining = items.filter(item => !page1.includes(item));

      // Optimistic: page1 items all get doublePoints, remaining too
      const optimisticPoints =
        [...page1, ...remaining].reduce((s, i) => s + i.doublePoints(this.hotTopic), 0);

      if (optimisticPoints <= this.maxPoints) continue;

      const pageCombinations = this.getPageCombinations(remaining, this.numOfPages - 1);

      for (const pageGroups of pageCombinations) {
        // Tighter bound: page1 is fixed, check remaining groupings
        const groupOptimistic =
          page1.reduce((s, i) => s + i.doublePoints(this.hotTopic), 0) +
          pageGroups.flat().reduce((s, i) => s + i.doublePoints(this.hotTopic), 0);

        if (groupOptimistic <= this.maxPoints) continue;

        const pagePerms = this.getIntraPagePermutations(pageGroups);

        for (const pages of pagePerms) {
          const arrangement = [...page1, ...pages.flat()];
          const layout = new Layout(arrangement, this.hotTopic);
          if (layout.points > this.maxPoints) {
            this.maxPoints = layout.points;
            this.maxLayout = layout;
          }
        }
      }
    }
  }

  filterWeakItems(items) {
    const k = this.numOfPages * 3;

    const sorted = [...items].sort(
      (a, b) => b.rawPoints() - a.rawPoints()
    );

    const topK = sorted.slice(0, k);

    if (topK.length === 0) return [];

    const threshold = topK[topK.length - 1].rawPoints();
    console.log(threshold);

    return items.filter(item => {
      const dp = item.doublePoints(this.hotTopic);
      return dp > threshold;
    });
  }

  getPageCombinations(arr, n) {
    if (n === 0) return [[]];
    const result = [];
    const first = arr[0];
    const rest = arr.slice(1);
    const pairs = this.getCombinations(rest, 2);
    const seenGroupTags = new Set();

    for (const pair of pairs) {
      const groupKey = [first, ...pair]
        .map(item => JSON.stringify(item.tags?.slice().sort()))
        .sort()
        .join('|');
      if (seenGroupTags.has(groupKey)) continue;
      seenGroupTags.add(groupKey);

      const group = [first, ...pair];
      const unused = rest.filter(item => !pair.includes(item));
      const subCombinations = this.getPageCombinations(unused, n - 1);
      for (const sub of subCombinations) {
        result.push([group, ...sub]);
      }
    }

    return result;
  }

  getIntraPagePermutations(pageGroups) {
    if (pageGroups.length === 0) return [[]];
    const [first, ...rest] = pageGroups;
    const firstPerms = this.getLeaderPermutations(first);
    const restPerms = this.getIntraPagePermutations(rest);
    const result = [];
    for (const fp of firstPerms) {
      for (const rp of restPerms) {
        result.push([fp, ...rp]);
      }
    }
    return result;
  }

  getLeaderPermutations(group) {
    const result = [];
    const seenTags = new Set();
    for (let i = 0; i < group.length; i++) {
      const tagKey = JSON.stringify(group[i].tags?.slice().sort());
      if (seenTags.has(tagKey)) continue;
      seenTags.add(tagKey);
      const leader = group[i];
      const others = group.filter((_, j) => j !== i);
      result.push([leader, ...others]);
    }
    return result;
  }

  getCombinations(arr, k) {
    if (k === 0) return [[]];
    if (arr.length < k) return [];
    const [first, ...rest] = arr;
    const withFirst = this.getCombinations(rest, k - 1).map(c => [first, ...c]);
    const withoutFirst = this.getCombinations(rest, k);
    return [...withFirst, ...withoutFirst];
  }

  getPermutations(arr, k) {
    const result = [];
    function backtrack(path, used) {
      if (path.length === k) { result.push([...path]); return; }
      const seenTags = new Set();
      for (let i = 0; i < arr.length; i++) {
        if (used[i]) continue;
        const tagKey = JSON.stringify(arr[i].tags?.slice().sort());
        if (seenTags.has(tagKey)) continue;
        seenTags.add(tagKey);
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
