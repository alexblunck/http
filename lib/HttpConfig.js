class HttpConfig {

    constructor() {
        this.jwtTokenGetter = null
    }

    /**
     * Set JWT token getter function.
     *
     * @param {Function} fn - Expected to return jwt token as string
     */
    setJwtTokenGetter(fn) {
        this.jwtTokenGetter = fn
    }

}

module.exports = new HttpConfig()
