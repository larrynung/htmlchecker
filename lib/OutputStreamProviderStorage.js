'use strict';

const fs = require('fs');
const bulk = require('bulk-require');

class OutputStreamProviderStorage {
    constructor(folderPath) {
        this._loadOutputStreamProviders(folderPath);
    }

    _loadOutputStreamProviders(folderPath) {
        this.outputStreamProviders = [];
        let sections = bulk(folderPath, ['*.js']);
        Object.keys(sections).forEach(element => this.outputStreamProviders.push(new sections[element]()));
    }
}

module.exports = OutputStreamProviderStorage;
