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
        let inputHandlersFolder = path.join(__dirname, 'InputHandlers');
        let outputHandlersFolder = path.join(__dirname, 'OutputHandlers');
        let rulesFolder = path.join(__dirname, 'Rules');
        let inputHandlerStorage = new InputHandlerStorage(inputHandlersFolder);        
        let outputHandlerStorage = new OutputHandlerStorage(outputHandlersFolder);
        let ruleStorage = new RuleStorage(rulesFolder);


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

        let inputHandler = this._registeredInputHandlers[this._inputType];
        let data = inputHandler.input(this._inputSource);

        let rules = this._rules || this._registeredRules;
        let dom = cheerio.load(data);
        let result = true;
        let messages = [];
        Object.keys(rules).forEach(element => {
            let rule = rules[element];
            if(rule.isActive)
            {
                let ruleCheck = rule.check(dom);
                result = result && ruleCheck.result;
                if(!ruleCheck.result) messages.push(ruleCheck.message);
            }
        });

        if (typeof this._outputType !== 'undefined' && this._outputType !== null)
        { 
            let outputHandler = this._registeredOutputHandlers[this._outputType];
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