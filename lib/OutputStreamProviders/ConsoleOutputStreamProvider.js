'use strict';

const OutputStreamProvider = require('../OutputStreamProvider');
const OutputType = require('../OutputType');

/**
 * OutputStreamProvider for console
 */
class ConsoleOutputStreamProvider extends OutputStreamProvider {
    /**
     * @constructor
     */
    constructor() {
        super(OutputType.Console);
    }

    /**
     * @param {*} outputTarget
     * @return {Stream} output stream
     */
    getOutputStream(outputTarget) {
        return process.stdout;
    }
}

module.exports = ConsoleOutputStreamProvider;
