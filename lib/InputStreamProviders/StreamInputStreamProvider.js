'use strict';

const InputStreamProvider = require('../InputStreamProvider');
const InputType = require('../InputType');

/**
 * InputStreamProvider for stream
 */
class StreamInputStreamProvider extends InputStreamProvider {
    /**
     * @constructor
     */
    constructor() {
        super(InputType.Stream);
    }

    /**
     * @param {Stream} inputSource
     * @return {Stream} input stream
     */
    getInputStream(inputSource) {
        return inputSource;
    }
}

module.exports = StreamInputStreamProvider;
