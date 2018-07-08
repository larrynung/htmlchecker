'use strict';

const fs = require('fs');
const path = require('path');
const StreamOutputHandler = require('./StreamOutputHandler');
const OutputType = require('../OutputType');

class FileOutputHandler extends StreamOutputHandler {
    constructor(){ 
        super();    
        this.outputType = OutputType.File;
    }

    output(outputTarget, data)
    {
        var folderPath = path.dirname(outputTarget);
        if (!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }
        var stream = fs.createWriteStream(outputTarget);
        super.output(stream, data);
    }
}

module.exports = FileOutputHandler;
