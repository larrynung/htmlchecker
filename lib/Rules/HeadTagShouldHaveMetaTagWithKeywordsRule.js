'use strict';

const HeadTagShouldHaveMetaTagRule = require('./HeadTagShouldHaveMetaTagRule');

/**
 * Rule for check <head> tag is not have keywords <meta> tag
 */
class HeadTagShouldHaveMetaTagWithKeywordsRule
    extends HeadTagShouldHaveMetaTagRule {
    /**
     * @constructor
     */
    constructor() {
        super('HeadTagShouldHaveMetaTagWithKeywordsRule',
            'keywords',
            'This HTML without <meta name="keywords" .../> tag.');
    }
}

module.exports = HeadTagShouldHaveMetaTagWithKeywordsRule;
