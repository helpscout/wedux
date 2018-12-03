import * as React from 'react'
import {mapActions, select, defaultStoreKey, isFn} from './utils'

export type Options = {
  pure: boolean
  withStore: boolean
  store?: any
}

const defaultOptions = {
  pure: true,
  withStore: false,
}

export function createConnect(
  mapStateToProps: any = null,
  actions: any = null,
  mergedProps: Object = {},
  options: any = defaultOptions,
): any {
  const {pure, withStore, store: providedStore} = {
    ...defaultOptions,
    ...options,
  } as Options
  if (!isFn(mapStateToProps)) {
    mapStateToProps = select(mapStateToProps || [])
  }

  const OuterBaseComponent = pure ? React.PureComponent : React.Component

  return Child => {
    const wrappedComponentName = Child.displayName || Child.name || 'Component'

    function Wrapper(props, context) {
      OuterBaseComponent.call(this, props, context)

      const store = providedStore || context[defaultStoreKey]
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
      this.render = () => {
        const connectedMergedProps = {
          ...{...boundActions},
          ...this.props,
          ...state,
          ...mergedProps,
        }
        const {store, ...propsWithoutStore} = connectedMergedProps
        const preparedProps = withStore
          ? connectedMergedProps
          : propsWithoutStore

        return React.createElement(Child, {...preparedProps, ...mergedProps})
      }
    }

    Wrapper.displayName = `Connect(${wrappedComponentName})`
    Wrapper.contextTypes = {
      [defaultStoreKey]: () => {},
    }

    return ((Wrapper.prototype = Object.create(
      OuterBaseComponent.prototype,
    )).constructor = Wrapper)
  }
}

export default createConnect
