'use strict';

const Rule = require('../Rule');

class ATagShuldHaveRelAttributeRule extends Rule {
    constructor(){
        super('ATagShuldHaveRelAttributeRule', 'a:not([rel])', function(length) { return 'There are ' + length + ' <a> tag without rel attribute.'; });
     }
}

module.exports = ATagShuldHaveRelAttributeRule;
