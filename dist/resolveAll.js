import reactTreeWalker from 'react-tree-walker';
import { PromiseComponent } from './Promise';

function visitor(_ref) {
  var before = _ref.before,
      after = _ref.after;
  return function (element, instance) {
    if (instance && instance.__promiseComponent === true && typeof instance.executePromise === 'function') {
      before && before(instance);
      return instance.executePromise().then(function (_) {
        after && after(_, instance);
        return true;
      });
    }

    return Promise.resolve(true);
  };
}

export function resolveAll(app) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      before = _ref2.before,
      after = _ref2.after;

  return reactTreeWalker(app, visitor({
    before: before,
    after: after
  }));
}
//# sourceMappingURL=resolveAll.js.map