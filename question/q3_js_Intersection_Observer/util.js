const getRandomSeconds = () => (Math.round(Math.random() * 5) + 1) * 250;

export const randomTimer = (func, ...args) => resolve => {
  setTimeout(() => resolve(func(...args)), getRandomSeconds());
};

export const dummyFetcher = (method, args) =>
  new Promise(randomTimer(method, args));
