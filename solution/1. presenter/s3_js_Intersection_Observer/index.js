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

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) fetchMore();
});
fetchMoreObserver.observe(fetchMoreTrigger);

fetchMore();





/**
 * 
 <해설>
 IntersectionObserver는 자바스크립트 메인 쓰레드에서 실행되는 Event Listener가 아닌 브라우저에서 별도로 마련한 API이므로 성능 저하의 우려가 적다.

 */