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
  if(isIntersecting){
    fetchMore();
  }
});

fetchMoreObserver.observe(fetchMoreTrigger);

fetchMore();

/**
 * [!] 문제 범위인지 확인필요 - `#fetchMore` 스타일의 `display: none` 속성 때문에 intersectionObserver 동작하지 않음
 * 
 * <해설>
 * IntersectionObserver 사용시 위와같은 케이스에서 성능 부하를 크게 줄일수 있습니다.
 * 실제로 IntersectionObserver가 하는 역할을 유사하게 구현하기 위해서는, 스크롤 이벤트가 동작할때 마다 각 객체의 offset(위치) 정보를 확인하고 계산하여야 하는데,
 * 반복되는 스크롤 이벤트에 따른 부하 + 객체의 offset를 알아내기 위한 속성값을 호출할때 발생하는 reflow 비용이 발생합니다.
 * 
 * @see https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver IntersectionObserver
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect Element.getBoundingClientRect
 * @see https://gist.github.com/paulirish/5d52fb081b3570c81e3a What forces Layout / Reflow - paulrish
 */