import connect from './connect'

export default function connectWithStore(
  mapStateToProps: any = null,
  actions: any = null,
  mergedProps: Object = {},
  options: any = {},
) {
  return connect(
    mapStateToProps,
    actions,
    mergedProps,
    {...options, withStore: true},
  )
}
