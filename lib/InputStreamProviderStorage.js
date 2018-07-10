'use strict';

const bulk = require('bulk-require');

/**
 * The storage that provide InputStreamProviders
 */
class InputStreamProviderStorage {
    /**
     * @constructor
     * @param {string} folderPath
     */
    constructor(folderPath) {
        this._loadInputStreamProviders(folderPath);
    }

    /**
     * Load InputStreamProviders
     * @param {string} folderPath
     */
    _loadInputStreamProviders(folderPath) {
        this.inputStreamProviders = [];
        let sections = bulk(folderPath, ['*.js']);
        Object.keys(sections).forEach((element) =>
            this.inputStreamProviders.push(new sections[element]())
        );
    }
}

module.exports = InputStreamProviderStorage;
