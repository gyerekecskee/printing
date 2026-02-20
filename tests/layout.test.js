import { Layout } from '../js/layout.js';
import {News} from "../js/news.js";
import { test, expect } from '@jest/globals';
import {Page} from "../js/page.js";

test('72500', () => {
  const slots = [new News([6, 8, 2, 9]), new News([0, 2]), new News([6, 11]), new News([1,10]), new News([1]), new News([1])];
  const layout = new Layout(slots, 1);

  const points = layout.points;
  expect(points).toBe(72500);
});

test('45000', () => {
  const page = new Page(3, new News([6, 8, 2, 9]), new News([0, 2]), new News([6, 11]));

  const points = page.getPoints();
  expect(points).toBe(45000);
});
