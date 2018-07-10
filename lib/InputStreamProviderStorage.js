'use strict';

const fs = require('fs');
const bulk = require('bulk-require');

class InputStreamProviderStorage {
    constructor(folderPath) {
        this._loadInputStreamProviders(folderPath);
    }

    _loadInputStreamProviders(folderPath) {
        this.inputStreamProviders = [];
        let sections = bulk(folderPath, [ '*.js' ]);
        Object.keys(sections).forEach(element => this.inputStreamProviders.push(new sections[element]()));
    }
}

module.exports = InputStreamProviderStorage;
