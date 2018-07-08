'use strict';

const Rule = require('../Rule');

class ImgTagShouldHaveAltAttributeRule extends Rule {
    constructor(){
        super('ImgTagShouldHaveAltAttributeRule', 'img:not([alt])', function(length) { return 'There are ' + length + ' <img> tag without alt attribute.'; });
     }
}

module.exports = ImgTagShouldHaveAltAttributeRule;
