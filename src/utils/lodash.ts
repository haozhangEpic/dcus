export const debounce = (callback: () => void, time: number = 400) => {
  let timer = null;
  return function () {
    if (!timer) {
      callback();
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
};
