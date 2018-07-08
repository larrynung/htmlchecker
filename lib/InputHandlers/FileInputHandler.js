'use strict';

const fs = require('fs');
const InputHandler = require('../InputHandler');
const InputType = require('../InputType');

class FileInputHandler extends InputHandler {
    constructor(){ 
        super(InputType.File);    
    }

    input(inputSource)
    {
        return fs.readFileSync(inputSource, 'utf8');
    }
}

module.exports = FileInputHandler;
