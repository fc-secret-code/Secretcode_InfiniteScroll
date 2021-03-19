import "./style.css";
import renderList from "./listRenderer";
import { debounce } from "./util";

const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const fetchMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};

const onScroll = e => {
  // do something
};

document.addEventListener("scroll", undefined /* fix here */);
fetchMore();
