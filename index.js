'use strict';

const evaluate = require('./static-eval');
const jsep = require('./jsep');

jsep.addBinaryOp( 'in', 10 );

exports.parse = function ( expression ) {
  return jsep( expression );
}

exports.evaluate = function ( ast, vars, opts ) {
  const v = vars || {};
  const o = Object.assign( {
    operator: {
      in: function ( l, r ) {
        return r.indexOf( l ) > -1
      }
    },
    callFn: {
      count: function ( v ) {
        if ( v == null || v == undefined || v == '' || !v.hasOwnProperty( 'length' ) ) {
          return 0
        }
        return v.length
      },
      fix: function ( v ) {
        return true
      }
    }
  }, opts )
  return evaluate( ast, v, o )
}

const getVars = ( syntaxTree )=> {
  const contain = ( array, key )=> array.indexOf( key ) > -1
  const vars = ( ast, source )=> {
    let result = source || [];
    const recursionMap = [ 'LogicalExpression', 'BinaryExpression'];
    const recursionMember = ( a, s )=> {
      let r = s || []
      if ( a.hasOwnProperty( 'property' ) ) {
        a.property.hasOwnProperty( 'name' ) && r.unshift( '.' + a.property.name )
        a.property.hasOwnProperty( 'raw' ) && r.unshift( `[${a.property.raw}]` )
      } else if ( a.hasOwnProperty( 'name' ) ) {
        r.unshift( a.name )
      }
      if ( a.hasOwnProperty( 'object' ) ) {
        recursionMember( a.object, r )
      }
      return r
    }
    if ( ast.type == 'UnaryExpression' ) {
      vars( ast.argument, result );
    }
    if ( contain( recursionMap, ast.type ) ) {
      if ( contain( recursionMap, ast.left.type ) ) {
        vars( ast.left, result );
      }
      if ( contain( recursionMap, ast.right.type ) ) {
        vars( ast.right, result );
      }
    }
    if ( ast.type == 'Identifier' ) {
      result.push( ast.name )
    }
    if ( ast.left && !contain( recursionMap, ast.left.type ) ) {
      vars( ast.left, result );
    }
    if ( ast.right && !contain( recursionMap, ast.right.type ) ) {
      vars( ast.right, result );
    }
    if ( ast.type === 'MemberExpression' ) {
      result.push( recursionMember( ast ).join( '' ) )
    }

    if ( ast.type === 'CallExpression' ) {
      for ( let i = 0, c = ast.arguments.length; i < c; i++ ) {
        vars( ast.arguments[ i ], result );
      }
    }

    if ( ast.type === 'ConditionalExpression' ) {
      ast.hasOwnProperty( 'test' ) && vars( ast.test, result );
      ast.hasOwnProperty( 'consequent' ) && vars( ast.consequent, result );
      ast.hasOwnProperty( 'alternate' ) && vars( ast.alternate, result );
    }
    return result
  }
  const resultVars = vars( syntaxTree )
  let n = []
  for ( let i = 0, c = resultVars.length; i < c; i++ ) {
    if ( n.indexOf( resultVars[ i ] ) == -1 ) {
      n.push( resultVars[ i ] )
    }
  }
  return n
}

exports.getVariable = getVars