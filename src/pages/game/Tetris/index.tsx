import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  createBlock,
  check,
  getBlockEdgeMaxIndex,
  calculateScores,
} from "./utils";
import styles from "./index.module.css";

const ROW_MAX = 10;
const COL_MAX = 10;
const BACKGROUND_BLOCK_SIZE = 20;
let taskFlag = null;
let scene_data_ = Array.from({ length: ROW_MAX }, () =>
  Array.from({ length: COL_MAX }).fill(0)
);
let prevTime = 0;
let curTime = 0;
let fallInterval = 500;
let currentBlock = null;
let stopFlag = false;

export default function Index(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState([2, 3]);
  const [score, setScore] = useState(0);
  const [scene_data, setScene_data] = useState(scene_data_);
  const run = function () {
    console.log("run");
    let result = check(undefined, scene_data, currentBlock, [
      currentIndex[0],
      currentIndex[1] + 1,
    ]);
    // draw(scene_data);
    if (result) {
      //当前块已经触底了
      //   merge(scene_data, currentBlock, currentIndex);
      calculateScores(scene_data);
      currentBlock = createBlock("block");
      let { left } = getBlockEdgeMaxIndex(currentBlock);
      setCurrentIndex([Math.floor(COL_MAX / 2) - left, 0]);
    } else {
      // 继续下落
      currentIndex[1] += 1;
    }
  };
  useEffect(() => {
    const init = function () {
      let wrap = document.createDocumentFragment();
      for (let i = 0; i < scene_data.length; i++) {
        const element = scene_data[i];
        for (let j = 0; j < element.length; j++) {
          const item = element[j];
          let div = createBlock();
          if (i == 0) {
            div.style.borderTop = "1px solid #ccc";
          }
          if (j === 0) {
            div.style.borderLeft = "1px solid #ccc";
          }
          div.style.height = BACKGROUND_BLOCK_SIZE + "px";
          div.style.width = BACKGROUND_BLOCK_SIZE + "px";
          domMap[i][j] = div;
          wrap.appendChild(div);
        }
      }
      bg.appendChild(wrap);
      bg.style.width = BACKGROUND_BLOCK_SIZE * COL_MAX + "px";
      currentBlock = createBlock("block");
      document.querySelector("#btn").onclick = function () {
        run();
      };
      document.querySelector("#start").onclick = function () {
        main();
      };
      document.querySelector("#over").onclick = function () {
        gameOver();
      };
      document.addEventListener("keydown", function (e) {
        if (e.keyCode === 13) {
          let matrix = rotateMatrix(currentBlock);
          let result = check("down", scene_data, matrix, [
            currentIndex[0],
            currentIndex[1],
          ]);
          if (result) {
            // 复原或者换位
          } else {
            currentBlock = matrix;
            let positon = check("rotateEdge", scene_data, matrix, currentIndex);
            if (positon) {
              currentIndex = positon;
            }
            draw(scene_data);
          }
        }
        if (e.keyCode === 37 || e.keyCode === 39) {
          let result = null;
          switch (e.keyCode) {
            case 37:
              result = check("axis_l", scene_data, currentBlock, [
                currentIndex[0] - 1,
                currentIndex[1],
              ]);
              if (!result) {
                currentIndex[0] -= 1;
                draw(scene_data);
              }
              break;
            case 39:
              result = check("axis_r", scene_data, currentBlock, [
                currentIndex[0] + 1,
                currentIndex[1],
              ]);
              if (!result) {
                currentIndex[0] += 1;
                draw(scene_data);
              }
              break;
            default:
              break;
          }
        }
      });
    };

    taskFlag = window.requestAnimationFrame((e) => {
      curTime = e;
      // console.log(curTime - prevTime)
      if (curTime - prevTime > fallInterval) {
        prevTime = e;
        if (!stopFlag) {
          run();
        }
      }
      main();
    });
  }, []);
  return (
    <div id="layout">
      <h1 id="score">分数：0</h1>
      <div className="#main"></div>
      <button className="btn">下落</button>
      <button className="start">开始</button>
      <button className="over">结束</button>
    </div>
  );
}
