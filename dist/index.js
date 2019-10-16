"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = require("react");
var ReactDOM = require("react-dom");
var PropTypes = require("prop-types");
var classnames_1 = require("classnames");
require("./modali.css");
/**
 * The `<Modali.Button />` component provides a ready-to-go button component
 * that includes three separate styles of button: default, cancel, and destructive.
 */
var Button = function (_a) {
    var onClick = _a.onClick, label = _a.label, isStyleDefault = _a.isStyleDefault, isStyleCancel = _a.isStyleCancel, isStyleDestructive = _a.isStyleDestructive;
    var buttonClass = classnames_1.default({
        "modali-button": true,
        "modali-button-cancel": isStyleCancel,
        "modali-button-default": isStyleDefault,
        "modali-button-destructive": isStyleDestructive,
    });
    return (React.createElement("button", { type: "button", className: buttonClass, onClick: onClick }, label));
};
Button.defaultProps = {
    isStyleDefault: false,
    isStyleCancel: false,
    isStyleDestructive: false,
};
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    isStyleDefault: PropTypes.bool,
    isStyleCancel: PropTypes.bool,
    isStyleDestructive: PropTypes.bool,
};
/**
 * The `<Modali.Modal />` component provides a beautiful, WAI-ARIA accessible
 * modal dialog out of the box. Import it, add it to your component tree, pass
 * in the props object that you get from the useModali hook and you're all set.
 */
var Modal = function (_a) {
    var isModalVisible = _a.isModalVisible, hide = _a.hide, options = _a.options, children = _a.children;
    function handleOverlayClicked(e) {
        // @ts-ignore
        if (e.target.className !== "modali-wrapper") {
            return;
        }
        if (options === undefined) {
            hide();
        }
        else {
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
            return React.createElement("div", { className: "modali-body-style" }, options.message);
        }
        return false;
    }
    function renderFooter() {
        var _a = options.buttons, buttons = _a === void 0 ? [] : _a;
        return (React.createElement("div", { className: "modali-footer" }, buttons.map(function (button) { return (React.createElement(React.Fragment, { key: button.key }, button.content)); })));
    }
    var modaliWrapperClass = classnames_1.default({
        "modali-wrapper": true,
        "modali-wrapper-centered": options.centered,
    });
    var modaliClass = classnames_1.default({
        modali: true,
        "modali-size-large": options.large,
        "modali-size-regular": !options.large,
        "modali-animated modali-animation-fade-in": options.animated,
    });
    return isModalVisible
        ? ReactDOM.createPortal(React.createElement(React.Fragment, null,
            React.createElement("div", { className: "modali-overlay" }),
            React.createElement("div", { className: modaliWrapperClass, "aria-modal": true, "aria-hidden": true, tabIndex: -1, role: "dialog", onClick: handleOverlayClicked },
                React.createElement("div", { className: modaliClass },
                    React.createElement("div", { className: "modali-content" },
                        options.closeButton === false ? null : (React.createElement("div", { className: "modali-header" },
                            options.title !== undefined && (React.createElement("div", { className: "modali-title" }, options.title)),
                            React.createElement("button", { type: "button", className: "modali-close-button", "data-dismiss": "modal", "aria-label": "Close", onClick: hide },
                                React.createElement("span", { "aria-hidden": "true" }, "\u00D7")))),
                        React.createElement("div", { className: "modali-body" }, renderBody()),
                        options.buttons &&
                            options.buttons.length > 0 &&
                            renderFooter())))), document.body)
        : null;
};
Modal.propTypes = {
    isModalVisible: PropTypes.bool.isRequired,
    hide: PropTypes.func.isRequired,
    options: PropTypes.shape({
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        onEscapeKeyDown: PropTypes.func,
        onOverlayClick: PropTypes.func,
        title: PropTypes.string,
        message: PropTypes.string,
        buttons: PropTypes.arrayOf(PropTypes.exact({
            key: PropTypes.string,
            content: PropTypes.any,
        })),
        closeButton: PropTypes.bool,
        animated: PropTypes.bool,
        centered: PropTypes.bool,
        large: PropTypes.bool,
        overlayClose: PropTypes.bool,
        keyboardClose: PropTypes.bool,
    }).isRequired,
};
var Modali = function () { };
Modali.Button = Button;
Modali.Modal = Modal;
exports.default = Modali;
exports.useModali = function (options) {
    if (options === void 0) { options = {}; }
    var _a = __read(react_1.useState(false), 2), hasToggledBefore = _a[0], setHasToggledBefore = _a[1];
    var _b = __read(react_1.useState(false), 2), isModalVisible = _b[0], setIsModalVisible = _b[1];
    var _c = __read(react_1.useState(false), 2), isShown = _c[0], setIsShown = _c[1];
    var isModalVisibleRef = react_1.useRef(isModalVisible);
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
    var handleKeyDown = function (event) {
        if (event.keyCode !== 27 || options.keyboardClose === false)
            return;
        toggle();
        if (options.onEscapeKeyDown) {
            options.onEscapeKeyDown();
        }
    };
    react_1.useEffect(function () {
        if (isShown) {
            if (options.onShow) {
                options.onShow();
            }
            document.addEventListener("keydown", handleKeyDown);
            document.body.classList.add("modali-open");
        }
        if (!isShown && hasToggledBefore) {
            if (options.onHide) {
                options.onHide();
            }
            document.body.classList.remove("modali-open");
        }
        return function () { return document.removeEventListener("keydown", handleKeyDown); };
    }, [isShown]);
    return [
        {
            isShown: isShown,
            isModalVisible: isModalVisible,
            hide: toggle,
            options: options,
        },
        toggle,
    ];
};
