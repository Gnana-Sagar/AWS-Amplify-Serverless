var UserModel = {
    roles: [],
    userName: '',
    email: '',
    get getEmail() {
        return this.email
    },
    /**
     * @param {any} rol
     */
    set setEmail(e) {
        this.email = e;
    },
    get getRoles() {
        return this.roles;
    },
    get getUserName() {
        return this.userName;
    },
    /**
     * @param {any} rol
     */
    set setRoles(rol) {
        this.roles = rol;
    },
    /**
     * @param {any} name
     */
    set setUserName(name) {
        this.userName = name;
    }
}