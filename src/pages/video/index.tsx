/*
 * @Author: zhanghao
 * @Date: 2023-07-21 18:18:12
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-21 14:40:11
 * @Description: 
 * @FilePath: \dcus\src\pages\video\index.tsx
 */
import React, { useEffect, useRef } from 'react';
// import Layout from '@theme/Layout';
import styles from './index.module.scss'
import { Video } from '../../utils/Video'
import VideoView from '../../components/video/VideoView';

let videoManager = new Video()
export default function MyReactPage() {
  let video = useRef(null)
 
  const handleAction = (action: string, payload?: any) => {
    switch (action) {
      case 'play':
        videoManager.play()
        // video.current.play()
        break;
      case 'pause':
        videoManager.pause()
        break;
      case 'FF':
        videoManager.FF()
        break;
      case 'REW':
        videoManager.REW()
        break;
      case 'playbackRate':
        videoManager.playbackRate(payload.value)
        break;
      default:
        break;
    }
  }
  return (
    // <Layout>
    <VideoView />
    // </Layout >
  );
}