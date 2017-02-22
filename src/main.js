import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'
import HttpButton from './components/http-button'
/**
 * Props:
 * {Stream} text$: Stream of Strings that will be displayed as button text.
 * {Stream} loading$: Stream of Booleans true if button is in loading state.
 * {Stream} duration$: Transition duration.
 * {String} [className]: Additional className.
 * {Function} [easing]: xstream/extra/tween easing function.
 */
function main(sources) {
  const duration = 250
  const textProxy$ = xs.create()
  const resetTextProxy$ = xs.create()
  const loadProxy$ = xs.create()

  const props = {
    text$:     xs.merge(xs.of('Signin'), textProxy$, resetTextProxy$),
    loading$:  xs.merge(xs.of(false), loadProxy$),
    duration$: xs.of(duration),
    easing:    tween.power2.easeIn
  }
  const httpButton = HttpButton(sources, props)

  textProxy$.imitate(httpButton.clicked$.mapTo('Loading ...'))
  resetTextProxy$.imitate(httpButton.clicked$.mapTo('Signin').compose(delay(4 * duration)))
  loadProxy$.imitate(httpButton.clicked$.mapTo(false).compose(delay(4 * duration)))
  return {
    DOM: httpButton.DOM
  }
}

export default main
