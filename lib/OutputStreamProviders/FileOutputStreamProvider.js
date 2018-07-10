'use strict';

const fs = require('fs');
const path = require('path');
const OutputStreamProvider = require('../OutputStreamProvider');
const OutputType = require('../OutputType');

/**
 * OutputStreamProvider for file
 */
class FileOutputStreamProvider extends OutputStreamProvider {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.outputType = OutputType.File;
    }

    /**
     * @param {string} outputTarget
     * @return {Stream} output stream
     */
    getOutputStream(outputTarget) {
        let folderPath = path.dirname(outputTarget);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        return fs.createWriteStream(outputTarget);
    }
}

module.exports = FileOutputStreamProvider;
