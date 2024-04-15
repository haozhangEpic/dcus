import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import clsx from "clsx";
import { debounce } from "@site/src/utils/lodash";
interface Props {
  Svg: React.ComponentType<React.ComponentProps<"svg">> | string;
  onClick: () => void;
}
export default (Props: Props) => {
  const flag = useRef(null);
  const [className, setClassName] = useState(
    clsx(styles.svg, styles.actions, flag.current ? styles.active : "")
  );
  const onClick = debounce(() => {
    Props.onClick();
  }, 200);
  const down = () => {
    console.log("down");
    flag.current = true;
    setClassName(clsx(styles.svg, styles.actions, styles.active));
  };
  const mouseUp = () => {
    console.log("mouseUp");
    setClassName(clsx(styles.svg, styles.actions, ""));
  };
  return (
    <div className={className}>
      <Props.Svg
        onMouseDown={down}
        onMouseUp={mouseUp}
        onClick={onClick}
      ></Props.Svg>
    </div>
  );
};
