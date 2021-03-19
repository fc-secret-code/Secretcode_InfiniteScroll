const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

export const randomTimer = (func, ...args) => (resolve) => {
  setTimeout(() => resolve(func(...args)), getRandomSeconds());
};

export const dummyFetcher = (method, args) =>
  new Promise(randomTimer(method, args));
  
export const debounce = (func, delay) => {
  let timeoutId = null;
  // do something
  return (...arg) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func.bind(null, ...arg), delay);
  };
};






/**
 * 
 <해설>
scroll 이벤트는 매우 많이 발생하므로 성능 저하가 우려된다. ‘fetchMore’ 동작은 스크롤의 최하단에서만 발생하므로 스크롤 이벤트 중 마지막 값에 대해서만 반응하는 것으로 충분하다.

이를 위한 기법인 throttle / debounce를 해설 영상 클립을 통해 소개.

 */