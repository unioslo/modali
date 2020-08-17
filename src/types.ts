/* eslint-disable @typescript-eslint/interface-name-prefix */
interface IModal {
  /**
   * Controls whether the modals is visible or not. Toggled by the toggle
   * modal function returned by `useModal`, or could be externally controlled
   */
  isModalVisible: boolean;

  /**
   * Hide the modal.
   */
  hide: () => void;

  /**
   * Options for the modal
   */
  options: IModalOptions;
}

export interface IModalProps extends IModal {
  /**
   * React components to be shown in the body of the modal
   */
  children?: React.ReactNode;
}

/**
 * An object containing props which must be passed into the Modali component.
 */
export interface IModalHook<T> extends IModal {
  /**
   * Telling whether the modal is visible or not.
   */
  isShown: boolean;

  /**
   * An optional payload that can be sent to the modal toggle function and
   * passed forward
   */
  payload?: T;
}

export interface IModalOptions {
  /**
   * Called before the component is shown
   */
  onShow?: (() => void) | null;

  /**
   * Called before the component is hidden
   */
  onHide?: (() => void) | null;

  /**
   * Called before the component is removed from the DOM
   */
  onUnmount?: (() => void) | null;

  /**
   * Called when the escape key is pressed while the component is mounted to the DOM
   */
  onEscapeKeyDown?: (() => void) | null;

  /**
   * Called when the modal overlay back is clicked while the component is mounted to the DOM
   */
  onOverlayClicked?: (() => void) | null;

  /**
   * The text displayed in the upper left corner
   */
  title?: string | null;

  /**
   * The text displayed in the body of the modal
   */
  message?: string | null;

  /**
   * Displays whatever is passed in in the footer
   */
  buttons?: { key: string; content: any }[] | null;

  /**
   * Controls the visibility of the close button
   */
  closeButton?: boolean | null;

  /**
   * Fades in the modal when it mounts to the DOM
   */
  animated?: boolean | null;

  /**
   * Positions the modal in the center of the screen
   */
  centered?: boolean | null;

  /**
   * Changes the size of the modal to be 800px wide
   */
  large?: boolean | null;

  /**
   * Disables clicking the modal overlay to hide it
   */
  overlayClose?: boolean | null;

  /**
   * Disables the ESC key hiding the modal
   */
  keyboardClose?: boolean | null;

  /**
   * The element that the modal should be loaded into. This will select
   * `document.body` as default, but if you for example want the modal to load
   * into an iframe you will want to provide the `body` for that iframe.
   */
  mountElement?: Element | null;

  /**
   * Offset from top of `mountElement`
   */
  offsetTop?: number | null;
}

export interface IButtonProps {
  /**
   * String that is shown on the button
   */
  label: string;

  /**
   * Pass in this prop as true to show the default button
   */
  isStyleDefault?: boolean;

  /**
   * Pass in this prop as true to show a cancel button
   */
  isStyleCancel?: boolean;

  /**
   * Pass in this prop as true to show a delete button
   */
  isStyleDestructive?: boolean;

  /**
   * Called when the button is clicked
   */
  onClick: () => void;
}

/**
 * Function to toggle visibility of the modali component
 */
export type toggleModaliComponent<T> = (toggleOptions?: {
  payload?: T;
  options?: IModalOptions;
}) => void;

/**
 * The `<Modali.Modal />` component provides a beautiful, WAI-ARIA accessible
 * modal dialog out of the box. Import it, add it to your component tree, pass
 * in the props object that you get from the useModali hook and you're all set.
 */
export type Modal = React.FC<IModalProps>;

/**
 * The `<Modali.Button />` component provides a ready-to-go button component
 * that includes three separate styles of button: default, cancel, and destructive.
 */
export type Button = React.FC<IButtonProps>;
