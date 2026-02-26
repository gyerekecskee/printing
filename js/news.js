export class News {
  constructor(tags = []) {
    this.tags = tags;
    this.pinnedSlot = null;
  }

  addTag(tag) {
    if (!this.tags.includes(tag)) this.tags.push(tag);
  }

  removeTag(tag) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  rawPoints() {
    let points = 0;
    this.tags.forEach(tag => points += tag.worth);
    return points;
  }

  doublePoints(hotTopic) {
    let points = 0;
    this.tags.forEach(tag => {
      if (tag.worth > 0) {
        points += 2 * tag.worth;
        if (tag === hotTopic) {
          points += 2 * tag.worth;
        }
      } else {
        points += tag.worth;
      }
    });
    return points;
  }

  pin(page, slot) {
    this.pinnedSlot = { page, slot };
  }
  unpin() {
    this.pinnedSlot = null;
  }
}
