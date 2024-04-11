import React, { useEffect } from 'react';
import { initShader } from '../../../utils/WebGL/lib/index'
import styles from '../index.module.css';

//webgl 学习使用变量
export default function Index(): JSX.Element {
    useEffect(() => {
        const ctx: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
        const gl: WebGLRenderingContext = ctx.getContext('webgl')
        // 着色器
        // 创建着色器源码
        const VERTEX_SHADER_SOURCE = `
        //只传递顶点数据
        attribute vec4 aPosition;
        void main() {
            //要绘制的点坐标
            gl_Position = aPosition;
            //点的大小
            gl_PointSize = 30.0;
        }
        `//顶点着色器源码
        const FRAGMENT_SHADER_SOURCE = `
        void main() {
            gl_FragColor = vec4(0.0,0.0,0.0,0.1);
        }
        `//片元着色器
        const program: WebGLProgram = initShader({ gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE })

        const aPosition = gl.getAttribLocation(program, 'aPosition')

        // gl.vertexAttrib4f(aPosition,0.5,0.5,0.0,1.0)
        // gl.vertexAttrib3f(aPosition, 0.5, 0.5, 0.0)
        // gl.vertexAttrib2f(aPosition, 0.5, 0.5)
        gl.vertexAttrib1f(aPosition, 0.5)
        let x = 0;
        setInterval(() => {
            x += 0.01;
            if (x > 1.0) {
                x = 0
            }
            gl.vertexAttrib1f(aPosition, x)
            gl.drawArrays(gl.POINTS, 0, 1)
        }, 10)
        // // 要绘制的图形是什么、从哪个开始，使用几个顶点
    }, [])
    return (
        <div>
            <canvas className={styles.canvasbg} id='canvas' width="200" height="200">
                您的浏览器不支持canvas
            </canvas>
        </div>
    );
}
