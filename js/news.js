export class News {
  constructor(tags = []) {
    this.tags = tags
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
}
