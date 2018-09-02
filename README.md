# react-promises

#### A declarative way of handling promises in React

## Setup

### Npm

```bash
npm i react-promises
```

```js
import { withPromise, Promise } from 'react-promises'
```

### Script tag

```html
<script src="https://unpkg.com/react-promises"></script>
```

```js
const { withPromise, Promise } = window['react-promises']
```

## Usage

### Component

```js
<Promise
    // A function returning a promise result.
    promise={ props => promise }
    // An optional transform function applied to the result.
    // If set, the 'result' prop will be equal to the returned value.
    then={ result => transformedResult }
    // A boolean or a function returning a boolean.
    // If true, the promise will not get executed.
    skip={
        props => boolean
        // OR
        boolean
    }
    // Renders the component children.
    // Pending: true if the promise is pending, otherwise false
    // Error: if the promise threw an error then set with the error value, otherwise null
    // Result: the result of the promise if it succeeded
    // Skipped: true if the promise was skipped
    render={ ({ pending, error, result, skipped }) => children }
/>
```

### Higher Order Component


```js
withPromise({
    // See above
    skip:
        props => boolean
        //OR
        boolean,
    // See above
    promise: props => promise,
    // See above
    then: result => transformedResult,
    // Allows aliasing the props.
    // Returns a new props object.
    props: ({ pending, error, result, skipped }) => transformedProps
})(WrappedComponent)
```
