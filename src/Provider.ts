import * as React from 'react'

export class Provider extends React.Component<any> {
  getChildContext() {
    return {__WEDUX_STORE__: this.props.store}
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

export default Provider
