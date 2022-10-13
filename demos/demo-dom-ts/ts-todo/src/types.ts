export interface ITodo {
  // 内容
  content: string
  // 是否已完成
  finished: boolean
}

export class Todo implements ITodo {
  content: string
  finished: boolean
  // 当前对象对应的DOM
  el: HTMLElement

  // 重写JSON序列化
  toJSON() {
    return {
      content: this.content,
      finished: this.finished
    }
  }

  constructor(obj: ITodo) {
    this.content = obj.content
    this.finished = obj.finished
    this.el = null
  }
}