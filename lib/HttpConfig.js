class HttpConfig {

    constructor() {
        this.errorHandlers = []
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

    /**
     * Add an error handler; A function that is called
     * on a response error.
     *
     * @param {Function} fn
     */
    addErrorHandler(fn) {
        this.errorHandlers.push(fn)
    }

}

module.exports = new HttpConfig()
