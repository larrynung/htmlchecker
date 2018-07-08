'use strict';

const Rule = require('../Rule');

class HeadTagShouldHaveMetaTagRule extends Rule {
    constructor(name, nameAttributeValue, message){
        name = (typeof name !== 'undefined') ? name : 'HeadTagShouldHaveMetaTagRule';
        var selector = 'head:not(:has(meta))';
        selector = (typeof nameAttributeValue !== 'undefined') ?  selector.replace('meta', 'meta[name="' + nameAttributeValue + '"]') : selector;  
        message = (typeof message !== 'undefined') ? message: 'This HTML without <meta> tag.';
        super(name, selector, message);
     }
}

module.exports = HeadTagShouldHaveMetaTagRule;
