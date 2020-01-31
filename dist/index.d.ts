import * as React from "react";
import { IButtonProps, IModalProps, IModalOptions, IModalHook, toggleModaliComponent } from "./types";
declare const Modali: {
    (): void;
    Button: React.FunctionComponent<IButtonProps>;
    Modal: React.FunctionComponent<IModalProps>;
};
export default Modali;
export declare const useModali: <T extends {}>(modalOptions?: IModalOptions) => [IModalHook<T>, toggleModaliComponent<T>];
