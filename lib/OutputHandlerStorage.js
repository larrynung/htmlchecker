'use strict';

const fs = require('fs');
const bulk = require('bulk-require');

class OutputHandlerStorage {
    constructor(folderPath) {
        this._loadOutputHandlers(folderPath);
    }

    _loadOutputHandlers(folderPath) {
        this.outputHandlers = [];
        let sections = bulk(folderPath, [ '*.js' ]);
        Object.keys(sections).forEach(element => this.outputHandlers.push(new sections[element]()));
    }
}

module.exports = OutputHandlerStorage;
