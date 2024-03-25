import React, { useEffect } from 'react';
import styles from './index.module.css';

export default function Index(): JSX.Element {
    useEffect(() => {
        const ctx: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
        const gl: WebGLRenderingContext = ctx.getContext('webgl')
        gl.clearColor(1.0, 0.0, 0.0, 1.0)
        // gl.clear(gl.COLOR_BUFFER_BIT)
    }, [])
    return (
        <div>
            <canvas id='canvas' width="200" height="200">
                您的浏览器不支持canvas
            </canvas>
        </div>
    );
}
