import {prop, curry, compose} from 'ramda'
import xs from 'xstream'
import tween from 'xstream/extra/tween'
import concat from 'xstream/extra/concat'
import sampleCombine from 'xstream/extra/sampleCombine'

const toState = curry((props, transition) => ({
  text: props.text,
  className: props.className || '',
  transition: transition
}))

const staticTransition = props => props.loading ? 0 : 100

const tweenOpts = props => props.loading ?
  {from: 100, to: 0, duration: props.duration, ease: props.easing} :
  {from: 0, to: 100, duration: props.duration, ease: props.easing}

const model = (props$, {click$}) => {
  const onProps$ = concat(
    props$
      .take(1)
      .map(props => toState(props, staticTransition(props))),
    props$
      .map(props => tween(tweenOpts(props))
        .map(toState(props))
      )
      .flatten()
  )
  const onClick$ = click$
    .mapTo(true)
    .compose(sampleCombine(props$))
    .map(([loading, props]) => Object.assign({}, props, {loading}))
    .map(props => tween(tweenOpts(props))
      .map(toState(props))
    )
    .flatten()
  return xs.merge(onProps$, onClick$)
}
export default model
