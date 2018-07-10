'use strict';

const HeadTagShouldHaveMetaTagRule = require('./HeadTagShouldHaveMetaTagRule');

/**
 * Rule for check <head> tag without have descriptions <meta> tag
 */
class HeadTagShouldHaveMetaTagWithDescriptionRule
    extends HeadTagShouldHaveMetaTagRule {
    /**
     * @constructor
     */
    constructor() {
        super('HeadTagShouldHaveMetaTagWithDescriptionRule',
            'descriptions',
            'This HTML without <meta name="descriptions" .../> tag.');
    }
}

module.exports = HeadTagShouldHaveMetaTagWithDescriptionRule;
