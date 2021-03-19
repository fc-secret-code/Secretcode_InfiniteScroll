// Import stylesheets
import "./style.css";
import renderList from "./listRenderer";
import { debounce } from "./util";

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
const onScroll = e => {
  // do something
  const { 
    clientHeight,
    scrollTop,
    scrollHeight
  } = e.target.scrollingElement;
  if (scrollTop + clientHeight === scrollHeight) {
    fetchMore();
  }
};

document.addEventListener("scroll", debounce(onScroll, 300));
fetchMore();




/**
 * 
 <해설>
scroll 이벤트는 매우 많이 발생하므로 성능 저하가 우려된다. ‘fetchMore’ 동작은 스크롤의 최하단에서만 발생하므로 스크롤 이벤트 중 마지막 값에 대해서만 반응하는 것으로 충분하다.

이를 위한 기법인 throttle / debounce를 해설 영상 클립을 통해 소개.

 */