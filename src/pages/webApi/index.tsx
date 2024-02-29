/*
 * @Author: zhanghao
 * @Date: 2024-02-21 17:14:27
 * @LastEditors: zhanghao
 * @LastEditTime: 2024-02-29 11:26:02
 * @Description: 
 * @FilePath: \dcus\src\pages\webApi\index.tsx
 */
import React, { useEffect } from "react";
// import mp3 from './t-rex-roar.mp3'
// import WaveTable from "./wavetable";

let audioCtx = null;
const sweepLength = 2;
let attackTime = 0.2;

let releaseTime = 0.5;
let pulseHz = 880;
let lfoHz = 30;
const pulseTime = 1;
export default (): JSX.Element => {
    const playSweep = function (time: number) {
        const osc = new OscillatorNode(audioCtx, {
            frequency: 380,
            type: 'triangle'
        })
        // const sweepEnv = new GainNode(audioCtx);
        // sweepEnv.gain.cancelScheduledValues(time);
        // sweepEnv.gain.setValueAtTime(0, time);
        // sweepEnv.gain.linearRampToValueAtTime(1, time + attackTime);
        // sweepEnv.gain.linearRampToValueAtTime(0, time + sweepLength - releaseTime);

        osc.connect(audioCtx.destination);
        // osc.connect(sweepEnv).connect(audioCtx.destination);
        osc.start(time);
        osc.stop(time + sweepLength);
    }
    const playPulse = function (time: number) {
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
        osc.start(time);
        osc.stop(time + pulseTime);
    }
    useEffect(() => {

        audioCtx = new window.AudioContext();

        const attackControl = document.querySelector("#attack");
        attackControl.addEventListener(
            "input",
            (ev) => {
                attackTime = parseInt(ev.target.value, 10);
            },
            false,
        );


        const releaseControl = document.querySelector("#release");
        releaseControl.addEventListener(
            "input",
            (ev) => {
                releaseTime = parseInt(ev.target.value, 10);
            },
            false,
        );

        const hzControl = document.querySelector("#hz");
        hzControl.addEventListener(
            "input",
            (ev) => {
                pulseHz = parseInt(ev.target.value, 10);
            },
            false,
        );


        const lfoControl = document.querySelector("#lfo");
        lfoControl.addEventListener(
            "input",
            (ev) => {
                lfoHz = parseInt(ev.target.value, 10);
            },
            false,
        );

    }, [])
    return <div>
        <label for="attack">Attack</label>
        <input
            name="attack"
            id="attack"
            type="range"
            min="0"
            max="1"
            defaultValue="0.2"
            step="0.1" />

        <label for="release">Release</label>
        <input
            name="release"
            id="release"
            type="range"
            min="0"
            max="1"
            defaultValue="0.5"
            step="0.1" />
        <button onClick={() => playSweep(3)}>playSweep</button>
        <label for="hz">Hz</label>
        <input
            name="hz"
            id="hz"
            type="range"
            min="660"
            max="1320"
            defaultValue="880"
            step="1" />
        <label for="lfo">LFO</label>
        <input name="lfo" id="lfo" type="range" min="20" max="40" defaultValue="30" step="1" />
    </div>
}