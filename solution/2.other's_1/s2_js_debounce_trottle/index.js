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
/**
 * 스크롤 임계치
 */
const scrollThreshold = .95;

const onScroll = (e) => {
  const {
    scrollTop,
    clientHeight,
    scrollHeight,
  } = e.target.scrollingElement

  /**
   * 현재 스크롤된 위치를 0-1 값으로 구함
   * `scrollTop` ⇒ 현재 스크롤된 위치, `clientHeight` ⇒ 현재 뷰포트의 높이, `scrollHeight` ⇒ 스크롤 영역 높이
   */
  const scrollRatio = (scrollTop + clientHeight) / scrollHeight;

  /**
   * [!] 브라우저 또는 단말마다 편차가 있을수 있어 1(100%) 값 보다는 `0.95 ~ 0.99` 값을 적용하는게 더 자연스러움
   */
  if (scrollRatio > scrollThreshold) {
    fetchMore();
  }
};

const debounceDelay = 100;
const onDebounceScroll = debounce(onScroll, debounceDelay);

document.addEventListener("scroll", onDebounceScroll);
fetchMore();

/**
 * <해설>
 * `q1`에서 구현한 `onSCroll` 함수를 `debounce` 유틸을 적용하여 스크롤이 연속적으로 동작하더라도 이벤트가 매번 실행되지 않고
 * 가장 마지막 동작후 `delay`가 초과된 시점에 한번만 실행되도록 하였습니다.
 *
 * [!] `debounce`, `throttle` 유틸함수는 자주 사용되기 때문에 사용방법과 원리를 이해하고 계시는게 좋습니다.
 * @see https://www.npmjs.com/package/lodash.debounce Debounce
 * @see https://www.npmjs.com/package/lodash.throttle Throttle
 */