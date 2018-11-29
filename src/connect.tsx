import * as React from 'react'
import {assign, mapActions, select} from './utils'

const CONTEXT_TYPES = {
  store: () => {},
}

export function connect(mapStateToProps, actions) {
  if (typeof mapStateToProps !== 'function') {
    mapStateToProps = select(mapStateToProps || [])
  }
  return Child => {
    function Wrapper(props, context) {
      React.Component.call(this, props, context)
      let {store} = context
      let state = mapStateToProps(store ? store.getState() : {}, props)
      let boundActions = actions ? mapActions(actions, store) : {store}
      let update = () => {
        let mapped = mapStateToProps(store ? store.getState() : {}, this.props)
        for (let i in mapped)
          if (mapped[i] !== state[i]) {
            state = mapped
            return this.forceUpdate()
          }
        for (let i in state)
          if (!(i in mapped)) {
            state = mapped
            return this.forceUpdate()
          }
      }
      this.componentDidMount = () => {
        store.subscribe(update)
      }
      this.componentWillUnmount = () => {
        store.unsubscribe(update)
      }
      this.render = () =>
        React.createElement(
          Child,
          assign(assign(assign({}, boundActions), this.props), state),
        )
    }
    Wrapper.contextTypes = CONTEXT_TYPES
    return ((Wrapper.prototype = Object.create(
      React.Component.prototype,
    )).constructor = Wrapper)
  }
}

export default connect
