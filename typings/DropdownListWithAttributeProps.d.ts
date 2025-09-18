/**
 * This file was generated from DropdownListWithAttribute.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { EditableValue, ListValue, ListAttributeValue, ListExpressionValue, ReferenceValue, ReferenceSetValue } from "mendix";
import { Big } from "big.js";

export type BindTypeEnum = "BindAttribute" | "BindAssociation";

export interface DropdownListWithAttributeContainerProps {
    name: string;
    tabIndex?: number;
    id: string;
    BindType: BindTypeEnum;
    BindAttr: EditableValue<string | Big>;
    BindAsso: ReferenceValue | ReferenceSetValue;
    Options: ListValue;
    Op_Key: ListAttributeValue<string | Big>;
    Op_Label: ListExpressionValue<string>;
    Can_Search: boolean;
    InputAttr?: EditableValue<string>;
}

export interface DropdownListWithAttributePreviewProps {
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    BindType: BindTypeEnum;
    BindAttr: string;
    BindAsso: string;
    Options: {} | { caption: string } | { type: string } | null;
    Op_Key: string;
    Op_Label: string;
    Can_Search: boolean;
    InputAttr: string;
    OnSelectChange: {} | null;
}
