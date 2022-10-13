import { makeAutoObservable } from 'mobx'

class Store {
  username: string = 'name'

  setUsername(name: string) {
    this.username = name
  }

  constructor() {
    makeAutoObservable(this)
  }
}

export default new Store()