import {prop, curry} from 'ramda'
import xs from 'xstream'
import tween from 'xstream/extra/tween'
import concat from 'xstream/extra/concat'
import sampleCombine from 'xstream/extra/sampleCombine'

const model = ({
  text$,
  loading$,
  duration$,
  className,
  easing
  }, {click$}) => {
  const tweenOpts = curry((duration, from, to) => ({
    from: from,
    to: to,
    ease: easing || tween.linear.ease,
    duration: duration,
  }))
  const tweenOpt$ = duration$.map(tweenOpts)
  const initial$ = loading$
    .take(1)
    .map(isLoading => isLoading ? 0 : 100)
  const isLoading$ = xs.merge(loading$, click$.mapTo(true))
  const transition$ = concat(initial$, isLoading$
    .compose(sampleCombine(tweenOpt$))
    .map(([isLoading, tweenOpts]) =>
      isLoading ?
      tween(tweenOpts(100, 0)) :
      tween(tweenOpts(0, 100))
    )
    .flatten())
  const state$ = xs.combine(text$, transition$)
    .map(([text, transition]) => ({text, transition, className}))
  return state$
}
export default model
