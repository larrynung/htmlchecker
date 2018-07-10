'use strict';

const Readable = require('stream').Readable;
const InputStreamProvider = require('../InputStreamProvider');
const InputType = require('../InputType');

/**
 * InputStreamProvider for text
 */
class TextInputStreamProvider extends InputStreamProvider {
    /**
     * @constructor
     */
    constructor() {
        super(InputType.Text);
    }

    /**
     * @param {string} inputSource
     * @return {Stream} input stream
     */
    getInputStream(inputSource) {
        return new Readable({
            read(size) {
                this.push(inputSource);
                this.push(null);
            },
        });
    }
}

module.exports = TextInputStreamProvider;
