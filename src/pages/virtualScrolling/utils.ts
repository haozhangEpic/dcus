export const getData = function () {
  let arr = [];
  for (let i = 0; i < 20000; i++) {
    arr[i] = {
      words: "worlds" + i,
      content: "content" + i,
    };
  }
  return arr;
};
