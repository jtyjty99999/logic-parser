var parser = require('../index');

var expression1 = '2>1&&3<5&&a>9';

var expression2 = 'input=="hello"';

var expression3 = '!(summaryDeclaredValue > 800 && summaryDeclaredCurrency === "USD")'

var ast1 = parser.parse(expression1);

var ast2 = parser.parse(expression2);
var ast3 = parser.parse(expression3);

console.log(ast3);
console.log(parser.getVariable(ast3));

//console.log(parser.evaluate(ast1,{a:2}));
//console.log(parser.evaluate(ast1,{a:11}));

//console.log(parser.evaluate(ast2,{input:"hello"}));