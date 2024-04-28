interface TetrisOptions {
  container: HTMLCanvasElement;
}
let blockconfig = [
  [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
  ],
  [
    [0, 1, 1, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 0, 1],
  ],
  [
    [0, 1, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
];
class Tetris {
  ROW_MAX: number;
  COL_MAX: number;
  BACKGROUND_BLOCK_SIZE: number;
  taskFlag: null | number;
  container: HTMLCanvasElement;
  playerScore: number;
  scene_data: any[];
  programStatus: number | null;
  fallSpeed: number;
  currentBlock: any[];
  [key: string]: any;

  constructor({ container }: TetrisOptions) {
    this.blockconfig = blockconfig;
    this.ROW_MAX = 20;
    this.COL_MAX = 10;
    this.BACKGROUND_BLOCK_SIZE = 20;
    this.taskFlag = null;
    let scene_data = Array.from({ length: this.ROW_MAX }, () =>
      Array.from({ length: this.COL_MAX }).fill(0)
    );
    this.scene_data = scene_data;
    this.currentIndex = [0, 0];
    this.prevExecutionTime = 0;
    this.curExecutionTime = 0;
    this.container = container;
    this.programStatus = null; //null未初始，0等待开始， 1正在运行，2 暂停， 3结束
    this.playerScore = 0;
    this.fallSpeed = 1000;
    this.ctx = null;
    this.currentBlock = null;
  }
  createBlock() {
    let maxRandom = this.blockconfig.length;
    let randomNum = Math.floor(Math.random() * maxRandom);
    let copy = [[]];
    let config = this.blockconfig[1];
    config.forEach((e: any[], i: number) => {
      copy[i] instanceof Array ? copy[i] : (copy[i] = []);
      e.forEach((e: number, i_: number) => {
        copy[i][i_] = config[i][i_];
      });
    });
    return copy;
  }
  init() {
    let ctx = this.container.getContext("2d");
    this.ctx = ctx;
    this.container.width = this.BACKGROUND_BLOCK_SIZE * this.COL_MAX + 10;
    this.container.height = this.BACKGROUND_BLOCK_SIZE * this.ROW_MAX + 10;
    ctx.lineWidth = 0.1;
    ctx.fillStyle = "#cccccc";
    this.clearBoard();
    for (let i = 0; i <= this.ROW_MAX; i++) {
      let y = i * this.BACKGROUND_BLOCK_SIZE + 5;
      ctx.beginPath(); // Start a new path
      ctx.moveTo(5, y); // Move the pen to (30, 50)
      ctx.lineTo(this.container.width - 5, y); // Draw a line to (150, 100)
      ctx.closePath();
      ctx.stroke(); // Render the path
    }
    for (let j = 0; j <= this.COL_MAX; j++) {
      let x = j * this.BACKGROUND_BLOCK_SIZE + 5;
      ctx.beginPath(); // Start a new path
      ctx.moveTo(x, 5); // Move the pen to (30, 50)
      ctx.lineTo(x, this.container.height - 5); // Draw a line to (150, 100)
      ctx.closePath();
      ctx.stroke(); // Render the path
    }
    this.currentBlock = this.createBlock();
    let { left } = this.getBlockEdgeMaxIndex(this.currentBlock);
    this.currentIndex = [Math.floor(this.COL_MAX / 2 - left), -1];
    this.programStatus = 0;
  }
  merge(
    scene: { [x: string]: { [x: string]: any } },
    block: string | any[],
    currentIndex: any[]
  ) {
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
  clearBoard() {
    this.ctx.clearRect(0, 0, this.container.width, this.container.height);
  }
  draw(data: string | any[]) {
    this.clearBoard();
    let ctx = this.ctx;
    let currentBlock = this.currentBlock;
    let currentIndex = this.currentIndex;
    for (let i = 0; i <= this.ROW_MAX; i++) {
      let y = i * this.BACKGROUND_BLOCK_SIZE + 5;
      ctx.beginPath(); // Start a new path
      ctx.moveTo(5, y); // Move the pen to (30, 50)
      ctx.lineTo(this.container.width - 5, y); // Draw a line to (150, 100)
      ctx.closePath();
      ctx.stroke(); // Render the path
    }
    for (let j = 0; j <= this.COL_MAX; j++) {
      let x = j * this.BACKGROUND_BLOCK_SIZE + 5;
      ctx.beginPath(); // Start a new path
      ctx.moveTo(x, 5); // Move the pen to (30, 50)
      ctx.lineTo(x, this.container.height - 5); // Draw a line to (150, 100)
      ctx.closePath();
      ctx.stroke(); // Render the path
    }
    // 画已经落好的块
    for (let i = 0; i < data.length; i++) {
      const element = data[i];
      for (let j = 0; j < element.length; j++) {
        if (data[i][j]) {
          ctx.fillRect(
            j * this.BACKGROUND_BLOCK_SIZE + 5,
            i * this.BACKGROUND_BLOCK_SIZE + 5,
            this.BACKGROUND_BLOCK_SIZE,
            this.BACKGROUND_BLOCK_SIZE
          );
        }
      }
    }
    // 画正在操作的块
    for (let index = currentBlock.length - 1; index >= 0; index--) {
      const element = currentBlock[index];
      let rowInDataIndex = currentIndex[1] - currentBlock.length + 1 + index;
      for (let j = 0; j < element.length; j++) {
        if (
          currentBlock[index][j] &&
          currentIndex[0] + j >= 0 &&
          rowInDataIndex >= 0
        ) {
          ctx.fillRect(
            (currentIndex[0] + j) * this.BACKGROUND_BLOCK_SIZE + 5,
            rowInDataIndex * this.BACKGROUND_BLOCK_SIZE + 5,
            this.BACKGROUND_BLOCK_SIZE,
            this.BACKGROUND_BLOCK_SIZE
          );
        }
      }
    }
    // scoreDom.innerHTML = `分数：${score}`
  }
  check(dir = "down", bg: any, bk: any, position: any) {
    let scene_data = bg;
    let currentBlock = bk;
    let currentIndex = position;
    let result = false;
    if (
      currentIndex[1] > scene_data.length - 1 &&
      currentBlock[currentBlock.length - 1].every((i: number) => i == 1)
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
                  this.gameOver();
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
        let { left, right } = this.getBlockEdgeMaxIndex(currentBlock);
        if (currentIndex[0] + left < 0) {
          return [0 - left, currentIndex[1]];
        } else if (right + currentIndex[0] > this.COL_MAX - 1) {
          return [this.COL_MAX - 1 - right, currentIndex[1]];
        }
        break;
      default:
        break;
    }

    // result = merge(scene_data, currentBlock)
    return result;
  }
  // 得分，此处可以计算得分
  broadcast(rows: number) {
    this.playerScore += rows * 10;
  }
  calculateScores(scene_data: any[]) {
    let scoreList = [];
    for (let i = 0; i < scene_data.length; i++) {
      const element = scene_data[i];
      let res = element.every((i: number) => i == 1);
      // 标记需要消除计算分数
      if (res) {
        scoreList.push(i);
      }
    }

    // 是否需要在下一个帧中继续结算方块
    if (scoreList.length > 0) {
      scoreList.forEach((rowIndex) => {
        scene_data.splice(rowIndex, 1);
        scene_data.unshift(new Array(this.COL_MAX).fill(0));
        // draw(scene_data)
      });
      this.broadcast(scoreList.length);
      return true;
    } else {
      return false;
    }
  }
  // 获取盒子上下左右有效边界
  getBlockEdgeMaxIndex(currentBlock: string | any[]) {
    let left = currentBlock[0].length - 1;
    let right = 0;
    let top = currentBlock.length - 1;
    let bottom = 0;
    for (let i = 0; i < currentBlock.length; i++) {
      const element = currentBlock[i];
      for (let j = 0; j < element.length; j++) {
        const block = element[j];
        if (block) {
          top = top < i ? top : i;
          bottom = bottom > i ? bottom : i;
          left = j <= left ? j : left;
          right = j >= right ? j : right;
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
  gameOver() {
    this.programStatus = 3;
    cancelAnimationFrame(this.taskFlag);
    this.taskFlag = null;
    // alert("游戏结束，您的得分为：" + score);
  }
  //   执行下落逻辑并且检查碰撞
  run() {
    let scene_data: any = this.scene_data;
    let currentIndex = this.currentIndex;
    let result = this.check(undefined, scene_data, this.currentBlock, [
      this.currentIndex[0],
      this.currentIndex[1] + 1,
    ]);
    this.draw(this.scene_data);
    if (result) {
      //当前块已经触底了
      this.merge(scene_data, this.currentBlock, currentIndex);
      this.calculateScores(scene_data);
      this.currentBlock = this.createBlock();
      let { left } = this.getBlockEdgeMaxIndex(this.currentBlock);
      this.currentIndex = [Math.floor(this.COL_MAX / 2) - left, 0];
    } else {
      // 继续下落
      this.currentIndex[1] += 1;
    }
  }
  deepClone2DArray(arr: any[]) {
    let that_ = this;
    return arr.map(function (subArray) {
      return Array.isArray(subArray)
        ? that_.deepClone2DArray(subArray)
        : subArray;
    });
  }
  rotateMatrix(arr: any[]) {
    let matrix = this.deepClone2DArray(arr);
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
  gameStart() {
    this.programStatus = 1;
    this.execChange("start", true);
  }
  main() {
    this.taskFlag = window.requestAnimationFrame((e) => {
      // console.log(curTime - prevTime)
      if (e - this.prevExecutionTime > this.fallSpeed) {
        this.prevExecutionTime = e;
        if (this.programStatus === 1) {
          this.run();
        }
      }
      this.main();
    });
  }
  left() {
    this.execChange("left");
  }
  right() {
    this.execChange("right");
  }
  rotate() {
    this.execChange("rotate");
  }
  fallDown() {
    this.execChange("fallDown");
  }
  execChange(dir: any, flag: boolean = false) {
    if (!flag && this.programStatus !== 1) {
      return false;
    }
    let result = null;
    switch (dir) {
      case "start":
        this.main();
        break;
      case "left":
        result = this.check("axis_l", this.scene_data, this.currentBlock, [
          this.currentIndex[0] - 1,
          this.currentIndex[1],
        ]);
        if (!result) {
          this.currentIndex[0] -= 1;
          this.draw(this.scene_data);
        }
        break;
      case "right":
        result = this.check("axis_r", this.scene_data, this.currentBlock, [
          this.currentIndex[0] + 1,
          this.currentIndex[1],
        ]);
        if (!result) {
          this.currentIndex[0] += 1;
          this.draw(this.scene_data);
        }
        break;
      case "rotate":
        let matrix = this.rotateMatrix(this.currentBlock);
        result = this.check("down", this.scene_data, matrix, [
          this.currentIndex[0],
          this.currentIndex[1],
        ]);
        if (result) {
          // 复原或者换位
        } else {
          this.currentBlock = matrix;
          let positon = this.check(
            "rotateEdge",
            this.scene_data,
            matrix,
            this.currentIndex
          );
          if (positon) {
            this.currentIndex = positon;
          }
          this.draw(this.scene_data);
        }
        break;
      case "fallDown":
        // 计算有效位置
        let { left, bottom, right, top } = this.getBlockEdgeMaxIndex(
          this.currentBlock
        );
        let maxDownIndex = this.scene_data.length - 1;
        for (let i = left; i <= right; i++) {
          for2: for (let j = bottom; j >= top; j--) {
            const element = this.currentBlock[j][i];
            if (element) {
              let stackMinIndex = this.scene_data.length - 1;
              for (
                let i_ = this.scene_data.length - 1;
                i_ >= this.currentIndex[1] - this.currentBlock.length + 1 + j &&
                i_ >= 0;
                i_--
              ) {
                if (this.scene_data[i_][i + this.currentIndex[0]]) {
                  stackMinIndex = i_ < stackMinIndex ? i_ : stackMinIndex;
                  stackMinIndex -= 1;
                }
              }
              if (stackMinIndex < this.scene_data.length - 1) {
                maxDownIndex = stackMinIndex + this.currentBlock.length - 1 - j;
              }
              break for2;
            }
          }
        }
        if (maxDownIndex) {
          this.currentIndex = [this.currentIndex[0], maxDownIndex];
          this.draw(this.scene_data);
        }
        break;
      default:
        break;
    }
  }
  reset() {
    this.programStatus = 0;
    this.currentBlock = this.createBlock();
    this.playerScore = 0;
    this.clearBoard();
    let { left } = this.getBlockEdgeMaxIndex(this.currentBlock);
    this.scene_data = Array.from({ length: this.ROW_MAX }, () =>
      Array.from({ length: this.COL_MAX }).fill(0)
    );
    this.currentIndex = [Math.floor(this.COL_MAX / 2) - left, -1];
    this.draw(this.scene_data);
  }
  pause() {
    window.cancelAnimationFrame(this.taskFlag);
    this.taskFlag = null;
    this.programStatus = 2;
  }
}
export default Tetris;
