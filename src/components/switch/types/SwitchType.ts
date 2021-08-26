import { ReactNode } from "react";

export type SwitchType = {
    isChecked: boolean;
    onChange: () => void;
    icon?: ReactNode;
}

export type StyledCheckboxType = {
    checked: boolean;
};