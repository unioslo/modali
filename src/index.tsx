/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as PropTypes from "prop-types";
import classNames from "classnames";
//import "./modali.css";

import {
  Button as ButtonType,
  Modal as ModalType,
  IButtonProps,
  IModalProps,
  IModalOptions,
  IModalHook,
  toggleModaliComponent,
} from "./types";

/**
 * The `<Modali.Button />` component provides a ready-to-go button component
 * that includes three separate styles of button: default, cancel, and destructive.
 */
const Button: ButtonType = ({
  onClick,
  label,
  isStyleDefault,
  isStyleCancel,
  isStyleDestructive,
}: IButtonProps): React.ReactElement => {
  const buttonClass = classNames({
    "modali-button": true,
    "modali-button-cancel": isStyleCancel,
    "modali-button-default": isStyleDefault,
    "modali-button-destructive": isStyleDestructive,
  });
  return (
    <button type="button" className={buttonClass} onClick={onClick}>
      {label}
    </button>
  );
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
const Modal: ModalType = ({
  isModalVisible,
  hide,
  options,
  children,
}: IModalProps): React.ReactPortal | null => {
  function handleOverlayClicked(e: React.MouseEvent<HTMLElement>): void {
    // @ts-ignore
    if (e.target.className !== "modali-wrapper") {
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

  function renderBody(): React.ReactNode {
    if (children) {
      return children;
    }
    if (options && options.message) {
      return <div className="modali-body-style">{options.message}</div>;
    }
    return null;
  }

  function renderFooter(): React.ReactNode {
    const { buttons = [] } = options;

    return (
      <div className="modali-footer">
        {buttons?.map((button) => (
          <React.Fragment key={button.key}>{button.content}</React.Fragment>
        ))}
      </div>
    );
  }

  const modaliWrapperClass = classNames({
    "modali-wrapper": true,
    "modali-wrapper-centered": options.centered,
  });

  const modaliClass = classNames({
    modali: true,
    "modali-size-large": options.large,
    "modali-size-regular": !options.large,
    "modali-animated modali-animation-fade-in": options.animated,
  });

  return isModalVisible
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="modali-overlay" />
          <div
            className={modaliWrapperClass}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
            onClick={handleOverlayClicked}
          >
            <div className={modaliClass} style={{ top: options?.offsetTop ?? undefined }}>
              <div className="modali-content">
                {options.closeButton === false ? null : (
                  <div className="modali-header">
                    {options.title !== undefined && (
                      <div className="modali-title">{options.title}</div>
                    )}
                    <button
                      type="button"
                      className="modali-close-button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={hide}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
                <div className="modali-body">{renderBody()}</div>
                {options.buttons &&
                  options.buttons.length > 0 &&
                  renderFooter()}
              </div>
            </div>
          </div>
        </React.Fragment>,
        options.mountElement || document.body,
      )
    : null;
};

Modal.propTypes = {
  isModalVisible: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  options: PropTypes.shape({
    onShow: PropTypes.func,
    onHide: PropTypes.func,
    onEscapeKeyDown: PropTypes.func,
    onOverlayClicked: PropTypes.func,
    title: PropTypes.string,
    message: PropTypes.string,
    buttons: PropTypes.arrayOf(
      PropTypes.exact({
        key: PropTypes.string.isRequired,
        content: PropTypes.any.isRequired,
      }).isRequired,
    ),
    closeButton: PropTypes.bool,
    animated: PropTypes.bool,
    centered: PropTypes.bool,
    large: PropTypes.bool,
    overlayClose: PropTypes.bool,
    keyboardClose: PropTypes.bool,
    mountElement: PropTypes.any,
    offsetTop: PropTypes.number,
  }).isRequired,
};

const Modali: { Button: ButtonType; Modal: ModalType } = {
  Button,
  Modal,
};
export default Modali;

export const useModali = <T extends Record<string, unknown>>(
  modalOptions: IModalOptions = {},
): [IModalHook<T>, toggleModaliComponent<T>] => {
  const [hasToggledBefore, setHasToggledBefore] = useState(false);
  const [payload, setPayload] = useState<T>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [options, setOptions] = useState<IModalOptions>(modalOptions);
  const isModalVisibleRef = useRef(isModalVisible);
  isModalVisibleRef.current = isModalVisible;
  let timeoutHack: NodeJS.Timeout;

  function toggle({
    payload,
    options: updatedOptions,
  }: { payload?: T; options?: IModalOptions } = {}): void {
    timeoutHack = setTimeout(() => {
      if (updatedOptions !== undefined) {
        setOptions({ ...options, ...updatedOptions });
      }
      if (payload !== undefined) {
        setPayload(payload);
      }
      setIsModalVisible(!isModalVisibleRef.current);
      clearTimeout(timeoutHack);
    }, 10);
    setIsShown(!isShown);
    setHasToggledBefore(true);
  }

  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.keyCode !== 27 || options.keyboardClose === false) return;
    toggle();
    if (options.onEscapeKeyDown) {
      options.onEscapeKeyDown();
    }
  };

  useEffect(() => {
    const currentDocument = options.mountElement?.ownerDocument ?? document;
    if (isShown) {
      if (options.onShow) {
        options.onShow();
      }
      currentDocument.addEventListener("keydown", handleKeyDown, true);
      currentDocument.body.classList.add("modali-open");
    }
    if (!isShown && hasToggledBefore) {
      if (options.onHide) {
        options.onHide();
      }
      currentDocument.body.classList.remove("modali-open");
    }
    return () => {
      currentDocument.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isShown]);

  return [
    {
      payload,
      isShown,
      isModalVisible,
      hide: toggle,
      options,
    },
    toggle,
  ];
};
