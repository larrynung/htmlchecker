'use strict';

const Rule = require('../Rule');

class MoreThanOneH1TagRule extends Rule {
    constructor(){
        super('MoreThanOneH1TagRule', 'h1', 'This HTML have more than one <h1> tag.', { passCondition : function(length){ return length <= 1; } });
     }
}

module.exports = MoreThanOneH1TagRule;
