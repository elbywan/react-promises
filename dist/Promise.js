function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import React, { Component } from 'react';
export var PromiseComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(PromiseComponent, _Component);

  function PromiseComponent(props) {
    var _this;

    _classCallCheck(this, PromiseComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PromiseComponent).call(this, props));
    _this.state = {
      pending: true,
      error: null,
      result: null,
      skipped: false
    };

    _this.setInitialState(props);

    _this.__promiseComponent = true;
    return _this;
  }

  _createClass(PromiseComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.onInitAndUpdate();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.__unmounted = true;
    }
  }, {
    key: "setState",
    value: function setState() {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (!this.__unmounted) (_get2 = _get(_getPrototypeOf(PromiseComponent.prototype), "setState", this)).call.apply(_get2, [this].concat(args));
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps !== this.props) this.onInitAndUpdate();
    }
  }, {
    key: "onInitAndUpdate",
    value: function onInitAndUpdate() {
      if (!this.props.promise) {
        throw new Error('Promise function is missing.');
      }

      if (!this.props.skip || typeof this.props.skip === 'function' && !this.props.skip(this.props)) {
        this.executePromise();
      } else {
        this.setState({
          pending: false,
          skipped: true
        });
      }
    }
  }, {
    key: "setInitialState",
    value: function setInitialState(props) {
      var initialValue = props.initialValue,
          then = props.then;
      if (!initialValue) return;
      this.state.pending = false;

      if (typeof then === 'function') {
        this.state.result = then(initialValue);
      } else {
        this.state.result = initialValue;
      }
    }
  }, {
    key: "executePromise",
    value: function executePromise() {
      var _this2 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$mixin = _ref.mixin,
          mixin = _ref$mixin === void 0 ? false : _ref$mixin,
          _ref$replayed = _ref.replayed,
          replayed = _ref$replayed === void 0 ? false : _ref$replayed;

      var _this$props = this.props,
          promise = _this$props.promise,
          then = _this$props.then;
      var _this$state = this.state,
          pending = _this$state.pending,
          skipped = _this$state.skipped;

      if (!pending || skipped) {
        this.setState({
          pending: true,
          skipped: false
        });
      }

      this._backedOptions = mixin ? _objectSpread({}, this._backedOptions, options) : options;
      return promise(mixin ? this._backedOptions : options, {
        replayed: replayed
      }).then(function (result) {
        if (typeof then === 'function') {
          result = then(result);
        }

        _this2.setState({
          result: result,
          error: null,
          pending: false
        });

        return result;
      }).catch(function (error) {
        _this2.setState({
          error: error,
          result: null,
          pending: false
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var pending = this.state.pending;
      var render = this.props.render;

      if (pending === null) {
        return null;
      }

      return render(_objectSpread({}, this.state, {
        replay: function replay(options) {
          var mixin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
          return _this3.executePromise.bind(_this3)(options, {
            mixin: mixin,
            replayed: true
          });
        }
      }));
    }
  }]);

  return PromiseComponent;
}(Component);
PromiseComponent.displayName = 'PromiseComponent';
//# sourceMappingURL=Promise.js.map