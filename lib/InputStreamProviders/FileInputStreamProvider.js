'use strict';

const fs = require('fs');
const InputStreamProvider = require('../InputStreamProvider');
const InputType = require('../InputType');

/**
 * InputStreamProvider for file
 */
class FileInputStreamProvider extends InputStreamProvider {
    /**
     * @constructor
     */
    constructor() {
        super(InputType.File);
    }

    /**
     * @param {string} inputSource
     * @return {Stream} input stream
     */
    getInputStream(inputSource) {
        return fs.createReadStream(inputSource);
    }
}

module.exports = FileInputStreamProvider;
