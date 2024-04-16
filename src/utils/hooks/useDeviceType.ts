/*
 * @Author: zhanghao
 * @Date: 2024-04-16 14:52:42
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-04-16 14:53:17
 * @Description:
 * @FilePath: \dcus\src\utils\hooks\useDeviceType.ts
 */
import { useState, useEffect } from "react";

function useDeviceType(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    );
  }, []);

  return isMobile;
}

export default useDeviceType;
