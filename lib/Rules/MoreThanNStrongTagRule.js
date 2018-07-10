'use strict';

const Rule = require('../Rule');

/**
 * Rule for check more than N <strong> tag
 */
class MoreThanNStrongTagRule extends Rule {
    /**
     * @constructor
     */
    constructor() {
        super('MoreThanNStrongTagRule',
            'strong',
            function (length) {
                /* eslint-disable no-invalid-this */
                return 'This HTML have more than '
                    + this.params.maxStrongTagCount
                    + ' <strong> tag.';
                /* eslint-enable */
            },
            {
                passCondition: function (length) {
                    return length <= this.params.maxStrongTagCount;
                },
                params: {
                    maxStrongTagCount: 15,
                },
            });
    }
}

module.exports = MoreThanNStrongTagRule;
