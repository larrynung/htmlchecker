'use strict';

const OutputHandler = require('../OutputHandler');
const OutputType = require('../OutputType');

class ConsoleOutputHandler extends OutputHandler {
    constructor(){ 
        super(OutputType.Console);    
    }

    output(outputTarget, data)
    {
        data.forEach(element => {
            console.log(element);
        }); 
    }
}

module.exports = ConsoleOutputHandler;
