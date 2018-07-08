htmlchecker
================
A simple HTML checker

```js
const {Checker, InputType, OutputType} = require('../lib/checker');
...
checker
.input(InputType.Text, "<html></html>")
.check();
...
```
