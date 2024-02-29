/*
 * @Author: zhanghao
 * @Date: 2024-02-22 15:34:34
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-26 13:45:12
 * @Description:
 * @FilePath: \dcus\src\pages\webApi\playSweep.js
 */
var audioCtx = new AudioContext();
// function playSweep(time) {
//   const osc = new OscillatorNode(audioCtx, {
//     frequency: 380,
//     type: "square",
//   });
//   osc.connect(audioCtx.destination);
//   osc.start(time);
//   osc.stop(time + 1);
// }
const sweepLength = 2;
function playSweep(time) {
  const osc = new OscillatorNode(audioCtx, {
    frequency: 380,
    type: "sine",
  });

  const sweepEnv = new GainNode(audioCtx);
  sweepEnv.gain.cancelScheduledValues(audioCtx.currentTime);
  sweepEnv.gain.setValueAtTime(0, audioCtx.currentTime);
  sweepEnv.gain.linearRampToValueAtTime(1, audioCtx.currentTime + attackTime);
  sweepEnv.gain.linearRampToValueAtTime(
    0,
    audioCtx.currentTime + sweepLength - releaseTime
  );
  console.log(audioCtx.currentTime);
  osc.connect(sweepEnv).connect(audioCtx.destination);
  // osc.start(audioCtx.currentTime);
  // osc.stop(time + sweepLength);
  console.log("time==============>", audioCtx.currentTime);
  osc.start();
  osc.stop(audioCtx.currentTime + 3);
}
let attackTime = 0.2;
const attackControl = document.querySelector("#attack");
attackControl.addEventListener(
  "input",
  (ev) => {
    attackTime = parseInt(ev.target.value, 10);
  },
  false
);

let releaseTime = 0.5;
const releaseControl = document.querySelector("#release");
releaseControl.addEventListener(
  "input",
  (ev) => {
    releaseTime = parseInt(ev.target.value, 10);
  },
  false
);
document.querySelector("#playSweep").addEventListener("click", function () {
  playSweep(0);
});
