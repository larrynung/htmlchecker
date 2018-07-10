'use strict';

const Transform = require('stream').Transform;
const cheerio = require('cheerio');
const path = require('path');
const InputStreamProviderStorage = require('./InputStreamProviderStorage');
const OutputStreamProviderStorage = require('./OutputStreamProviderStorage');
const RuleStorage = require('./RuleStorage');
const InputType = require('./InputType');
const OutputType = require('./OutputType');
const AnalyzeStream = require('./AnalyzeStream');

class Checker {
    constructor() {
        let inputStreamProvidersFolder = path.join(__dirname, 'InputStreamProviders');
        let outputStreamProvidersFolder = path.join(__dirname, 'OutputStreamProviders');
        let rulesFolder = path.join(__dirname, 'Rules');
        let inputStreamProviderStorage = new InputStreamProviderStorage(inputStreamProvidersFolder);
        let outputStreamProviderStorage = new OutputStreamProviderStorage(outputStreamProvidersFolder);
        let ruleStorage = new RuleStorage(rulesFolder);


        this._registeredInputStreamProviders = {};
        this._registerInputStreamProviders(inputStreamProviderStorage.inputStreamProviders);
        this._registeredOutputStreamProviders = {};
        this._registerOutputStreamProviders(outputStreamProviderStorage.outputStreamProviders);
        this.registeredRules = {};
        this._registeredRules = [];
        this.registerRules(ruleStorage.rules);
    }

    _registerInputStreamProviders(inputStreamProviders) {
        inputStreamProviders.forEach(element => {
            this._registeredInputStreamProviders[element.inputType] = element;
        });
    }

    _registerOutputStreamProviders(outputStreamProviders) {
        outputStreamProviders.forEach(element => {
            this._registeredOutputStreamProviders[element.outputType] = element;
        });
    }

    registerRules(rules) {
        rules.forEach(element => {
            this.registeredRules[element.name] = element;
            this._registeredRules.push(element);
        });
    }

    rules(rules) {
        this._rules = rules;
        return this;
    }

    input(inputType, inputSource) {
        this._inputType = inputType;
        this._inputSource = inputSource;
        return this;
    }

    output(outputType, outputTarget) {
        this._outputType = outputType;
        this._outputTarget = outputTarget;
        return this;
    }

    check(callback) {
        if (typeof this._inputType === 'undefined'
            || typeof this._inputSource === 'undefined'
            || this._inputType === null
            || this._inputSource === null) {
            throw new Error("Without setup input");
        }

        let rules = this._rules || this._registeredRules;
        let inputStreamProvider = this._registeredInputStreamProviders[this._inputType];
        let inputStream = inputStreamProvider.getInputStream(this._inputSource);
        let analyzeStream = new AnalyzeStream(rules, function (result) {
            this._result = result;
        });
        var processStream = inputStream.pipe(analyzeStream);
        if (typeof this._outputType !== 'undefined' && this._outputType !== null) {
            let outputStreamProvider = this._registeredOutputStreamProviders[this._outputType];
            let outputStream = outputStreamProvider.getOutputStream(this._outputTarget);
            processStream.pipe(outputStream);
        }

        processStream.on('finish', function () {
            if(typeof callback !== 'undefined')
                callback(this._result);
        });

        this._rules = null;
        this._inputType = null;
        this._inputSource = null;
        this._outputType = null;
        this._outputTarget = null;
    }
}

module.exports = {
    Checker,
    InputType,
    OutputType
};