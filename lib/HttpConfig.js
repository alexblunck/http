class HttpConfig {

    constructor() {
        this.baseUrl = null
        this.jwtTokenGetter = null
        this.$q = null
        this.errorHandlers = []
    }

    /**
     * Set base url that is prepended to an url when
     * makign a request.
     *
     * @param {String} url
     */
    setBaseUrl(url) {
        this.baseUrl = url
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
     * Set AngularJs $q service to use to wrap all
     * promises. Allows Http to integrate witzh angular's
     * digest cycle.
     *
     * @param {Object} $q
     */
    setAngularJsPromiseObject($q) {
        this.$q = $q
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
