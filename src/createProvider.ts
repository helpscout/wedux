import * as React from 'react'
import {defaultStoreKey} from './utils'

const defaultOptions = {
  storeKey: defaultStoreKey,
}

export default function createProvider(options = defaultOptions) {
  const {storeKey} = {...defaultOptions, ...options}

  return class Provider extends React.Component<any> {
    static childContextTypes = {
      [storeKey]: () => {},
    }
    getChildContext() {
      return {[storeKey]: this.props.store}
    }
    render() {
      return React.Children.only(this.props.children)
    }
  }
}
