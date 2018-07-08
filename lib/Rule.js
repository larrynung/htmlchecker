'use strict';

class Rule {
    constructor(name, selector, message, {passCondition, params, isActive} = {}){
        this.name = name;
        this.selector = selector;
        this.passCondition = (typeof passCondition !== 'undefined') ?  passCondition : function(length){
            return length === 0;
        };
        this.message = (typeof message !== 'undefined') ?  message : 'Violate ' + name;   
        this.params = (typeof params !== 'undefined') ?  params : {};        
        this.isActive = (typeof isActive !== 'undefined') ?  isActive : true;        
     }

    check(dom) {
        var selector = (typeof this.selector !== 'function') ?  this.selector : this.selector();
        var filteredLength = dom(selector).length;
        var result = this.passCondition(filteredLength);
        var message = result ? '' : ((typeof this.message !== 'function') ?  this.message : this.message(filteredLength));
        return { result : result, message : message };
    }
}

module.exports = Rule;
