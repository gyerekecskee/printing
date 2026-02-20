export class Tag {
  constructor(id, name, worth) {
    this.id = id;
    this.name = name;
    this.worth = worth;
  }

  static ENTERTAINMENT = new Tag(0, "Entertainment", 2500);
  static ECONOMY       = new Tag(1, "Economy",       2500);
  static SOCIETY       = new Tag(2, "Society",       2500);
  static SPORT         = new Tag(3, "Sport",         2500);
  static GOSSIP        = new Tag(4, "Gossip",        2500);
  static DIRT          = new Tag(5, "Dirt",          2500);
  static POLITICS      = new Tag(6, "Politics",      2500);
  static CRIME         = new Tag(7, "Crime",         2500);
  static UNREST        = new Tag(8, "Unrest",        2500);
  static TRAGIC        = new Tag(9, "Tragic",        2500);
  static HOPEFUL       = new Tag(10, "Hopeful",      2500);
  static TRIUMPHANT    = new Tag(11, "Triumphant",   2500);
  static GRUESOME      = new Tag(12, "Gruesome",     2500);
  static EDUCATIONAL   = new Tag(13, "Educational",  5000);
  static OLD_NEWS      = new Tag(14, "OldNews",      -1000);
}

Object.freeze(Tag);
