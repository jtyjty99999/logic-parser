## parser


```tnpm install```



```

var parser = require('../index');

var expression1 = '2>1&&3<5&&a>9';

var expression2 = 'input=="hello"';

var ast1 = parser.parse(expression1);

var ast2 = parser.parse(expression2);

console.log(parser.evaluate(ast1,{a:2}));
console.log(parser.evaluate(ast1,{a:11}));

console.log(parser.evaluate(ast2,{input:"hello"}));

```