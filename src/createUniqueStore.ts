import createStore from './createStore'
import { uuid } from './utils'
import createProvider from './createProvider'
import connect from './connect'

function createUniqueStore(reducer?, enhancer?, namespace?: string) {
  const store = createStore(reducer, enhancer)
  const storeKey = uuid(namespace)

  function uniqueConnect(
    mapStateToProps: any = null,
    actions: any = null,
    mergedProps: Object = {},
    options: any = {},
  ) {
    return connect(
      mapStateToProps,
      actions,
      mergedProps,
      { ...options, store },
    )
  }

  return {
    store,
    Provider: createProvider({ storeKey }),
    connect: uniqueConnect,
  }
}

export default createUniqueStore
