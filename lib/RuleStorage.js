'use strict';

const bulk = require('bulk-require');

/**
 * The storage which provide rules
 */
class RuleStorage {
    /**
     * @constructor
     * @param {string} folderPath
     */
    constructor(folderPath) {
        this._loadRulers(folderPath);
    }

    /**
     * @param {string} folderPath
     */
    _loadRulers(folderPath) {
        this.rules = [];
        let sections = bulk(folderPath, ['*.js']);
        Object.keys(sections).forEach((element) =>
            this.rules.push(new sections[element]())
        );
    }
}

module.exports = RuleStorage;
