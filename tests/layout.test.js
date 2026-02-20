import { Layout } from '../js/layout.js';
import {News} from "../js/news.js";
import { test, expect } from '@jest/globals';
import {Page} from "../js/page.js";
import {Tag} from "../js/Tag.js";

test('72500', () => {
  const slots = [
    new News([Tag.POLITICS, Tag.UNREST, Tag.SOCIETY, Tag.TRAGIC]),
    new News([Tag.ENTERTAINMENT, Tag.SOCIETY]),
    new News([Tag.POLITICS, Tag.TRIUMPHANT]),
    new News([Tag.ECONOMY, Tag.HOPEFUL]),
    new News([Tag.ECONOMY]),
    new News([Tag.ECONOMY]),
  ];
  const layout = new Layout(slots, Tag.ECONOMY);

  const points = layout.points;
  expect(points).toBe(72500);
});

test('45000', () => {
  const page = new Page(3, new News([Tag.POLITICS, Tag.UNREST, Tag.SOCIETY, Tag.TRAGIC]), new News([Tag.ENTERTAINMENT, Tag.SOCIETY]), new News([Tag.POLITICS, Tag.TRIUMPHANT]));

  const points = page.getPoints();
  expect(points).toBe(45000);
});

test('10000', () => {
  const news = new News([Tag.POLITICS, Tag.UNREST, Tag.SOCIETY, Tag.TRAGIC]);

  const points = news.rawPoints();
  expect(points).toBe(10000);
});

