'use strict';

const Transform = require('stream').Transform;
const cheerio = require('cheerio');

class CheckTransformStream extends Transform {

    constructor(rules, callback) {
        super();
        this._rules = rules;
        this._data = '';
        this._callback = callback;
    }

    _transform(data, encoding, callback) {
        this._data += data.toString();
        callback();
    }

    _flush(callback) {
        let dom = cheerio.load(this._data);
        let resut = true;
        Object.keys(this._rules).forEach(element => {
            let rule = this._rules[element];
            if (rule.isActive) {
                let ruleCheck = rule.check(dom);
                result = result && ruleCheck.result;
                if (!ruleCheck.result) this.push(ruleCheck.message);
            }
        });
        this._data = '';
        callback();
        this._callback(result);
    }
}

module.exports = CheckTransformStream;
