import {div, button, h} from '@cycle/dom'
import {compose, curry} from 'ramda'

const reverse = transition => Math.abs(transition - 100)
const till = curry((till, transition) => transition / (100 / till))
const revTill = curry((to, transition) => compose(till(to), reverse)(transition))
const isLoading = transition => transition !== 100
const after = curry((fn, def, x, transition) => transition < x ? fn(transition) : def)

const view = (state$) => {
  return state$.map(({text, transition, className}) => {
    const width  =  5 + transition * 0.95
    const radius = 50 - transition * 0.47
    const opacityButton = after((t) => t / 20, 1, 20, transition)
    const opacitySpinner = after((t) => t / 90, 1, 90, reverse(transition))
    const height = 0.4 * transition
    const cName = className ?  '.' + className : ''
    return div('.http-button', { style: { 'display': 'flex' } }, [
      button('.submit' + cName, {
        attrs: {},
        style: {
          'position': 'relative',
          'cursor': isLoading(transition) ? 'default' : 'pointer',
          'margin': isLoading(transition) ? '0 auto'  : '0 0',
          'width' : transition + '%',
          'border-radius': isLoading(transition) ? radius + '%' : '3px',
          'opacity': opacityButton,
        }
      },[
        text
      ]),
      h('svg', {
        attrs: {
          class: 'spinner',
          viewBox: '0 0 39 39',
          xmlns: 'http://www.w3.org/2000/svg'
        },
        style: {
          'opacity': opacitySpinner,
          'cursor': 'default'
        }
      }, [
        h('circle', {
          attrs: {
            'class': 'path',
            'fill': 'none',
            'stroke-width': '6',
            'stroke-linecap': 'round',
            'cx': '19',
            'cy': '19',
            'r': revTill(16, transition) + 'px'
          }
        })
      ])
    ])
  })
}

export default view
