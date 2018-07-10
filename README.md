simplehtmlchecker
================
A simple HTML checker

## Installation
`npm install eslint -g`

## Getting started
```js
...
const {Checker, InputType, OutputType} = require('simplehtmlchecker');
...
var checker = new Checker();
checker
.input(InputType.Text, "<html></html>")
.output(OutputType.Console)
.check();
```

## Check analyze result
```js
...
var checker = new Checker();
checker
.input(InputType.Text, "<html></html>")
.output(OutputType.Console)
.check(function(result, messages){
    ...
});
```

## Set rule's params
```js
...
var checker = new Checker();
checker.registeredRules.MoreThanNStrongTagRule.params.maxStrongTagCount = 15;
checker
.input(InputType.Text, "<html></html>")
.output(OutputType.Console)
.check();
```

## Set rule's active status
```js
...
var checker = new Checker();
checker.registeredRules.ImgTagShouldHaveAltAttributeRule.isActive = false;
checker
.input(InputType.Text, "<html></html>")
.output(OutputType.Console)
.check();
```

## Create custom rule
```js
...
class ATagShuldHaveHrefAttributeRule extends Rule {
    constructor(){
        super('ATagShuldHaveHrefAttributeRule', 'a:not([href])', function(length) { return 'There are ' + length + ' <a> tag without href attribute.'; });
     }
}

module.exports = ATagShuldHaveHrefAttributeRule;
```

```js
...
var aTagShouldHaveHrefAttributeRule = new Rule('ATagShouldHaveHrefAttributeRule', 'a:not([href])', function(length) { return 'There are ' + length + ' <a> tag without href attribute.'; });
```

## Register custom rule
```js
...
var checker = new Checker();
checker.registerRules([ATagShuldHaveHrefAttributeRule]);
checker
.input(InputType.Text, "<html></html>")
.output(OutputType.Console)
.check();
```

## Use custom rule
```js
...
var checker = new Checker();
checker
.input(InputType.Text, "<html></html>")
.output(OutputType.Console)
.rules([aTagShouldHaveHrefAttributeRule])
.check();
```

## Input form stream
```js
...
checker
.input(InputType.Stream, stream)
.check();
```

## Input form file
```js
...
checker
.input(InputType.File, file)
.check();
```

## Output to stream
```js
...
checker
.input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
.output(OutputType.Stream, stream)
.check();
```


## Output to file
```js
...
checker
.input(InputType.Text, "<head><title></title><meta name='descriptions'/><meta name='keywords'/></head><img/>")
.output(OutputType.File, file)
.check();
```
