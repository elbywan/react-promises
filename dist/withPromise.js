function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { PromiseComponent } from './Promise';
export function withPromise(_ref) {
  var skip = _ref.skip,
      promise = _ref.promise,
      then = _ref.then,
      _ref$props = _ref.props,
      props = _ref$props === void 0 ? function (_) {
    return _;
  } : _ref$props;
  return function (Component) {
    return function (ownProps) {
      var children = function children(promiseProps) {
        var mixedProps = _objectSpread({}, ownProps, props(promiseProps, ownProps));

        return React.createElement(Component, mixedProps);
      };

      return React.createElement(PromiseComponent, _extends({
        skip: skip,
        promise: promise,
        render: children,
        then: then
      }, ownProps));
    };
  };
}
//# sourceMappingURL=withPromise.js.map