'use strict';

const cheerio = require('cheerio');
const path = require('path');
const InputHandlerStorage = require('./InputHandlerStorage');
const OutputHandlerStorage = require('./OutputHandlerStorage');
const RuleStorage = require('./RuleStorage');
const InputType = require('./InputType');
const OutputType = require('./OutputType');

class Checker {
    constructor() {
        var inputHandlersFolder = path.join(__dirname, 'InputHandlers');
        var outputHandlersFolder = path.join(__dirname, 'OutputHandlers');
        var rulesFolder = path.join(__dirname, 'Rules');
        var inputHandlerStorage = new InputHandlerStorage(inputHandlersFolder);        
        var outputHandlerStorage = new OutputHandlerStorage(outputHandlersFolder);
        var ruleStorage = new RuleStorage(rulesFolder);


        this._registeredInputHandlers = {};
        this._registerInputHandlers(inputHandlerStorage.inputHandlers);
        this._registeredOutputHandlers = {};
        this._registerOutputHandlers(outputHandlerStorage.outputHandlers);
        this.registeredRules = {};
        this._registeredRules = [];
        this.registerRules(ruleStorage.rules);
    }

    _registerInputHandlers(inputHandlers)
    {
        //TODO: Check params
        inputHandlers.forEach(element => {
            this._registeredInputHandlers[element.inputType] = element;
        });
    }

    _registerOutputHandlers(outputHandlers)
    {
        //TODO: Check params
        outputHandlers.forEach(element => {
            this._registeredOutputHandlers[element.outputType] = element;
        });
    }

    registerRules(rules)
    {
        //TODO: Check params
        rules.forEach(element => {
            this.registeredRules[element.name] = element;
            this._registeredRules.push(element);
        });
    }

    rules(rules)
    {
        //TODO: Check params
        this._rules = rules;
        return this;
    }

    input(inputType, inputSource)
    {
        //TODO: Check params
        this._inputType = inputType;
        this._inputSource = inputSource;
        return this;
    }

    output(outputType, outputTarget)
    {
        //TODO: Check params
        this._outputType = outputType;
        this._outputTarget = outputTarget;
        return this;
    }

    check() {
        if (typeof this._inputType === 'undefined' 
        || typeof this._inputSource === 'undefined'
        || this._inputType === null
        || this._inputSource === null)
        { 
            throw new Error("Without input data");
        }

        var inputHandler = this._registeredInputHandlers[this._inputType];
        var data = inputHandler.input(this._inputSource);

        var rules = this._rules || this._registeredRules;
        var dom = cheerio.load(data);
        var result = true;
        var messages = [];
        Object.keys(rules).forEach(element => {
            var rule = rules[element];
            if(rule.isActive)
            {
                var ruleCheck = rule.check(dom);
                result = result && ruleCheck.result;
                if(!ruleCheck.result) messages.push(ruleCheck.message);
            }
        });

        if (typeof this._outputType !== 'undefined' && this._outputType !== null)
        { 
            var outputHandler = this._registeredOutputHandlers[this._outputType];
            outputHandler.output(this._outputTarget, messages);
        }
        
        this._rules = null;
        this._inputType = null;
        this._inputSource = null;
        this._outputType = null;
        this._outputTarget = null;

        return result;
    }
}

module.exports = {
    Checker,
    InputType,
    OutputType
};