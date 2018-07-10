'use strict';

const bulk = require('bulk-require');

/**
 * The storage that provide OutputStreamProviders
 */
class OutputStreamProviderStorage {
    /**
     * @constructor
     * @param {string} folderPath
     */
    constructor(folderPath) {
        this._loadOutputStreamProviders(folderPath);
    }

    /**
     * Load OutputStreamProviders
     * @param {string} folderPath
     */
    _loadOutputStreamProviders(folderPath) {
        this.outputStreamProviders = [];
        let sections = bulk(folderPath, ['*.js']);
        Object.keys(sections).forEach((element) =>
            this.outputStreamProviders.push(new sections[element]())
        );
    }
}

module.exports = OutputStreamProviderStorage;
