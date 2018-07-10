'use strict';

const Rule = require('../Rule');

/**
 * Rule for check <head> tag have <meta> tag
 */
class HeadTagShouldHaveMetaTagRule extends Rule {
    /**
     * @param {*} name
     * @param {*} nameAttributeValue
     * @param {*} message
     */
    constructor(name, nameAttributeValue, message) {
        name = (typeof name !== 'undefined') ?
            name :
            'HeadTagShouldHaveMetaTagRule';
        let selector = 'head:not(:has(meta))';
        selector = (typeof nameAttributeValue !== 'undefined') ?
            selector.replace('meta', 'meta[name="' +
                nameAttributeValue +
                '"]') :
            selector;
        message = (typeof message !== 'undefined') ?
            message :
            'This HTML without <meta> tag.';
        super(name, selector, message);
    }
}

module.exports = HeadTagShouldHaveMetaTagRule;
