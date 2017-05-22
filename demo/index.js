var parser = require('../index');

var expression1 = '2>1&&3<5&&a>9';

var expression2 = 'input!=="hello"';

var expression3 = 'a[0].b[1].c == "hello"'

var ast1 = parser.parse(expression1);

var ast2 = parser.parse(expression2);

var ast3 = parser.parse(expression3);
/*
console.log(parser.evaluate(ast1, {
	a: 2
}));
console.log(parser.evaluate(ast1, {
	a: 11
}));
console.log(ast3);
console.log(JSON.stringify(parser.evaluate(ast2,{input:"hello"})));
console.log(parser.evaluate(ast3, {
	a: [{
		b: [1, {
			c: "hello"
		}]
	}]
}));
console.log(parser.getVariable(ast1))
console.log(parser.getVariable(ast2))
console.log(parser.getVariable(ast3))*/

console.log(expression3,parser.getVariable(ast3))