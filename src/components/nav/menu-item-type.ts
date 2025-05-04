import { ReactElement } from "react";

export type TMenuItem = {
    text : string,
    path : string,
    icon? : string | ReactElement,
}