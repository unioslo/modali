import { Button as ButtonType, Modal as ModalType, IModalOptions, IModalHook, toggleModaliComponent } from "./types";
declare const Modali: {
    Button: ButtonType;
    Modal: ModalType;
};
export default Modali;
export declare const useModali: <T extends {}>(modalOptions?: IModalOptions) => [IModalHook<T>, toggleModaliComponent<T>];
