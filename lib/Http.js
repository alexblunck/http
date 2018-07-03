const each = require('lodash/each')
const axios = require('axios')
const HttpConfig = require('./HttpConfig')

/**
 * Default request config.
 *
 * @type {Object}
 */
const defaultConfig = {
    headers: {
        'Accept': 'application/json'
    }
}

class Http {

    /**
     * Return request config.
     *
     * @param  {Object} [extend] - Extend default axios config
     *
     * @return {Object}
     */
    static getConfig(extend) {
        const config = Object.assign({}, defaultConfig, extend)

        // Add "Authorization" header
        if (HttpConfig.jwtTokenGetter) {
            const token = HttpConfig.jwtTokenGetter()

            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
        }

        return config
    }

    /**
     * Make GET request.
     *
     * @param  {String} url
     * @param  {Object} [config]
     *
     * @return {Promise}
     */
    static get(url, config) {
        const promise = this._wrapPromise(
            axios.get(this._buildUrl(url), this.getConfig(config))
        )

        return promise
            .then(res => {
                return res
            })
            .catch(this._handleError)
    }

    /**
     * Make POST request.
     *
     * @param  {String}  url
     * @param  {Object}  data
     * @param  {Object}  [config]
     *
     * @return {Promise}
     */
    static post(url, data, config) {
        const promise = this._wrapPromise(
            axios.post(this._buildUrl(url), data, this.getConfig(config))
        )

        return promise
            .then(res => {
                return res
            })
            .catch(this._handleError)
    }

    /**
     * Make PUT request.
     *
     * @param  {String}  url
     * @param  {Object}  data
     * @param  {Object}  [config]
     *
     * @return {Promise}
     */
    static put(url, data, config) {
        const promise = this._wrapPromise(
            axios.put(this._buildUrl(url), data, this.getConfig(config))
        )

        return promise
            .then(res => {
                return res
            })
            .catch(this._handleError)
    }

    /**
     * Make DELETE request.
     *
     * @param  {String}  url
     * @param  {Object}  [config]
     *
     * @return {Promise}
     */
    static delete(url, config) {
        const promise = this._wrapPromise(
            axios.delete(this._buildUrl(url), this.getConfig(config))
        )

        return promise
            .then(res => {
                return res
            })
            .catch(this._handleError)
    }

    /**
     * Build full url by prepending base url
     * if set.
     *
     * @param  {String} url
     *
     * @return {String}
     */
    static _buildUrl(url) {
        if (HttpConfig.baseUrl) {
            return `${HttpConfig.baseUrl}/${url}`
        }

        return url
    }

    /**
     * Wrap promise if required, i.e. to integrate
     * with frameworks like angular.
     *
     * @param  {Promise} promise
     *
     * @return {Promise}
     */
    static _wrapPromise(promise) {
        if (HttpConfig.$q) {
            return HttpConfig.$q.when(promise)
        }

        return promise
    }

    /**
     * Handle request error.
     *
     * @param {Object} res
     */
    static _handleError(res) {
        HttpConfig.errorHandlers.forEach(handler => handler(res.response))
        throw res.response
    }

}

module.exports = Http
