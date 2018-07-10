'use strict';

const path = require('path');
const InputStreamProviderStorage = require('./InputStreamProviderStorage');
const OutputStreamProviderStorage = require('./OutputStreamProviderStorage');
const RuleStorage = require('./RuleStorage');
const InputType = require('./InputType');
const OutputType = require('./OutputType');
const AnalyzeStream = require('./AnalyzeStream');
const Rule = require('./Rule');

/**
 * The class that can input => analyze => output
 */
class Checker {
    /**
     * @constructor
     */
    constructor() {
        let inputStreamProvidersFolder =
            path.join(__dirname, 'InputStreamProviders');
        let outputStreamProvidersFolder =
            path.join(__dirname, 'OutputStreamProviders');
        let rulesFolder = path.join(__dirname, 'Rules');
        let inputStreamProviderStorage =
            new InputStreamProviderStorage(inputStreamProvidersFolder);
        let outputStreamProviderStorage =
            new OutputStreamProviderStorage(outputStreamProvidersFolder);
        let ruleStorage = new RuleStorage(rulesFolder);


        this._registeredInputStreamProviders = {};
        this._registerInputStreamProviders(
            inputStreamProviderStorage.inputStreamProviders
        );
        this._registeredOutputStreamProviders = {};
        this._registerOutputStreamProviders(
            outputStreamProviderStorage.outputStreamProviders
        );
        this.registeredRules = {};
        this._registeredRules = [];
        this.registerRules(ruleStorage.rules);
    }

    /**
     * Register InputStreamProviders
     * @param {*} inputStreamProviders
     */
    _registerInputStreamProviders(inputStreamProviders) {
        inputStreamProviders.forEach((element) => {
            this._registeredInputStreamProviders[element.inputType] = element;
        });
    }

    /**
     * Register InputStreamProviders
     * @param {*} outputStreamProviders
     */
    _registerOutputStreamProviders(outputStreamProviders) {
        outputStreamProviders.forEach((element) => {
            this._registeredOutputStreamProviders[element.outputType] = element;
        });
    }

    /**
     * Register rules
     * @param {*} rules
     */
    registerRules(rules) {
        rules.forEach((element) => {
            this.registeredRules[element.name] = element;
            this._registeredRules.push(element);
        });
    }

    /**
     * Setup analyze rules
     * @param {*} rules Rules for analyze
     * @return {*} This object's instance
     */
    rules(rules) {
        this._rules = rules;
        return this;
    }

    /**
     * Setup input
     * @param {*} inputType Input type
     * @param {*} inputSource Input source
     * @return {*} This object's instance
     */
    input(inputType, inputSource) {
        this._inputType = inputType;
        this._inputSource = inputSource;
        return this;
    }

    /**
     * Setup output
     * @param {*} outputType Output type
     * @param {*} outputTarget Output target
     * @return {*} This object's instance
     */
    output(outputType, outputTarget) {
        this._outputType = outputType;
        this._outputTarget = outputTarget;
        return this;
    }

    /**
     * Check input with rules, and output analyze message
     * @param {*} callback Callback when analyze done
     */
    check(callback) {
        if (typeof this._inputType === 'undefined'
            || typeof this._inputSource === 'undefined'
            || this._inputType === null
            || this._inputSource === null) {
            throw new Error('Without setup input');
        }

        let rules = this._rules || this._registeredRules;
        let inputStreamProvider =
            this._registeredInputStreamProviders[this._inputType];
        let inputStream = inputStreamProvider.getInputStream(this._inputSource);
        let analyzeStream = new AnalyzeStream(rules, function (result, messages) {
            /* eslint-disable no-invalid-this */
            this._result = result;
            this._messages = messages;
            /* eslint-enable */
        });
        let processStream = inputStream.pipe(analyzeStream);
        if (typeof this._outputType !== 'undefined' &&
            this._outputType !== null) {
            let outputStreamProvider =
                this._registeredOutputStreamProviders[this._outputType];
            let outputStream =
                outputStreamProvider.getOutputStream(this._outputTarget);
            processStream.pipe(outputStream);
        }

        processStream.on('finish', function () {
            if (typeof callback !== 'undefined') {
                /* eslint-disable no-invalid-this */
                callback(this._result, this._messages);
                /* eslint-enable */
            }
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
    OutputType,
    Rule,
};
