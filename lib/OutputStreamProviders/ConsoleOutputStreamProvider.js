'use strict';

const OutputStreamProvider = require('../OutputStreamProvider');
const OutputType = require('../OutputType');

class ConsoleOutputStreamProvider extends OutputStreamProvider {
    constructor() {
        super(OutputType.Console);
    }

    getOutputStream(outputTarget) {
        return process.stdout;
    }
}

module.exports = ConsoleOutputStreamProvider;
