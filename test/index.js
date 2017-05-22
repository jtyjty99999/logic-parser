import expect from 'expect'
import assert from 'assert'
import process from 'process'
import { parse,getVariable, evaluate} from '../index'
describe('Parser', ()=> {
  const model = {
    a: 1,
    b: 2,
    c: {d: 2},
    list: [{
      a: 1,
      b: 2
    }, {
      a: 3,
      b: 4
    }],
    cb : [1]
  }

  /*  console.log( 'a', parse( 'a' ), getVariable( parse( 'a' ) ) )
   console.log( 'a>0', parse( 'a > 0' ), getVariable( parse( 'a > 0' ) ) )
   console.log( 'a==0', parse( 'a == 0' ), getVariable( parse( 'a == 0' ) ) )
   console.log( 'a>0&&b>0', parse( 'a>0&&b>0' ), getVariable( parse( 'a>0&&b>0' ) ) )
   console.log( 'a.b>0', parse( 'a.b>0' ), getVariable( parse( 'a.b>0' ) ) )
   console.log( 'a[0].b>0', parse( 'a[0].b>0' ), getVariable( parse( 'a[0].b>0' ) ) )
   console.log( 'a[0]', parse( 'a[0]' ), getVariable( parse( 'a[0]' ) ) )
   console.log( 'a[0].b[1].c>0', parse( 'a[0].b[1].c>0' ), getVariable( parse( 'a[0].b[1].c>0' ) ) )
   console.log( 'a[0].b[1].c[0].d>0', parse( 'a[0].b[1].c[0].d>0' ), getVariable( parse( 'a[0].b[1].c[0].d>0' ) ) )
   console.log( 'a in b', parse( 'a in b' ), getVariable( parse( 'a in b' ) ) )
   console.log( 'a in [1,2,3]', parse( 'a in [1,2,3]' ), getVariable( parse( 'a in [1,2,3]' ) ) )
   console.log( 'count(a) > 0', parse( 'count(a) > 0' ), getVariable( parse( 'count(a) > 0' ) ) )
   console.log( 'count(a)> 0 ? a>b : b>a', parse( 'count(a)> 0 ? a>b : b>a' ), getVariable( parse( 'count(a)> 0 ? a>b : b>a' ) ) )*/

  describe('#evaluate', ()=> {
    it('简单比较', ()=> {
      assert.ok(evaluate(parse('a>0'), model))
      assert.ok(evaluate(parse('a<b'), model))
      assert.ok(evaluate(parse('c.d==2'), model))
      assert.ok(evaluate(parse('a>0&&a<b'), model))
      assert.ok(evaluate(parse('a<b&&c.d==2'), model))
      assert.ok(evaluate(parse('x==undefined'), model))
      assert.ok(evaluate(parse('x==null'), model))
      assert.ok(!evaluate(parse('x==1'), model))
      assert.ok(!evaluate(parse('x.x'), model))
      assert.ok(evaluate(parse('x.x==undefined'), model))
      assert.ok(evaluate(parse('x.x==null'), model))
    })
    it('fix',()=>{
      assert.ok(evaluate(parse('fix(a)'), model))
      assert.ok(evaluate(parse('fix(x)'), model))
    })
    it('count',()=>{
      assert.ok(evaluate(parse('count(a) == 0'), model))
      assert.ok(evaluate(parse('count(a) == 0'), model))
      assert.ok(evaluate(parse('count(list) == 2'), model))
      assert.ok(evaluate(parse('count(cb) == 1'), model))
      assert.ok(evaluate(parse('count(cb) == 2 || count(cb) == 1'), model))
      assert.ok(evaluate(parse('count(cb) > 0'), model))
      assert.ok(evaluate(parse('a > 2 || count(cb) > 0'), model))
      assert.ok(!evaluate(parse('a > 2 && count(cb) > 0'), model))
      assert.ok(evaluate(parse('x != null || count(cb) > 0'), model))
    })
    it('in',()=>{
      assert.ok(evaluate(parse('1 in cb'), model))
      assert.ok(!evaluate(parse('2 in cb'), model))
    })
  })
})
