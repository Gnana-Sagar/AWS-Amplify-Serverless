var UserModel = {
    name: '',
    logginedBy: '',
    email: '',
    isEmailVerified: false,
    isUserLogined: false,
    get getIsUserLogined() {
        return this.isUserLogined;
    },
    /**
     * @param {{ name: string; email: string; email_verified: boolean; }} data
     */
    set setName(name) {
        this.name = name;
    },
    set setEmail(email) {
        this.email = email;
    },
    set setUserLogined(isUserLoggined) {
        this.isUserLogined = isUserLoggined;
    }
}