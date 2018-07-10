'use strict';

const Rule = require('../Rule');

/**
 * Rule for check <head> tag is not have <title> tag
 */
class HeadTagShouldHaveTitleTagRule extends Rule {
    /**
     * @constructor
     */
    constructor() {
        super('HeadTagShouldHaveTitleTagRule',
            'head:not(:has(title))',
            'This HTML without <title> tag.');
    }
}

module.exports = HeadTagShouldHaveTitleTagRule;
