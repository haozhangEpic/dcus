/*
 * @Author: zhanghao
 * @Date: 2024-02-22 15:51:49
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-26 13:44:05
 * @Description: 
 * @FilePath: \dcus\src\pages\webApi\playPulse.js
 */
let pulseHz = 880;
let lfoHz = 30;
const pulseTime = 1;
function playPulse(time) {
  const osc = new OscillatorNode(audioCtx, {
    type: "sine",
    frequency: pulseHz,
  });

  const amp = new GainNode(audioCtx, {
    value: 1,
  });

  const lfo = new OscillatorNode(audioCtx, {
    type: "square",
    frequency: lfoHz,
  });
  lfo.connect(amp.gain);
  osc.connect(amp).connect(audioCtx.destination);
  lfo.start();
  osc.start();
  osc.stop(audioCtx.currentTime + pulseTime);
}
const hzControl = document.querySelector("#hz");
hzControl.addEventListener(
  "input",
  (ev) => {
    pulseHz = parseInt(ev.target.value, 10);
  },
  false
);

const lfoControl = document.querySelector("#lfo");
lfoControl.addEventListener(
  "input",
  (ev) => {
    lfoHz = parseInt(ev.target.value, 10);
  },
  false
);
document.querySelector("#playPulse").addEventListener("click", function () {
  playPulse(0);
});
