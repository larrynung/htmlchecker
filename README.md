<h1 align="center">htmlchecker</h1>
<h5 align="center">A simple HTML checker</h5>

<br />

```js
const {Checker, InputType, OutputType} = require('../lib/checker');
...
checker
.input(InputType.Text, "<html></html>")
.check();
...
```
