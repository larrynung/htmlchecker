'use strict';

const fs = require('fs');
const path = require('path');
const OutputStreamProvider = require('../OutputStreamProvider');
const OutputType = require('../OutputType');

class FileOutputStreamProvider extends OutputStreamProvider {
    constructor() {
        super();
        this.outputType = OutputType.File;
    }

    getOutputStream(outputTarget) {
        let folderPath = path.dirname(outputTarget);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        return fs.createWriteStream(outputTarget);
    }
}

module.exports = FileOutputStreamProvider;
