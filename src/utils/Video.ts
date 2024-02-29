/*
 * @Author: zhanghao
 * @Date: 2023-09-01 14:47:27
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-20 17:20:59
 * @Description:
 * @FilePath: \dcus\src\utils\Video.ts
 */
export interface Video {
  el?: HTMLVideoElement | null;
}

export class Video {
  constructor(options?: Video) {
    let { el = null } = options || {};
    this.el = el;
  }
  setEl(el: HTMLVideoElement) {
    this.el = el;
    this.el.muted = true;
  }
  play() {
    console.log("播放", this.el.volume);
    this.el.play();
    this.el.muted = false;
  }
  pause() {
    this.el.pause();
  }
  resume() {
    console.log("复播");
  }
  FF() {
    let currentTime = this.el.currentTime;
    this.el.currentTime += 10;
  }
  REW() {
    let currentTime = this.el.currentTime;
    this.el.currentTime -= 10;
  }
  playbackRate(rate: number) {
    this.el.playbackRate = rate;
  }
}
