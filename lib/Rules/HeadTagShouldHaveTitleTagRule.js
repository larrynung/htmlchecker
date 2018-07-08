'use strict';

const Rule = require('../Rule');

class HeadTagShouldHaveTitleTagRule extends Rule {
    constructor(){
        super('HeadTagShouldHaveTitleTagRule', 'head:not(:has(title))', 'This HTML without <title> tag.');
     }
}

module.exports = HeadTagShouldHaveTitleTagRule;
