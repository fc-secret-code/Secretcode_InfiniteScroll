// Import stylesheets
import "./style.css";
import renderList from "./listRenderer";

// Write Javascript code!
const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const fetchMore = async () => {
  const target = page ? fetchMoreTrigger : app;
  target.classList.add("loading");
  await renderList(page++);
  target.classList.remove("loading");
};

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  // do something
});
fetchMoreObserver.observe(fetchMoreTrigger);

fetchMore();
