
const intent = ({DOM}) => {
  return DOM
    .select('.submit')
    .events('click')
    .mapTo(null)
}
export default intent
