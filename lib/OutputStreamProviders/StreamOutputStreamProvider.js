'use strict';

const OutputStreamProvider = require('../OutputStreamProvider');
const OutputType = require('../OutputType');

/**
 * OutputStreamProvider for stream
 */
class StreamOutputStreamProvider
    extends OutputStreamProvider {
    /**
     * @constructor
     */
    constructor() {
        super(OutputType.Stream);
    }

    /**
     * @param {Stream} outputTarget
     * @return {Stream} output stream
     */
    getOutputStream(outputTarget) {
        return outputTarget;
    }
}

module.exports = StreamOutputStreamProvider;
