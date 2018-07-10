'use strict';

const fs = require('fs');
const InputStreamProvider = require('../InputStreamProvider');
const InputType = require('../InputType');

class FileInputStreamProvider extends InputStreamProvider {
    constructor(){ 
        super(InputType.File);    
    }

    getInputStream(inputSource)
    {
        return fs.createReadStream(inputSource);
    }
}

module.exports = FileInputStreamProvider;
