'use strict';

const Readable = require('stream').Readable;
const InputStreamProvider = require('../InputStreamProvider');
const InputType = require('../InputType');

class TextInputStreamProvider extends InputStreamProvider {
    constructor(){ 
        super(InputType.Text);    
    }

    getInputStream(inputSource)
    {
        return new Readable({
            read(size) {
                this.push(inputSource);
                this.push(null);
            }
        });
    }
}

module.exports = TextInputStreamProvider;
