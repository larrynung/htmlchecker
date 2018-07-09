'use strict';

const Transform = require('stream').Transform;
const cheerio = require('cheerio');
const path = require('path');
const InputHandlerStorage = require('./InputHandlerStorage');
const OutputStreamProviderStorage = require('./OutputStreamProviderStorage');
const RuleStorage = require('./RuleStorage');
const InputType = require('./InputType');
const OutputType = require('./OutputType');
const CheckTransformStream = require('./CheckTransformStream');

class Checker {
    constructor() {
        let inputHandlersFolder = path.join(__dirname, 'InputHandlers');
        let outputStreamProvidersFolder = path.join(__dirname, 'OutputStreamProviders');
        let rulesFolder = path.join(__dirname, 'Rules');
        let inputHandlerStorage = new InputHandlerStorage(inputHandlersFolder);
        let outputStreamProviderStorage = new OutputStreamProviderStorage(outputStreamProvidersFolder);
        let ruleStorage = new RuleStorage(rulesFolder);


        this._registeredInputHandlers = {};
        this._registerInputHandlers(inputHandlerStorage.inputHandlers);
        this._registeredOutputStreamProviders = {};
        this._registerOutputStreamProviders(outputStreamProviderStorage.outputStreamProviders);
        this.registeredRules = {};
        this._registeredRules = [];
        this.registerRules(ruleStorage.rules);
    }

    _registerInputHandlers(inputHandlers) {
        inputHandlers.forEach(element => {
            this._registeredInputHandlers[element.inputType] = element;
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
        if (typeof this._outputType !== 'undefined' && this._outputType !== null) {
            throw new Error("Without setup output");
        }

        let inputHandler = this._registeredInputHandlers[this._inputType];
        let html = inputHandler.input(this._inputSource);

        let rules = this._rules || this._registeredRules;

        let Readable = require('stream').Readable
        let s = new Readable({
            read(size) {
                this.push(html);
                this.push(null);
            }
        });

        let transform = new CheckTransformStream(rules, function (result) {
            this._result = result;
        });
        if (typeof this._outputType !== 'undefined' && this._outputType !== null) {
            let outputStreamProvider = this._registeredOutputStreamProviders[this._outputType];
            let outputStream = outputStreamProvider.getOutputStream(this._outputTarget);
            s.pipe(transform).pipe(outputStream).on('finish', function () {
                callback(this._result);
            });
        }

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