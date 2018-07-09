simplehtmlchecker
================
A simple HTML checker

```js
const {Checker, InputType, OutputType} = require('simplehtmlchecker');
var checker = new Checker();
checker
.input(InputType.Text, "<html></html>")
.output(OutputType.Console)
.check();
...
```
