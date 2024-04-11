import React, { useEffect } from 'react';
import { initShader } from '../../../utils/WebGL/lib/index'
import styles from '../index.module.css';

//webgl 添加鼠标事件
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
        // // 要绘制的图形是什么、从哪个开始，使用几个顶点
        gl.drawArrays(gl.POINTS, 0, 1)

        // 添加事件
        ctx.onclick = function (e) {
            // 坐标
            console.log(e)
        }
    }, [])
    return (
        <div>
            <canvas className={styles.canvasbg} id='canvas' width="200" height="200">
                您的浏览器不支持canvas
            </canvas>
        </div>
    );
}
var _cp_json = [
  {
    publishTime: null,
    cpFlag: "YOUKU",
    cpUrl: "",
    cpId: 4,
    cpName: "YOUKU",
    cpIcon: "202403/ContentProvider_527742_20150608724.png",
    cpSourceId: "4",
    id: 81,
    createDate: null,
    lastUpdateTime: null,
    status: 1,
  },
  {
    publishTime: null,
    cpFlag: "FJSTFZ",
    cpUrl: "",
    cpId: 1,
    cpName: "FJSTFZ",
    cpIcon: "",
    cpSourceId: "1",
    id: 21,
    createDate: null,
    lastUpdateTime: null,
    status: 1,
  },
  {
    publishTime: null,
    cpFlag: "CCTV",
    cpUrl: "",
    cpId: 2,
    cpName: "CCTV",
    cpIcon: "",
    cpSourceId: "2",
    id: 41,
    createDate: null,
    lastUpdateTime: null,
    status: 1,
  },
  {
    publishTime: null,
    cpFlag: "IQIYI",
    cpUrl: "",
    cpId: 3,
    cpName: "IQIYI",
    cpIcon: "",
    cpSourceId: "3",
    id: 61,
    createDate: null,
    lastUpdateTime: null,
    status: 1,
  },
  {
    publishTime: null,
    cpFlag: "bestv",
    cpUrl: "",
    cpId: 0,
    cpName: "百视通",
    cpIcon: "",
    cpSourceId: "0",
    id: 1,
    createDate: null,
    lastUpdateTime: null,
    status: 1,
  },
];
