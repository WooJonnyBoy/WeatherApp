import { makeAutoObservable } from "mobx";

class User {
    userName = ''
    isAuth = false

    constructor() {
        makeAutoObservable(this)
    }
}

export default new User()
