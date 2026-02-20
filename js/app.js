import {Solver} from "./solver.js";
import {Page} from "./page.js";
import {News} from "./news.js";
import {Tag} from "./Tag.js";

const newsContainer = document.getElementById("newsBoxes");
const pagesContainer = document.getElementById("pages-container");
const hotContainer = document.getElementById("hot-topics");
document.getElementById("solve").addEventListener("click", solve);
document.getElementById("addNews").addEventListener("click", addNews);
document.getElementById("add-page").addEventListener("click", addPage);

// const Tag = Object.freeze({
//   Entertainment: 0,
//   Economy: 1,
//   Society: 2,
//   Sport: 3,
//   Gossip: 4,
//   Dirt: 5,
//   Politics: 6,
//   Crime: 7,
//   Unrest: 8,
//   Tragic: 9,
//   Hopeful: 10,
//   Triumphant: 11,
//   Gruesome: 12,
//   Educational: 13,
//   OldNews: 14,
// });

const news = reactive([], render);
const pages = reactive([], renderPages);
let hotTopic = null;

function addNews() {
  news.push(new News())
}

function reactive(arr, onChange) {
  return new Proxy(arr, {
    set(target,key, value) {
      target[key] = value;
      onChange();
      return true;
    }
  });
}

function render() {
  newsContainer.innerHTML = "";
  news.forEach(newsItem => newsContainer.appendChild(renderItem(newsItem)));
  hotContainer.innerHTML = "";
  hotContainer.appendChild(renderHotItem(new News()));
}

function renderItem(newsItem) {
  const template = document.getElementById("news-template");
  const clone = template.content.cloneNode(true);

  Object.entries(Tag).forEach(([, tag]) => {
    const btn = document.createElement("button");
    const img = document.createElement("img");
    img.src = `../img/tags/${tag.id}.png`;
    img.alt = tag.name;
    btn.appendChild(img);
    clone.appendChild(btn);
    btn.onclick = () => {
      if (newsItem.tags.includes(tag)) {
        newsItem.removeTag(tag);
      } else {
        newsItem.addTag(tag);
      }
      render();
    };
    if (!newsItem.tags.includes(tag)) {
      btn.classList.add("tag-inactive");
    }
  });
  return clone;
}

function renderHotItem() {
  const template = document.getElementById("news-template");
  const clone = template.content.cloneNode(true);

  Object.entries(Tag).forEach(([, tag]) => {
    const btn = document.createElement("button");
    const img = document.createElement("img");
    img.src = `../img/tags/${tag.id}.png`;
    img.alt = tag.name;
    btn.appendChild(img);
    clone.appendChild(btn);
    btn.onclick = () => {
      hotTopic = tag;
      render();
    };
    if (hotTopic !== tag) {
      btn.classList.add("tag-inactive");
    }
  });
  return clone;
}

render();

function solve() {
  const solver = new Solver(news, pages.length, hotTopic);
  solver.solve();
  const score = solver.maxPoints;
  document.getElementById("score").textContent = "score: " + score;
  const layout = solver.maxLayout;
  const template = document.getElementById("filled-template");



  function renderNews(news, id) {
    let clone = template.content.cloneNode(true);
    const tags = news.tags;
    tags.forEach((tag) => {
      const img = document.createElement("img");
      img.src = `../img/tags/${tag.id}.png`;
      img.alt = tag.name;
      clone.appendChild(img);
    });
    document.getElementById(id).appendChild(clone);
  }

  for (let i = 0; i < pages.length; i++) {
    renderNews(layout.pages[i].mSlot, "s" + (i * 3));
    renderNews(layout.pages[i].sSlot, "s" + (i * 3 + 1));
    renderNews(layout.pages[i].tSlot, "s" + (i * 3 + 2));
  }

}

function addPage() {
  pages.push(new Page(2, null, null, null));
}

function renderPages() {
  pagesContainer.innerHTML = "";
  for (let i = 0; i < pages.length; i++) {
    pagesContainer.appendChild(renderPage(i));
  }
  // pages.forEach(page => pagesContainer.appendChild(renderPage(page)));
}

function renderPage(id) {
  const template = document.getElementById("page-template");
  const clone = template.content.cloneNode(true);
  clone.querySelector(".main-slot").id = "s" + (id * 3);
  clone.querySelector(".b1").id = "s" + (id * 3 + 1);
  clone.querySelector(".b2").id = "s" + (id * 3 + 2);

  return clone;
}
