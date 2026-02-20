export class News {
  constructor(tags = []) {
    this.tags = tags
  }

  addTag(id) {
    if (!this.tags.includes(id)) this.tags.push(id);
  }

  removeTag(id) {
    this.tags = this.tags.filter(t => t !== id);
  }
}
