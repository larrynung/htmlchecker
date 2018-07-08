'use strict';

const fs = require('fs');
const bulk = require('bulk-require');

class InputHandlerStorage {
    constructor(folderPath) {
        this._loadInputHandlers(folderPath);
    }

    _loadInputHandlers(folderPath) {
        this.inputHandlers = [];
        var sections = bulk(folderPath, [ '*.js' ]);
        Object.keys(sections).forEach(element => this.inputHandlers.push(new sections[element]()));
    }
}

module.exports = InputHandlerStorage;
