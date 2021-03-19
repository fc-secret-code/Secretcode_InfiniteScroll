## Case3 : Infinite Scroll - 대기업 S사 프론트엔드 개발자님의 답안

### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요

#### A)
```js
// index.js

...

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
```

##### 해설
- 문제 힌트로 주어진 `scrollTop`, `clientHeight`, `scrollHeight` 속성 값들을 이용하여 스크롤된 퍼센테이지 값을 구하고, 임계 값(95% 이상)에 초과하는 경우 추가적으로 데이터를 불러오도록 구현.


### q2. 앞서 작성한 코드에 debounce를 적용해보자.

#### A)

```js
// index.js

...

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
```

```js
// debounce.js
/**
 * 입력된 `func` 함수가 연속하여 호출되도 마지막으로 "함수가 호출된 시간 + `delay`" 시간이후에 1회만 실행
 * 
 * @param {function} func 
 * @param {number} delay 단위는 milliseconds 입니다.
 */
const debounce = (func, delay) => {
    /**
     * `setTimeout` 아이디를 저장
     */
    let procId = null;
    return (...args) => {
        if (procId) {
            /**
             * `procId`가 존재하면 실행되지 않도록 제거
             */
            window.clearTimeout(procId);
        }
        /**
         * `delay` 이후 해당 함수가 실행되도록 `setTimeout`에 태스크를 등록
         */
        procId = setTimeout(() => func(...args), delay);
    }
};
```
```js
// util.js

export const debounce = (func, delay) => {
  /**
   * setTimeout 실행시 태스크 아이디를 저장
   */
  let timeoutId = null;
  return (...args) => {
    /**
     * 이미 실행 대기중인 태스크가 존재하는 경우 해당 태스크를 제거
     */
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    /**
     * 입력받은 `delay 후에 해당 함수가 실행되도록 `setTimeout` 실행
     */
    timeoutId = setTimeout(func, delay, ...args);
  }
};

export const dummyFetcher = (method, args) =>
  new Promise(randomTimer(method, args));
```

##### 해설
- `q1`에서 구현한 `onSCroll` 함수를 `debounce` 유틸을 적용하여 스크롤이 연속적으로 동작하더라도 이벤트가 매번 실행되지 않고 가장 마지막 동작후 `delay`가 초과된 시점에 한번만 실행되도록 하여 성능을 개선하였습니다.

##### 팁
- `debounce`, `throttle` 유틸함수는 자주 사용되기 때문에 사용방법과 원리를 이해하고 계시는게 좋습니다.
    - https://www.npmjs.com/package/lodash.debounce
    - https://www.npmjs.com/package/lodash.throttle
- `debounce`는 클로저(closure)의 원리를 이해하고, `setTimeout`를 알고 있으면 간단히 구현할 수 있습니다.
    - https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures
    - https://developer.mozilla.org/ko/docs/Web/API/WindowTimers/setTimeout



### q3. 이번에는 Intersection Observer를 활용해보자

#### A)
```js
// index.js

...

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  // do something
  if(isIntersecting){
    fetchMore();
  }
});

fetchMoreObserver.observe(fetchMoreTrigger);

fetchMore();
```

##### 해설 
- IntersectionObserver 사용시 위와같은 케이스에서 성능 부하를 크게 줄일수 있습니다.
- 실제로 IntersectionObserver가 하는 역할을 유사하게 구현하기 위해서는, 스크롤 이벤트가 동작할때 마다 각 객체의 offset(위치) 정보를 확인하고 계산하여야 하는데, 반복되는 스크롤 이벤트에 따른 부하 + 객체의 offset를 알아내기 위한 속성값을 호출할때 발생하는 reflow 비용이 발생합니다.

 ##### 관련자료
- https://developer.mozilla.org/ko/docs/Web/API/IntersectionObserver 
- https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
- https://gist.github.com/paulirish/5d52fb081b3570c81e3a


### q4. React + Intersection Observer를 활용하여 구현해보세요.
> [문제 3] 내용을 참고해 주세요!

### 결론
- Intersection Observer를 이용하면 스크롤 이벤트를 이용하지 않고 간단히 해결이 가능하고, 스크롤 이벤트를 이용하는것 보다 좋은 성능을 낼 수 있습니다.