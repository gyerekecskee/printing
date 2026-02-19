import {Solver} from "./solver.js";

const newsContainer = document.getElementById("newsBoxes");
document.getElementById("solve").addEventListener("click", solve);
document.getElementById("addNews").addEventListener("click", addNews);


class News {
  constructor() {
    this.tags = []
  }

  addTag(id) {
    if (!this.tags.includes(id)) this.tags.push(id);
  }

  removeTag(id) {
    this.tags = this.tags.filter(t => t !== id);
  }

  getTagNames() {
    return this.tags.map(id =>
      Object.keys(Tag).find(key => Tag[key] === id)
    )
  }

}

const Tag = Object.freeze({
  Entertainment: 0,
  Economy: 1,
  Society: 2,
  Sport: 3,
  Gossip: 4,
  Dirt: 5,
  Politics: 6,
  Crime: 7,
});

const news = reactive([], render);

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
}

function renderItem(newsItem) {
  const template = document.getElementById("news-template");
  const clone = template.content.cloneNode(true);

  Object.entries(Tag).forEach(([name, id]) => {
    const btn = clone.querySelector(`button[id="${id}"]`);
    btn.querySelector("img").src = `../img/tags/${id}.png`;
    btn.querySelector("img").alt = name;
    btn.onclick = () => {
      if (newsItem.tags.includes(id)) {
        newsItem.removeTag(id);
      } else {
        newsItem.addTag(id);
      }
      render();
    };
    if (!newsItem.tags.includes(id)) {
      btn.classList.add("tag-inactive");
    }
  });

  return clone;
}

render();

function solve() {
  const solver = new Solver(news);
  solver.solve();
  const score = solver.maxPoints;
  console.log(score);
  document.getElementById("score").textContent = "score: " + score;
  const layout = solver.maxLayout;
  const template = document.getElementById("filled-template");
  let clone = template.content.cloneNode(true);

  let tags = layout.tripleSlot.tags;
  tags.forEach((id) => {
    const name = Object.keys(Tag).find(key => Tag[key] === id);
    const img = document.createElement("img");
    img.src = `../img/tags/${id}.png`;
    img.alt = name;
    clone.appendChild(img);
  });
  document.getElementById("top").appendChild(clone);

  clone = template.content.cloneNode(true);

  tags = layout.sSlot.tags;
  tags.forEach((id) => {
    const name = Object.keys(Tag).find(key => Tag[key] === id);
    const img = document.createElement("img");
    img.src = `../img/tags/${id}.png`;
    img.alt = name;
    clone.appendChild(img);
  });
  document.getElementById("l2").appendChild(clone);

  clone = template.content.cloneNode(true);

  tags = layout.tSlot.tags;
  tags.forEach((id) => {
    const name = Object.keys(Tag).find(key => Tag[key] === id);
    const img = document.createElement("img");
    img.src = `../img/tags/${id}.png`;
    img.alt = name;
    clone.appendChild(img);
  });
  document.getElementById("l3").appendChild(clone);
}
