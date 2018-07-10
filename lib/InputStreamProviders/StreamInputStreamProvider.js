'use strict';

const fs = require('fs');
const InputStreamProvider = require('../InputStreamProvider');
const InputType = require('../InputType');

class StreamInputStreamProvider extends InputStreamProvider {
    constructor(){ 
        super(InputType.Stream);    
    }

    getInputStream(inputSource)
    {
        return inputSource;
    }
}

module.exports = StreamInputStreamProvider;
