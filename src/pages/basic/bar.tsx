import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.scss'
import { Video } from './utils/Video'

let videoManager = new Video()
export default function MyReactPage() {
  useEffect(() => {
    let video = document.querySelector('video')
    console.info('video=========================>', video)
    videoManager.setEl(video)
    videoManager.play()
  }, [])
  const handleAction = (action: string, payload?: any) => {
    switch (action) {
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
        videoManager.playbackRate((payload.value))
        break;
      default:
        break;
    }
  }
  return (
    <Layout>
      <h1>看电视了嗷</h1>
      <p>家人们，谁懂啊，看电视啦</p>
      <div className={styles.playVideoWrap}>
        <video>
          <source type="video/mp4" src='http://qcast-image.oss-cn-qingdao.aliyuncs.com/homepage/20190726/4cc4e6a8fd7d9d9c707ed4c4da27ca9d.mp4'></source>
        </video>
        <div className={styles.controls}>
          <button onClick={() => handleAction('REW')}>快退</button>
          <button onClick={() => handleAction('pause')}>暂停</button>
          <button onClick={() => handleAction('FF')}>快进</button>
          <button onClick={() => handleAction('playbackRate', { value: 1 })}>还原</button>
          <button onClick={() => handleAction('playbackRate', { value: 1.5 })}>1.5</button>
          <button onClick={() => handleAction('playbackRate', { value: 2 })}>2</button>
          <button onClick={() => handleAction('playbackRate', { value: 2.5 })}>2.5</button>
        </div>
      </div>
    </Layout>
  );
}