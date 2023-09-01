export interface Video {
    el?: HTMLVideoElement | null
}

export class Video {
    constructor(options?: Video) {
        let { el = null } = options || {}
        this.el = el
    }
    setEl(el: HTMLVideoElement) {
        this.el = el
    }
    play() {
        this.el.play()
    }
    pause() {
        this.el.pause()
    }
    FF() {
        let currentTime = this.el.currentTime
        this.el.currentTime += 10
    }
    REW() {
        let currentTime = this.el.currentTime
        this.el.currentTime -= 10
    }
    playbackRate(rate: number) {
        this.el.playbackRate = rate
    }
}