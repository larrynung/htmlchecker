'use strict';

const Rule = require('../Rule');

/**
 * Rule for check <a> tag without have rel attribute
 */
class ATagShuldHaveRelAttributeRule extends Rule {
    /**
     * @constructor
     */
    constructor() {
        super('ATagShuldHaveRelAttributeRule',
            'a:not([rel])',
            function (length) {
                return 'There are ' +
                    length +
                    ' <a> tag without rel attribute.';
            });
    }
}

module.exports = ATagShuldHaveRelAttributeRule;
