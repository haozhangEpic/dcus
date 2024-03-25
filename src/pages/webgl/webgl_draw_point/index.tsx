import React, { useEffect } from 'react';
import { initShader } from '../lib/index'
import styles from './index.module.css';

export default function Index(): JSX.Element {
    useEffect(() => {
        const ctx: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
        const gl: WebGLRenderingContext = ctx.getContext('webgl')
        // 着色器
        // 创建着色器源码
        const VERTEX_SHADER_SOURCE = `
        void main() {
            //要绘制的点坐标
            gl_Position = vec4(0.0,0.0,0.0,1.0);
            //点的大小
            gl_PointSize = 30.0;
        }
        `//顶点着色器源码
        const FRAGMENT_SHADER_SOURCE = `
        void main() {
            gl_FragColor = vec4(0.0,0.0,0.0,0.1);
        }
        `//片元着色器
        initShader({ gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE })
        // // 执行绘制

        // // 要绘制的图形是什么、从哪个开始，使用几个顶点
        gl.drawArrays(gl.POINTS, 0, 1)
        gl.drawArrays(gl.LINES, 1, 2) //最少要有两个点
        gl.drawArrays(gl.TRIANGLES, 0, 3)
    }, [])
    return (
        <div>
            <canvas id='canvas' width="200" height="200">
                您的浏览器不支持canvas
            </canvas>
        </div>
    );
}
