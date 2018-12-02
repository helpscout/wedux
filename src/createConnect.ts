import * as React from 'react'
import {assign, mapActions, select} from './utils'

type ComponentType = 'Component' | 'PureComponent'

export const CONTEXT_TYPES = {
  __WEDUX_STORE__: () => {},
}

export function createConnect(componentType: ComponentType = 'Component') {
  return function connect(mapStateToProps: any = null, actions: any = null) {
    if (typeof mapStateToProps !== 'function') {
      mapStateToProps = select(mapStateToProps || [])
    }
    return Child => {
      function Wrapper(props, context) {
        React[componentType].call(this, props, context)
        const store = context.__WEDUX_STORE__
        const boundActions = actions ? mapActions(actions, store) : {store}
        let state = mapStateToProps(store ? store.getState() : {}, props)
        const update = () => {
          const mapped = mapStateToProps(
            store ? store.getState() : {},
            this.props,
          )
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
          store && store.subscribe(update)
        }
        this.componentWillUnmount = () => {
          store && store.unsubscribe(update)
        }
        this.render = () =>
          React.createElement(
            Child,
            assign(assign(assign({}, boundActions), this.props), state),
          )
      }
      Wrapper.contextTypes = CONTEXT_TYPES
      return ((Wrapper.prototype = Object.create(
        React[componentType].prototype,
      )).constructor = Wrapper)
    }
  }
}

export default createConnect
