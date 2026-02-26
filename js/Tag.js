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
  static UNVEILING     = new Tag(15, "Unveiling",    2500);
  static ALARMING      = new Tag(16, "Alarming",     2500);
  static INVESTIGATIVE = new Tag(17, "Investigative",5000);
  static MAYOR         = new Tag(18, "Mayor",        0);
  static PROPAGANDA    = new Tag(19, "Propaganda",   -1000);
  static INSIDER       = new Tag(20, "Insider",      5000);
  static STATISTICS    = new Tag(21, "Statistics",   5000);
  static INSPIRING     = new Tag(22, "Inspiring",    2500);
  static DEFEAT        = new Tag(23, "Defeat",       2500);
  static STATEMENT     = new Tag(24, "Statement",    5000);
  static FAME          = new Tag(25, "Fame",         5000);
  static REVEALING     = new Tag(26, "Revealing",    10000);
  static UNPOPULAR     = new Tag(27, "Unpopular",    -1000);
  static ADVENTUROUS   = new Tag(28, "Adventurous",  2500);
}

Object.freeze(Tag);
