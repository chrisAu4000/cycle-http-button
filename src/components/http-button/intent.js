
const intent = ({DOM}) => {
  return DOM
    .select('.submit')
    .events('click')
    .mapTo(true)
}
export default intent
