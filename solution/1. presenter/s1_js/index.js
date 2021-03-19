import "./style.css";
import renderList from "./listRenderer";

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
  // do something (hint : e.target.scrollingElement)
  const { 
    clientHeight, 
    scrollTop, 
    scrollHeight 
  } = e.target.scrollingElement;
  if (scrollTop + clientHeight === scrollHeight ) {
    fetchMore();
  }
};

document.addEventListener("scroll", onScroll);
fetchMore();




/**
 * 
 <해설>
scrollTop, clientHeight, scrollHeight 등의 값이 무엇을 의미하는지를 개발자도구의 element 탭을 통해 파악하자.


 */