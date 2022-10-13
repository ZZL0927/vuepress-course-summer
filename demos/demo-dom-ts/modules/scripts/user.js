// 该模块只导出一个默认成员
export default class User {
  constructor() {
    this.name = ''
  }

  setName(name) {
    if (name.length >= 2) this.name = name
  }
}