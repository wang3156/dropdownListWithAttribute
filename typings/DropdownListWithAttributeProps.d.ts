/**
 * This file was generated from DropdownListWithAttribute.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { EditableValue, ListValue, ListAttributeValue, ListExpressionValue } from "mendix";
import { Big } from "big.js";

export interface DropdownListWithAttributeContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    BindAttr: EditableValue<string | Big>;
    Options: ListValue;
    Op_Key: ListAttributeValue<string | Big>;
    Op_Label: ListExpressionValue<string>;
    Can_Search: boolean;
}

export interface DropdownListWithAttributePreviewProps {
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    BindAttr: string;
    Options: {} | { caption: string } | { type: string } | null;
    Op_Key: string;
    Op_Label: string;
    Can_Search: boolean;
    InputChange: {} | null;
}
