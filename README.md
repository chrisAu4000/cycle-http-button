<a name="HttpButton"></a>

## HttpButton(sources, props) ⇒ <code>Object</code>
Displays a Button that is able to be shown as button or as loading spinner.
Instalation:
```bash
$ npm install --save git+https://github.com/chrisAu4000/cycle-http-button.git
```

**Kind**: global function  
**Returns**: <code>Object</code> - {
   DOM :: vtree,
   clicked$ :: Stream
}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sources | <code>Object</code> |  | Source streams. |
| sources.DOM | <code>DOMSource</code> |  | DOMDriver to select elements and invoke events. |
| props | <code>Stream</code> |  | Contains the initial state of the HttpButton. |
| props.text | <code>String</code> |  | Stream of Strings that will be displayed as button text. |
| props.loading | <code>Boolean</code> |  | Stream of Booleans true if button is in loading state. |
| props.duration | <code>Number</code> |  | Transition duration. |
| [props.className] | <code>String</code> |  | Additional className. |
| [props.easing] | <code>function</code> | <code>linear ease</code> | xstream/extra/tween easing function. |

**Example** *(app.js)*  
```js
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

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
```
