import intent from './intent'
import model from './model'
import view from './view'
/**
 * Displays a Button that is able to be shown as button or as loading spinner.
 * Instalation:
 * ```bash
 * $ npm install --save git+https://github.com/chrisAu4000/cycle-http-button.git
 * ```
 * @param {Object} sources - Source streams.
 * @param {DOMSource} sources.DOM - DOMDriver to select elements and invoke events.
 * @param {Object} props - Contains the initial state of the HttpButton.
 * @param {Stream} props.text$ - Stream of Strings that will be displayed as button text.
 * @param {Stream} props.loading$ - Stream of Booleans true if button is in loading state.
 * @param {Stream} props.duration$ - Transition duration.
 * @param {String} [props.className] - Additional className.
 * @param {Function} [props.easing = linear ease] - xstream/extra/tween easing function.
 * @returns {Object} {
 *    DOM :: vtree,
 *    clicked$ :: Stream
 * }
 * @example <caption>app.js</caption>
 * import {run} from '@cycle/xstream-run'
 * import {makeDOMDriver} from '@cycle/dom'
 * import xs from 'xstream'
 * import delay from 'xstream/extra/delay'
 * import tween from 'xstream/extra/tween'
 *
 * function main (sources) {
 *   const duration        = 250
 *   const textProxy$      = xs.create()
 *   const resetTextProxy$ = xs.create()
 *   const loadProxy$      = xs.create()
 *   const props = {
 *     text$:     xs.merge(xs.of('Signin'), textProxy$, resetTextProxy$),
 *     loading$:  xs.merge(xs.of(false), loadProxy$),
 *     duration$: xs.of(duration),
 *     easing:    tween.power2.easeIn
 *   }
 *   const httpButton = HttpButton(sources, props)
 *   textProxy$.imitate(httpButton.clicked$.mapTo('Loading ...'))
 *   resetTextProxy$.imitate(httpButton.clicked$.mapTo('Signin').compose(delay(4 * duration)))
 *   loadProxy$.imitate(httpButton.clicked$.mapTo(false).compose(delay(4 * duration)))
 *   return {
 *     DOM: httpButton.DOM
 *   }
 * }
 *
 * const drivers = {
 *   DOM: makeDOMDriver('#app')
 * }
 *
 * run(main, drivers)
**/
const HttpButton = (sources, props) => {
  const click$ = intent(sources)
  const state$ = model(props, {click$})
  return {
    DOM: view(state$),
    clicked$ : click$
  }
}
export default HttpButton
