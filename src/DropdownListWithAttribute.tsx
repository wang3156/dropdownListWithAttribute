import { ReactElement, createElement } from "react";
import { CSelect } from "./components/CSelect"

import { DropdownListWithAttributeContainerProps } from "../typings/DropdownListWithAttributeProps";

import "./ui/DropdownListWithAttribute.css";

export function DropdownListWithAttribute(props: DropdownListWithAttributeContainerProps): ReactElement {
    return <CSelect {...props} />;
}
