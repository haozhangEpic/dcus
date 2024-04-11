import tetris_config from "@site/src/config/tetris_config";

export const createBlock = function (type = "div") {
  if (type === "div") {
    let blc = document.createElement(type);
    return blc;
  }
  if (type === "block") {
    let maxRandom = tetris_config.length;
    let randomNum = Math.floor(Math.random() * maxRandom);
    let copy = [[]];
    let config = tetris_config[1];
    config.forEach((e, i) => {
      copy[i] instanceof Array ? copy[i] : (copy[i] = []);
      e.forEach((e_, i_) => {
        copy[i][i_] = config[i][i_];
      });
    });
    return copy;
  }
  return null;
};
export function merge(scene, block, currentIndex) {
  for (
    let i = currentIndex[1], i_ = block.length - 1;
    i_ >= 0 && i >= 0;
    i_--, i--
  ) {
    if (scene[i]) {
      for (
        let j = currentIndex[0], j_ = 0;
        j_ < block[i_].length && j < scene[i].length;
        j++, j_++
      ) {
        if (block[i_][j_]) {
          scene[i][j] = block[i_][j_];
        }
      }
    }
  }
}
export function draw(data) {
  // 画已经落好的块
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    for (let j = 0; j < element.length; j++) {
      domMap[i][j].style.backgroundColor = data[i][j] ? "#ccc" : "";
    }
  }
  // 画正在操作的块
  for (let index = currentBlock.length - 1; index >= 0; index--) {
    const element = currentBlock[index];
    let domRowIndex = currentBlock.length - 1 - index;
    for (let j = 0; j < element.length; j++) {
      if (
        domMap[currentIndex[1] - domRowIndex] &&
        domMap[currentIndex[1] - domRowIndex][currentIndex[0] + j]
      ) {
        if (currentBlock[index][j]) {
          domMap[currentIndex[1] - domRowIndex][
            currentIndex[0] + j
          ].style.backgroundColor = "#ccc";
        }
      }
    }
  }
  scoreDom.innerHTML = `分数：${score}`;
}
export function check(dir = "down", bg, bk, position) {
  let scene_data = bg;
  let currentBlock = bk;
  let currentIndex = position;
  let result = false;
  if (
    currentIndex[1] > scene_data.length - 1 &&
    currentBlock[currentBlock.length - 1].every((i) => i == 1)
  ) {
    // 触底了
    result = true;
    return result;
  }
  // 判断是否触底需要提前一步预测
  // let lastRow = scene_data[currentIndex[1]]
  // 检测横向是否有块,先从当前方块的最底下一行开始检测
  switch (dir) {
    case "down":
      // 方块最高有效行
      let topRowIndex = currentBlock.length - 1;
      for (let i = currentBlock.length - 1; i >= 0; i--) {
        const currentLastRow = currentBlock[i];
        let sceneRowIndex = currentIndex[1] - currentBlock.length + 1 + i;
        for (let j = 0; j < currentLastRow.length; j++) {
          const block = currentLastRow[j];
          if (block && sceneRowIndex >= 0) {
            topRowIndex = i;
            if (
              !scene_data[sceneRowIndex] ||
              (sceneRowIndex >= 0 &&
                scene_data[sceneRowIndex][j + currentIndex[0]])
            ) {
              if (currentIndex[1] <= topRowIndex) {
                gameOver();
              }
              result = true;
              break;
            }
          }
        }
        if (result) {
          break;
        }
      }
      break;
    case "axis_r":
      for (let i = currentBlock.length - 1; i >= 0; i--) {
        const currentLastRow = currentBlock[i];
        let sceneRowIndex = currentIndex[1] - currentBlock.length + 1 + i;
        for (let j = currentLastRow.length - 1; j >= 0; j--) {
          const block = currentLastRow[j];
          if (block) {
            // 遍历有边界情况
            if (
              sceneRowIndex >= 0 &&
              (scene_data[sceneRowIndex][j + currentIndex[0]] ||
                currentIndex[0] + j > scene_data[sceneRowIndex].length - 1)
            ) {
              result = true;
              break;
            }
            continue;
          }
        }
        if (result) {
          break;
        }
      }
      break;
    case "axis_l":
      for (let i = currentBlock.length - 1; i >= 0; i--) {
        const currentLastRow = currentBlock[i];
        let sceneRowIndex = currentIndex[1] - currentBlock.length + 1 + i;
        for (let j = 0; j < currentLastRow.length; j++) {
          const block = currentLastRow[j];
          if (block) {
            // 遍历有边界情况
            if (
              (sceneRowIndex >= 0 &&
                scene_data[sceneRowIndex][j + currentIndex[0]]) ||
              currentIndex[0] + j < 0
            ) {
              result = true;
              break;
            }
            continue;
          }
        }
        if (result) {
          break;
        }
      }
      break;
    case "rotateEdge":
      // 判断变形以后是否超出边界需要移动位置
      // 获取左右两侧最长边界位置
      let { left, right } = getBlockEdgeMaxIndex(currentBlock);
      if (currentIndex[0] + left < 0) {
        return [0 - left, currentIndex[1]];
      } else if (right + currentIndex[0] > COL_MAX - 1) {
        return [COL_MAX - 1 - right, currentIndex[1]];
      }
      break;
    default:
      break;
  }

  // result = merge(scene_data, currentBlock)
  return result;
}
// 得分，此处可以计算得分
export function broadcast(rows) {
  score += rows * 10;
}
export function calculateScores(scene_data) {
  let scoreList = [];
  for (let i = 0; i < scene_data.length; i++) {
    const element = scene_data[i];
    let res = element.every((i) => i == 1);
    // 标记需要消除计算分数
    if (res) {
      scoreList.push(i);
    }
  }

  // 是否需要在下一个帧中继续结算方块
  if (scoreList.length > 0) {
    scoreList.forEach((rowIndex) => {
      scene_data.splice(rowIndex, 1);
      scene_data.unshift(new Array(COL_MAX).fill(0));
      // draw(scene_data)
    });
    broadcast(scoreList.length);
    return true;
  } else {
    return false;
  }
}
// 获取盒子上下左右有效边界
export function getBlockEdgeMaxIndex(currentBlock) {
  let left = currentBlock[0].length - 1;
  let right = 0;
  let top = currentBlock.length - 1;
  let bottom = 0;
  for (let i = 0; i < currentBlock.length; i++) {
    const element = currentBlock[i];
    for (let j = 0; j < element.length; j++) {
      const block = element[j];
      if (block) {
        top = top < i ? i : top;
        bottom = bottom > i ? bottom : i;
        left = j < left ? j : left;
        right = j > right ? j : right;
      }
    }
  }
  return {
    top,
    bottom,
    left,
    right,
  };
}
// 游戏结束
export function gameOver() {
  stopFlag = true;
  cancelAnimationFrame(taskFlag);
  taskFlag = null;
  alert("游戏结束，您的得分为：" + score);
}
export function deepClone2DArray(arr) {
  return arr.map(function (subArray) {
    return Array.isArray(subArray) ? deepClone2DArray(subArray) : subArray;
  });
}
export function rotateMatrix(arr) {
  let matrix = deepClone2DArray(arr);
  const n = matrix.length;
  for (let i = 0; i < n / 2; i++) {
    for (let j = i; j < n - i - 1; j++) {
      let temp = matrix[i][j];
      matrix[i][j] = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - 1 - j];
      matrix[n - 1 - i][n - 1 - j] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = temp;
    }
  }
  return matrix;
}
