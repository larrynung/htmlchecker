'use strict';

const OutputHandler = require('../OutputHandler');
const OutputType = require('../OutputType');

class StreamOutputHandler extends OutputHandler {
    constructor(){ 
        super(OutputType.Stream);    
    }

    output(outputTarget, data)
    {
        data.forEach(element => {
            outputTarget.write(element);
        }); 
        outputTarget.end();
    }
}

module.exports = StreamOutputHandler;
