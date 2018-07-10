'use strict';

/**
 * The class that provide output stream
 */
class OutputStreamProvider {
    /**
     * @constructor
     * @param {*} outputType
     */
    constructor(outputType) {
        this.outputType = outputType;
    }

    /**
     * Get output stream
     * @param {*} outputTarget
     */
    getOutputStream(outputTarget) {
    }
}

module.exports = OutputStreamProvider;
