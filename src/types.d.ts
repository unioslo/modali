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
  children?: React.ReactNode;
}

/**
 * Function to toggle visibility of the modali component
 */
export type toggleModaliComponent = () => void;

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
   * Called when the component finishes mounting to the DOM
   */
  onShow?: () => void;

  /**
   * Called when the component is removed from the DOM
   */
  onHide?: () => void;

  /**
   * Called when the escape key is pressed while the component is mounted to the DOM
   */
  onEscapeKeyDown?: () => void;

  /**
   * Called when the modal overlay back is clicked while the component is mounted to the DOM
   */
  onOverlayClicked?: () => void;

  /**
   * The text displayed in the upper left corner
   */
  title?: string;

  /**
   * The text displayed in the body of the modal
   */
  message?: string;

  /**
   * Displays whatever is passed in in the footer
   */
  buttons?: { key: string; content: any }[];

  /**
   * Controls the visibility of the close button
   */
  closeButton?: boolean;

  /**
   * Fades in the modal when it mounts to the DOM
   */
  animated?: boolean;

  /**
   * Positions the modal in the center of the screen
   */
  centered?: boolean;

  /**
   * Changes the size of the modal to be 800px wide
   */
  large?: boolean;

  /**
   * Disables clicking the modal overlay to hide it
   */
  overlayClose?: boolean;

  /**
   * Disables the ESC key hiding the modal
   */
  keyboardClose?: boolean;
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
