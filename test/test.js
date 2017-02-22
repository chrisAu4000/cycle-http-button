import xs from 'xstream'
import delay from 'xstream/extra/delay'
import mocha from 'mocha'
import {assert} from 'chai'
import {prop} from 'ramda'
import model from '../src/components/http-button/model'

const assertion = (stream, fn, expected, done) => stream.addListener({
    next: x => {
      try {
        fn(x, expected)
        done && done()
      } catch(error) {
        done && done(error)
      }
    },
    error: err => done ? done(err) : console.error(err),
    complete: () => {}
  })

describe('model', _ => {
  const props = {
    text$: xs.of('Test'),
    loading$: xs.of(false),
    duration$: xs.of(10),
    className: 'testClass'
  }
  describe('return initial state', _ => {
    it('should return an Object with text, transition and className property', function(done) {
      const state$ = model(props, {click$: xs.create()})
      assertion(state$, (state) => {
        assert.isDefined(state.text)
        assert.isDefined(state.transition)
        assert.isDefined(state.className)
      }, undefined, done)
    })
    it('should return "Test" as property text', function(done) {
      const state$ = model(props, {click$: xs.create()})
      const text$ = state$.map(prop('text'))
      assertion(text$, assert.strictEqual, 'Test', done)
    })
    it('should return 100 for property transition', function(done) {
      const state$ = model(props, {click$: xs.create()})
      const transition$ = state$.map(prop('transition'))
      assertion(transition$, assert.strictEqual, 100, done)
    })
    it('should return "testClass" for property className', function(done) {
      const state$ = model(props, {click$: xs.create()})
      const className$ = state$.map(prop('className'))
      assertion(className$, assert.strictEqual, 'testClass', done)
    })
  })
  describe('click action', _ => {
    it('should return a transition sequence from 100 to 0', function(done) {
      const state$ = model(props, {click$: xs.of(true)})
      const transition$ = state$.map(prop('transition'))
      const transitionValFirst$ = transition$.take(1)
      const transitionValLast$ = transition$.last()
      assertion(transitionValFirst$, assert.strictEqual, 100)
      assertion(transitionValLast$, assert.strictEqual, 0, done)
    })
  })
})
