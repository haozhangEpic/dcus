/*
 * @Author: zhanghao
 * @Date: 2024-04-12 16:47:53
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-04-15 16:30:47
 * @Description: 
 * @FilePath: \dcus\src\pages\game\Tetris\index.tsx
 */
import React, { useEffect, useRef } from "react";
import Tetris from "@site/src/utils/game/Tetris/index";
import ClickButton from "@site/src/components/ClickButton";
import styles from "./index.module.css";
import Left_Btn from "@site/static/game/Tetris/left_btn.svg";
import Right_Btn from "@site/static/game/Tetris/right_btn.svg";
import Rotate_Btn from "@site/static/game/Tetris/rotate_btn.svg";

export default () => {
  const game = useRef(null);

  useEffect(() => {
    game.current = new Tetris({ container: document.querySelector("#game") });
    game.current.init();
  }, []);
  const start = () => {
    game.current.gameStart();
  };
  const left = () => {
    game.current.left();
  };
  const right = () => {
    game.current.right();
  };
  const rotate = () => {
    game.current.rotate();
  };
  return (
    <div className={styles.container}>
      <canvas id="game"></canvas>
      <div className={styles.actions}>
        <div onClick={start}>开始</div>
        <ClickButton onClick={left} Svg={Left_Btn} />
        <ClickButton onClick={rotate} Svg={Rotate_Btn} />
        <ClickButton onClick={right} Svg={Right_Btn} />
      </div>
    </div>
  );
};
