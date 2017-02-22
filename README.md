<a name="HttpButton"></a>

## HttpButton(sources, props) ⇒ <code>Object</code>
Displays a Button that is able to be shown as button or as loading spinner.

**Kind**: global function  
**Returns**: <code>Object</code> - {
   DOM :: vtree,
   clicked$ :: Stream
}  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| sources | <code>Object</code> |  | Source streams. |
| sources.DOM | <code>DOMSource</code> |  | DOMDriver to select elements and invoke events. |
| props | <code>Object</code> |  | Contains the initial state of the HttpButton. |
| props.text$ | <code>Stream</code> |  | Stream of Strings that will be displayed as button text. |
| props.loading$ | <code>Stream</code> |  | Stream of Booleans true if button is in loading state. |
| props.duration$ | <code>Stream</code> |  | Transition duration. |
| [props.className] | <code>String</code> |  | Additional className. |
| [props.easing] | <code>function</code> | <code>linear ease</code> | xstream/extra/tween easing function. |

**Example** *(app.js)*  
```js
import {run} from '@cycle/xstream-run'
import {makeDOMDriver} from '@cycle/dom'
import xs from 'xstream'
import delay from 'xstream/extra/delay'
import tween from 'xstream/extra/tween'

function main (sources) {
  const duration        = 250
  const textProxy$      = xs.create()
  const resetTextProxy$ = xs.create()
  const loadProxy$      = xs.create()
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

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
```
**Example** *(index.html)*  
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" href="icon.ico" sizes="16x16" type="image/vnd.microsoft.icon">
  <link rel="stylesheet" href="/build/main.css">
  <title>Title</title>
</head>
<body>
  <div id="app"></div>
</body>
<script src="app.js"></script>
</html>
```
