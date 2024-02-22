import { makeAutoObservable } from "mobx";

class User {
    userName = ''
    userPassword = ''
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }

    login (name: string, password: string) {
        this.userName = name
        this.userPassword = password
        this.isAuth = true
    }

    logout () {
        this.isAuth = false
    }
}

export default new User()
