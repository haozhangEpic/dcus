/*
 * @Author: zhanghao
 * @Date: 2024-04-12 16:47:53
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-04-16 17:26:33
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
import gameStart_btn from "@site/static/game/Tetris/gameStart_btn.svg";
import fallDown_btn from "@site/static/game/Tetris/fallDown_btn.svg";
import reset_btn from "@site/static/game/Tetris/reset_btn.svg";

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
  const fallDown = () => {
    game.current.fallDown();
  };
  const reset = () => {
    game.current.reset();
  };
  return (
    <div className={styles.container}>
      <canvas id="game"></canvas>
      <div className={styles.actions}>
        <div className={styles.btnWrap}>
          <ClickButton onClick={start} Svg={gameStart_btn}></ClickButton>
          <ClickButton onClick={reset} Svg={reset_btn}></ClickButton>
        </div>
        <div className={styles.btnWrap}>
          <ClickButton onClick={left} Svg={Left_Btn} />
          <ClickButton onClick={rotate} Svg={Rotate_Btn} />
          <ClickButton onClick={fallDown} Svg={fallDown_btn} />
          <ClickButton onClick={right} Svg={Right_Btn} />
        </div>
      </div>
    </div>
  );
};
