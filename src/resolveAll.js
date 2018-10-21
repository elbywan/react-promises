import reactTreeWalker from 'react-tree-walker'
import { PromiseComponent } from './Promise'

function visitor({ before, after }) {
    return function (element, instance) {
        if (instance && instance.__promiseComponent === true && typeof instance.executePromise === 'function') {
            before && before(instance)
            return instance.executePromise().then(_ => {
                after && after(_, instance)
                return true
            })
        }
        return Promise.resolve(true)
    }
}

export function resolveAll(app, { before, after } = {}) {
    return reactTreeWalker(app, visitor({ before, after }))
}