import "./style.css";
import renderList from "./listRenderer";

const app = document.querySelector("#app");
const fetchMoreTrigger = document.querySelector("#fetchMore");
let page = 0;

const loadMore = async () => {
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
  // do something (hint: e.target.scrollingElement)
  const {
    scrollTop,
    clientHeight,
    scrollHeight,
  } = e.currentTarget.scrollingElement

  /**
   * 현재 스크롤된 위치를 0-1 값으로 구함
   * `scrollTop` ⇒ 현재 스크롤된 위치, `clientHeight` ⇒ 현재 뷰포트의 높이, `scrollHeight` ⇒ 스크롤 영역 높이
   */
  const scrollRatio = (scrollTop + clientHeight) / scrollHeight;

  /**
   * [!] 브라우저 또는 단말마다 편차가 있을수 있어 1(100%) 값 보다는 `0.95 ~ 0.99` 값을 적용하는게 더 자연스러움
   */
  if (scrollRatio > scrollThreshold) {
    loadMore();
  }
};

document.addEventListener("scroll", onScroll);
loadMore();


/**
 * <해설>
 * 문제 힌트로 주어진 `scrollTop`, `clientHeight`, `scrollHeight` 속성 값들을 이용하여 스크롤된 퍼센테이지 값을 구하고,
 * 임계 값(95% 이상)에 초과하는 경우 추가적으로 데이터를 불러오도록 하였습니다.
 */