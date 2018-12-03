import * as React from 'react'
import {defaultStoreKey} from './utils'

export class Provider extends React.Component<any> {
  static childContextTypes = {
    [defaultStoreKey]: () => {},
  }
  getChildContext() {
    return {[defaultStoreKey]: this.props.store}
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

export default Provider
