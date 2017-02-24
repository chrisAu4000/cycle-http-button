import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'
import concat from 'xstream/extra/concat'
import fromDiagram from 'xstream/extra/fromDiagram'
import HttpButton from './components/http-button'

function main(sources) {
  const duration = 250
  const resetProxy$ = xs.create()
  const props1 = {
    text:     'Signin',
    loading:  false,
    duration: duration,
    className:'test',
    easing:   tween.power2.easeOut
  }
  const props2 = {
    text:     'Loading...',
    loading:  true,
    duration: duration,
    easing:   tween.power2.easeIn
  }
  const props$ = fromDiagram('-a--------------------------------------------b--------------------------------------------a-')
    .map(x => x === 'a' ? props1 : props2)
    .compose(delay(1000))
  const {DOM, clicked$} = HttpButton(sources, xs.merge(props$, resetProxy$))
  resetProxy$.imitate(clicked$.mapTo(props1).compose(delay(4 * duration)))
  return {
    DOM: DOM
  }
}

export default main
