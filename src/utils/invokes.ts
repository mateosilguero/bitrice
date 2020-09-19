export const throttle = (fn: (...args: unknown[]) => void, wait = 3000) => {
  let isCalled = false;
  return function (...args: unknown[]) {
    if (!isCalled) {
      fn(...args);
      isCalled = true;
      setTimeout(function () {
        isCalled = false;
      }, wait);
    }
  };
};
