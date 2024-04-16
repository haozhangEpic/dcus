/*
 * @Author: zhanghao
 * @Date: 2024-04-15 14:56:36
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-04-16 14:56:28
 * @Description:
 * @FilePath: \dcus\src\components\ClickButton\index.tsx
 */
import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import { debounce } from "@site/src/utils/lodash";
import useDeviceType from "@site/src/utils/hooks/useDeviceType";
interface Props {
  Svg: React.ComponentType<React.ComponentProps<"svg">> | string;
  onClick: () => void;
}
export default (Props: Props) => {
  const [className, setClassName] = useState(
    clsx(styles.svg, styles.actions, "")
  );
  const onClick = debounce(() => {
    Props.onClick();
  }, 200);
  const down = () => {
    setClassName(clsx(styles.svg, styles.actions, styles.active));
  };
  const mouseUp = () => {
    setClassName(clsx(styles.svg, styles.actions, ""));
  };
  return (
    <div className={className}>
      {useDeviceType() ? (
        <Props.Svg
          onTouchStart={down}
          onTouchEnd={mouseUp}
          onTouchEndCapture={onClick}
        ></Props.Svg>
      ) : (
        <Props.Svg
          onMouseDown={down}
          onMouseUp={mouseUp}
          onClick={onClick}
        ></Props.Svg>
      )}
    </div>
  );
};
