import connect from './connect'

export default function connectWithStore(
  mapStateToProps: any = null,
  actions: any = null,
  mergedProps: Object = {},
  options: any = {},
) {
  const connectOptions = {...options, withStore: true}

  return connect(
    mapStateToProps,
    actions,
    mergedProps,
    connectOptions,
  )
}
