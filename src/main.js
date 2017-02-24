import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'
import concat from 'xstream/extra/concat'
import fromDiagram from 'xstream/extra/fromDiagram'
import HttpButton from './components/http-button'
/**
 * Props:
 * {String} text$: Stream of Strings that will be displayed as button text.
 * {Boolean} loading$: Stream of Booleans true if button is in loading state.
 * {Number} duration$: Transition duration.
 * {String} [className]: Additional className.
 * {Function} [easing]: xstream/extra/tween easing function.
 */
function main(sources) {
  const duration = 2500
  const resetProxy$ = xs.create()
  const props = {
    text:     'Signin',
    loading:  false,
    duration: duration,
    className:'test',
    easing:   tween.power2.easeOut
  }
  const propsB = {
    text:     'Loading...',
    loading:  true,
    duration: duration,
    easing:   tween.power2.easeIn
  }
  const props$ = fromDiagram('-a--------------------------------------------b--------------------------------------------a-')
    .map(x => x === 'a' ? props : propsB)
    .compose(delay(1000))
  const {DOM, clicked$} = HttpButton(sources, xs.merge(props$, resetProxy$))
  const setLoadingText$ = concat(xs.of(props).take(1), clicked$.mapTo('Loading ...'))
  resetProxy$.imitate(clicked$.mapTo(props).compose(delay(4 * duration)))
  return {
    DOM: DOM
  }
}

export default main
