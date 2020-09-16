class Auth {
    constructor() {
        this.authenticated = false
    }

    login(cb) { // loading login state from localstorage, cookies or server
        this.authenticated = true;
        cb()
    }

    logout(cb) {
        this.authenticated = false;
        cb()
    }

    isAuthenticated() {
        if(localStorage.getItem('userId') && localStorage.getItem('token')) {
            return this.authenticated = true
        }
        return this.authenticated
    }
}

export default new Auth();