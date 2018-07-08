'use strict';

const Rule = require('../Rule');

class MoreThanNStrongTagRule extends Rule {
    constructor(){
        super('MoreThanNStrongTagRule', 'strong', function(length) { return 'This HTML have more than ' + this.params.maxStrongTagCount + ' <strong> tag.'; }, { passCondition : function(length){ return length <= this.params.maxStrongTagCount; }, params : { maxStrongTagCount: 1 } } );
     }
}

module.exports = MoreThanNStrongTagRule;
