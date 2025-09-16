import { ReactElement, createElement } from "react";

import { DropdownListWithAttributePreviewProps } from "../typings/DropdownListWithAttributeProps";


export function preview(values: DropdownListWithAttributePreviewProps): ReactElement {

    var objectsDatasources = values.Options;
    var contenName = function () {
        if (objectsDatasources && "caption" in objectsDatasources) {
            return objectsDatasources.caption;
        } else {
            return "[dataSource : Entity List]";

        }
    }();
    return <div className="css_DropdownListWithAttribute_Preview">
        <select>
            <option selected>{contenName}</option>
        </select>
    </div>;
}

export function getPreviewCss(): string {
    return require("./ui/DropdownListWithAttribute.css");
}
