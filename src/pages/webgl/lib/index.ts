type params = {
    gl: WebGLRenderingContext;
    VERTEX_SHADER_SOURCE: string;
    FRAGMENT_SHADER_SOURCE: string
}

export function initShader({ gl, VERTEX_SHADER_SOURCE, FRAGMENT_SHADER_SOURCE }: params): WebGLProgram {
    // 创建着色器
    const vertexShader: WebGLShader = gl.createShader(gl.VERTEX_SHADER)
    const fragmentShader: WebGLShader = gl.createShader(gl.FRAGMENT_SHADER)

    gl.shaderSource(vertexShader, VERTEX_SHADER_SOURCE)//指定顶点着色器的源码
    gl.shaderSource(fragmentShader, FRAGMENT_SHADER_SOURCE)//指定片元着色器的源码

    // 编译着色器
    gl.compileShader(vertexShader)
    gl.compileShader(fragmentShader)

    // 创建一个程序对象
    const program: WebGLProgram = gl.createProgram();

    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)

    gl.linkProgram(program)

    gl.useProgram(program)
    return program
}