'use strict';

const HeadTagShouldHaveMetaTagRule = require('./HeadTagShouldHaveMetaTagRule');

class HeadTagShouldHaveMetaTagWithDescriptionRule extends HeadTagShouldHaveMetaTagRule {
    constructor(){
        super('HeadTagShouldHaveMetaTagWithDescriptionRule', 'descriptions', 'This HTML without <meta name="descriptions" .../> tag.');
    }
}

module.exports = HeadTagShouldHaveMetaTagWithDescriptionRule;
