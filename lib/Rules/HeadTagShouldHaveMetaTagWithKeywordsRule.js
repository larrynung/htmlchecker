'use strict';

const HeadTagShouldHaveMetaTagRule = require('./HeadTagShouldHaveMetaTagRule');

class HeadTagShouldHaveMetaTagWithKeywordsRule extends HeadTagShouldHaveMetaTagRule {
    constructor(){
        super('HeadTagShouldHaveMetaTagWithKeywordsRule', 'keywords', 'This HTML without <meta name="keywords" .../> tag.');
    }
}

module.exports = HeadTagShouldHaveMetaTagWithKeywordsRule;
