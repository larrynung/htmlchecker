'use strict';

/**
 * Rule for check
 */
class Rule {
    /**
     * @constructor
     * @param {string} name
     * @param {(string|function)} selector
     * @param {(string|function)} message
     * @param {*} param3
     */
    constructor(name, selector, message,
        {passCondition, params, isActive} = {}) {
        this.name = name;
        this.selector = selector;
        this.passCondition = (typeof passCondition !== 'undefined') ?
            passCondition :
            function (length) {
                return length === 0;
            };
        this.message = (typeof message !== 'undefined') ?
            message :
            'Violate ' + name;
        this.params = (typeof params !== 'undefined') ?
            params :
            {};
        this.isActive = (typeof isActive !== 'undefined') ?
            isActive :
            true;
    }

    /**
     * @param {*} dom
     * @return {*} Analyze result
     */
    check(dom) {
        let selector = (typeof this.selector !== 'function') ?
            this.selector :
            this.selector();
        let filteredLength = dom(selector).length;
        let result = this.passCondition(filteredLength);
        let message = result ? '' : ((typeof this.message !== 'function') ?
            this.message :
            this.message(filteredLength));
        return {result: result, message: message};
    }
}

module.exports = Rule;
