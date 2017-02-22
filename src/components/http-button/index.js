import intent from './intent'
import model from './model'
import view from './view'
/**
 * Displays a Button that is able to be shown as button or as loading spinner.
 * @param {Object} sources - Source streams.
 * @param {DOMSource} sources.DOM - DOMDriver to select elements and invoke events.
 * @param {Object} props - Contains the initial state of the HttpButton.
 * @param {Stream} props.text$ - Stream of Strings that will be displayed as button text.
 * @param {Stream} props.loading$ - Stream of Booleans true if button is in loading state.
 * @param {Stream} props.duration$ - Transition duration.
 * @param {String} [props.className] - Additional className.
 * @param {Function} [props.easing = linear ease] - xstream/extra/tween easing function.
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
