'use strict';

const OutputStreamProvider = require('../OutputStreamProvider');
const OutputType = require('../OutputType');

class StreamOutputStreamProvider extends OutputStreamProvider {
    constructor() {
        super(OutputType.Stream);
    }

    getOutputStream(outputTarget) {
        return outputTarget;
    }
}

module.exports = StreamOutputStreamProvider;
