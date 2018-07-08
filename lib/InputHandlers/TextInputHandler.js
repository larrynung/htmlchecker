'use strict';

const InputHandler = require('../InputHandler');
const InputType = require('../InputType');

class TextInputHandler extends InputHandler {
    constructor(){ 
        super(InputType.Text);    
    }

    input(inputSource)
    {
        return inputSource;
    }
}

module.exports = TextInputHandler;
