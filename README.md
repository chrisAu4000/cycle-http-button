# cycle-http-button
Displays a Button that is able to be shown as button or as loading spinner.
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

