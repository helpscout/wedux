import * as React from 'react'
import {defaultStoreKey} from './utils'

type ProviderOptions = {
  storeKey?: string
  store?: any
}

const defaultOptions = {
  storeKey: defaultStoreKey,
  store: undefined,
}

export default function createProvider(
  options: ProviderOptions = defaultOptions,
) {
  const {storeKey, store} = {...defaultOptions, ...options}

  return class Provider extends React.Component<any> {
    static childContextTypes = {
      [storeKey]: () => {},
    }
    getChildContext() {
      return {[storeKey]: this.props.store || store}
    }
    render() {
      return React.Children.only(this.props.children)
    }
  }
}
