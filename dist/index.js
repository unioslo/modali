"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useModali = exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

require("./modali.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Button = function Button(_ref) {
  var onClick = _ref.onClick,
      label = _ref.label,
      isStyleDefault = _ref.isStyleDefault,
      isStyleCancel = _ref.isStyleCancel,
      isStyleDestructive = _ref.isStyleDestructive;
  var buttonClass = (0, _classnames["default"])({
    'modali-button': true,
    'modali-button-cancel': isStyleCancel,
    'modali-button-default': isStyleDefault,
    'modali-button-destructive': isStyleDestructive
  });
  return _react["default"].createElement("button", {
    type: "button",
    className: buttonClass,
    onClick: onClick
  }, label);
};

Button.defaultProps = {
  isStyleDefault: false,
  isStyleCancel: false,
  isStyleDestructive: false
};
Button.propTypes = {
  onClick: _propTypes["default"].func.isRequired,
  label: _propTypes["default"].string.isRequired,
  isStyleDefault: _propTypes["default"].bool,
  isStyleCancel: _propTypes["default"].bool,
  isStyleDestructive: _propTypes["default"].bool
};

var Modal = function Modal(_ref2) {
  var isModalVisible = _ref2.isModalVisible,
      hide = _ref2.hide,
      options = _ref2.options,
      children = _ref2.children;

  function handleOverlayClicked(e) {
    if (e.target.className !== 'modali-wrapper') {
      return;
    }

    if (options === undefined) {
      hide();
    } else {
      if (options.overlayClose !== false) {
        hide();
      }

      if (options.onOverlayClicked) {
        options.onOverlayClicked();
      }
    }
  }

  function renderBody() {
    if (children) {
      return children;
    }

    if (options && options.message) {
      return _react["default"].createElement("div", {
        className: "modali-body-style"
      }, options.message);
    }

    return false;
  }

  function renderFooter() {
    var buttons = options.buttons;
    return _react["default"].createElement("div", {
      className: "modali-footer"
    }, buttons.map(function (button) {
      return _react["default"].createElement(_react["default"].Fragment, {
        key: button.key
      }, button.content);
    }));
  }

  var modaliWrapperClass = (0, _classnames["default"])({
    'modali-wrapper': true,
    'modali-wrapper-centered': options.centered
  });
  var modaliClass = (0, _classnames["default"])({
    modali: true,
    'modali-size-large': options.large,
    'modali-size-regular': !options.large,
    'modali-animated modali-animation-fade-in': options.animated
  });
  return isModalVisible ? _reactDom["default"].createPortal(_react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement("div", {
    className: "modali-overlay"
  }), _react["default"].createElement("div", {
    className: modaliWrapperClass,
    "aria-modal": true,
    "aria-hidden": true,
    tabIndex: -1,
    role: "dialog",
    onClick: handleOverlayClicked
  }, _react["default"].createElement("div", {
    className: modaliClass
  }, _react["default"].createElement("div", {
    className: "modali-content"
  }, options.closeButton === false ? null : _react["default"].createElement("div", {
    className: "modali-header"
  }, options.title !== undefined && _react["default"].createElement("div", {
    className: "modali-title"
  }, options.title), _react["default"].createElement("button", {
    type: "button",
    className: "modali-close-button",
    "data-dismiss": "modal",
    "aria-label": "Close",
    onClick: hide
  }, _react["default"].createElement("span", {
    "aria-hidden": "true"
  }, "\xD7"))), _react["default"].createElement("div", {
    className: "modali-body"
  }, renderBody()), options.buttons && options.buttons.length > 0 && renderFooter())))), document.body) : null;
};

Modal.propTypes = {
  isModalVisible: _propTypes["default"].bool.isRequired,
  hide: _propTypes["default"].func.isRequired,
  options: _propTypes["default"].shape({
    onShow: _propTypes["default"].func,
    onHide: _propTypes["default"].func,
    onEscapeKeyDown: _propTypes["default"].func,
    onOverlayClick: _propTypes["default"].func,
    title: _propTypes["default"].string,
    message: _propTypes["default"].string,
    buttons: _propTypes["default"].arrayOf(_propTypes["default"].exact({
      key: _propTypes["default"].string,
      content: _propTypes["default"].any
    })),
    closeButton: _propTypes["default"].bool,
    animated: _propTypes["default"].bool,
    centered: _propTypes["default"].bool,
    large: _propTypes["default"].bool,
    overlayClose: _propTypes["default"].bool,
    keyboardClose: _propTypes["default"].bool
  }).isRequired
};

var Modali = function Modali() {};

Modali.Button = Button;
Modali.Modal = Modal;
var _default = Modali;
exports["default"] = _default;

var useModali = function useModali() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      hasToggledBefore = _useState2[0],
      setHasToggledBefore = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isModalVisible = _useState4[0],
      setIsModalVisible = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isShown = _useState6[0],
      setIsShown = _useState6[1];

  var isModalVisibleRef = (0, _react.useRef)(isModalVisible);
  isModalVisibleRef.current = isModalVisible;
  var timeoutHack;

  function toggle() {
    timeoutHack = setTimeout(function () {
      setIsModalVisible(!isModalVisibleRef.current);
      clearTimeout(timeoutHack);
    }, 10);
    setIsShown(!isShown);
    setHasToggledBefore(true);
  }

  function handleKeyDown(event) {
    if (event.keyCode !== 27 || options.keyboardClose === false) return;
    toggle();

    if (options.onEscapeKeyDown) {
      options.onEscapeKeyDown();
    }
  }

  (0, _react.useEffect)(function () {
    if (isShown) {
      if (options.onShow) {
        options.onShow();
      }

      document.addEventListener('keydown', handleKeyDown);
      document.body.classList.add('modali-open');
    }

    if (!isShown && hasToggledBefore) {
      if (options.onHide) {
        options.onHide();
      }

      document.body.classList.remove('modali-open');
    }

    return function () {
      return document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isShown]);
  return [{
    isShown: isShown,
    isModalVisible: isModalVisible,
    hide: toggle,
    options: options
  }, toggle];
};

exports.useModali = useModali;