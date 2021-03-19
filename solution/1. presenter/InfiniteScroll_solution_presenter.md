## Case3 : Infinite Scroll - 출제자 해설

### q1. 문제 상황에 대하여 Java Script로 동작을 구현시킬 수 있는 코드를 작성해보세요

#### A)

```js
// index.js

import renderList from "./listRenderer";
import "./style.css";

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
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
  if (scrollTop >= scrollHeight - clientHeight) {
    fetchMore();
  }
};

document.addEventListener("scroll", onScroll);
fetchMore();


```

##### 해설
- scrollTop, clientHeight, scrollHeight 등의 값이 무엇을 의미하는지를 개발자도구의 element 탭을 통해 파악하자.



### q2. 앞서 작성한 코드에 debounce를 적용해보자.

#### A)

```js
// index.js

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
  const { clientHeight, scrollTop, scrollHeight } = e.target.scrollingElement;
  if (scrollTop >= scrollHeight - clientHeight) {
    fetchMore();
  }
};

document.addEventListener("scroll", debounce(onScroll, 300));
fetchMore();
```

```js
// util.js
const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

export const randomTimer = (func, ...args) => resolve => {
  setTimeout(() => resolve(func(...args)), getRandomSeconds());
};

export const debounce = (func, delay) => {
  let timeoutId = null;
  // do something
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};

export const dummyFetcher = (method, args) =>
  new Promise(randomTimer(method, args));

```

##### 해설
- scroll 이벤트는 매우 많이 발생하므로 성능 저하가 우려된다. ‘fetchMore’ 동작은 스크롤의 최하단에서만 발생하므로 스크롤 이벤트 중 마지막 값에 대해서만 반응하는 것으로 충분하다. 이를 위한 기법인 throttle / debounce 소개.



### q3. 이번에는 Intersection Observer를 활용해보자

#### A)

```js
// index.js

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
    // do something
  if (isIntersecting) fetchMore();
});
fetchMoreObserver.observe(fetchMoreTrigger);

fetchMore();

```

##### 해설
- IntersectionObserver는 자바스크립트 메인 쓰레드에서 실행되는 Event Listener가 아닌 브라우저에서 별도로 마련한 API이므로 성능 저하의 우려가 적다.



### q4. React + Intersection Observer를 활용하여 구현해보세요.

#### A)

```js
import React, { useRef, useEffect } from "react";

const FetchMore = ({ loading, setPage }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
      // do something
    if (isIntersecting) setPage(prev => prev + 1);
  });

  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, []);

  return (
    <div
      id="fetchMore"
      className={loading ? "loading" : ""}
      ref={fetchMoreTrigger}
    />
  );
};

export default FetchMore;

```

##### 해설
- 일반적으로 쓰지 않게 되는 시점에 unobserve / removeEventListener 등을 해줘야한다는 것을 잊어버리거나, 혹은 생각해냈더라도 코드 구현이 애매한 경우가 종종 있는데, React에서는 useEffect 내에서 observe - unobserve / addEventListener - removeEvenntListener를 쌍으로 매칭하여 구현하는 것이 자연스럽기 때문에 익숙해지면 잊어버릴 일이 없게 된다.
