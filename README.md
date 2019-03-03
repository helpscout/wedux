# Wedux

[![Build Status](https://travis-ci.org/helpscout/wedux.svg?branch=master)](https://travis-ci.org/helpscout/wedux)
[![npm version](https://badge.fury.io/js/%40helpscout%2Fwedux.svg)](https://badge.fury.io/js/%40helpscout%2Fwedux)

> Like Redux + React-Redux, but tiny :)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [createUniqueStore](#createuniquestore)
- [Thanks](#thanks)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features

- **Zero dependencies**!
- Super tiny, at ~1.5KB gzipped
- Perfect for library use

## Installation

Add `wedux` to your project via `npm install`:

```
npm install --save @helpscout/wedux
```

## Usage

Out of the box, Wedux works just like [Unistore](https://github.com/developit/unistore):

```js
import createStore, { Provider, connect } from '@helpscout/wedux'
```

### createUniqueStore

This is a special feature that allows you to create stores (with associating `Provider`/`connect` components) with **guaranteed** unique store keys. This is important if you plan on creating **multiple** nested stores. This is especially good for libraries, as it guarantees that the library's Wedux components don't clash with the integrated application Wedux components.

**`createUniqueStore(reducer, enhancer, namespace)`**

| Argument  | Type                | Description                                                            |
| --------- | ------------------- | ---------------------------------------------------------------------- |
| reducer   | `Object`/`Function` | Reducer/initialState for the store.                                    |
| enhancer  | `Object`            | Store enhancer, like `applyMiddleware`.                                |
| namespace | `string`            | A custom namespace for the store (`context`). It will still be unique. |

**Example**

```jsx
import { createUniqueStore } from '@helpscout/wedux'

const libStore = createUniqueStore()
const appStore = createUniqueStore()

const Bob = ({ makeBurger }) => (
  <button onClick={makeBurger}>Make Burger</button>
)

const makeBurger = store => {
  return {
    didMakeBurgers: !store.didMakeBurgers,
  }
}

const ConnectedBob = libStore.connect(null, { makeBurger })(Bob)

class App extends React.Component {
  render() {
    return (
      <appStore.Provider>
        <div>
          ...
          <libStore.Provider>
            <ConnectedBob />
          </libStore.Provider>
          ...
        </div>
      </appStore.Provider>
    )
  }
}
```

## Thanks

Thanks to [developit](https://github.com/developit) for creating [Unistore](https://github.com/developit/unistore), which this library is based on. And of course, the lovely folks at [Redux](https://github.com/reduxjs/redux).
