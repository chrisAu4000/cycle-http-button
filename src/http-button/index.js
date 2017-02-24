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
 * @param {Stream} props - Contains the initial state of the HttpButton.
 * @param {String} props.text - Stream of Strings that will be displayed as button text.
 * @param {Boolean} props.loading - Stream of Booleans true if button is in loading state.
 * @param {Number} props.duration - Transition duration.
 * @param {String} [props.className] - Additional className.
 * @param {Function} [props.easing = linear ease] - xstream/extra/tween easing function.
 * @returns {Object} {
 *    DOM :: vtree,
 *    clicked$ :: Stream
 * }
 * @example <caption>app.js</caption>
 * import xs from 'xstream'
 * import delay from 'xstream/extra/delay'
 * import tween from 'xstream/extra/tween'
 * import concat from 'xstream/extra/concat'
 * import fromDiagram from 'xstream/extra/fromDiagram'
 * import HttpButton from './components/http-button'
 *
 * function main(sources) {
 *   const duration = 250
 *   const resetProxy$ = xs.create()
 *   const props1 = {
 *     text:     'Signin',
 *     loading:  false,
 *     duration: duration,
 *     className:'test',
 *     easing:   tween.power2.easeOut
 *   }
 *   const props2 = {
 *     text:     'Loading...',
 *     loading:  true,
 *     duration: duration,
 *     easing:   tween.power2.easeIn
 *   }
 *   const props$ = fromDiagram('-a--------------------------------------------b--------------------------------------------a-')
 *     .map(x => x === 'a' ? props1 : props2)
 *     .compose(delay(1000))
 *   const {DOM, clicked$} = HttpButton(sources, xs.merge(props$, resetProxy$))
 *   resetProxy$.imitate(clicked$.mapTo(props1).compose(delay(4 * duration)))
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
