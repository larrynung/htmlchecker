'use strict';

const fs = require('fs');
const bulk = require('bulk-require');

class RuleStorage {
    constructor(folderPath) {
        this._loadRulers(folderPath);
    }

    _loadRulers(folderPath) {
        this.rules = [];
        let sections = bulk(folderPath, [ '*.js' ]);
        Object.keys(sections).forEach(element => this.rules.push(new sections[element]()));
    }
}

module.exports = RuleStorage;
