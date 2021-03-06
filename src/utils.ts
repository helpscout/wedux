export const defaultStoreKey = '__WEDUX_STORE__'

export function createUUIDFactory() {
  let index = 0
  return (namespace: string = defaultStoreKey): string => {
    return `${namespace}${index++}__`
  }
}

export const uuid = createUUIDFactory()

export function isFn(obj) {
  return typeof obj === 'function'
}
export function isString(obj) {
  return typeof obj === 'string'
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

// Bind an object/factory of actions to the store and wrap them.
export function mapActions(actions, store) {
  if (isFn(actions)) actions = actions(store)
  const mapped = {}
  for (let i in actions) {
    mapped[i] = store.action(actions[i])
  }
  return mapped
}

// select('foo,bar') creates a function of the form: ({ foo, bar }) => ({ foo, bar })
export function select(properties) {
  if (isString(properties)) properties = properties.split(/\s*,\s*/)
  return state => {
    const selected = {}
    for (let i = 0; i < properties.length; i++) {
      selected[properties[i]] = state[properties[i]]
    }
    return selected
  }
}
