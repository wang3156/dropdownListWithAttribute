import React, { ReactElement, createElement, useRef, useState } from "react";
import { DropdownListWithAttributeContainerProps } from "../../typings/DropdownListWithAttributeProps";
import { ObjectItem } from "mendix";

let options: DropdownListWithAttributeContainerProps;
let pre_val_input: string | undefined;
let showList = false;
export function CSelect(props: DropdownListWithAttributeContainerProps): ReactElement {
    options = props;


    const inputRef = useRef<HTMLInputElement>(null);
    const [searchText, setSearchText] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<ObjectItem[] | undefined>(options.Options.items);

    React.useEffect(() => {
        var data = options.Options.items?.filter(it => (options.Op_Label.get(it).value?.toLocaleLowerCase()?.indexOf(searchText.toLocaleLowerCase()) ?? -1) > -1);
        setSearchResults(data);
    }, [searchText, options]);


    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

    const renderList = () => {
        if (!searchResults) {
            return;
        }
        return searchResults.map((item, index) => {
            return (React.createElement("li", {
                key: index, id: `content-li${index}`, className: "listItem", onClick: () => {
                    onSelectLi(item);
                }, "data-index": index
            }, options.Op_Label.get(item).value));
        });
    };

    const stop_prop = (e: any) => {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }

    var other_close = () => {
        stop_prop(event);
        if (event?.target == inputRef.current || !showList) return;
        onInput_SelectList();
    }

    const onInput_SelectList = () => {
        stop_prop(event);
        if (!inputRef.current) {
            return;
        }

        let parnt_ipt = inputRef.current.parentElement;
        let c_cssName = 'r-180';

        if (showList) {
            parnt_ipt?.classList.remove(c_cssName);
            document.removeEventListener('click', other_close);
        } else {
            parnt_ipt?.classList.add(c_cssName);
            setTimeout(() => {
                document.addEventListener('click', other_close)
            }, 300)
        }
        showList = !showList;
    }
    const onInput_Change = () => {

        let val_input = inputRef.current?.value.trim();
        if (val_input == pre_val_input) {
            return;
        }
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        var tid = setTimeout(() => {
            pre_val_input = val_input;
            setSearchText(val_input ?? "");
        }, 300);
        setTimeoutId(tid);
    };
    const onSelectLi = (el: any) => {
        stop_prop(event);
        if (!inputRef.current) {
            return;
        }
        if (options.BindType == "BindAttribute") {
            options.BindAttr.setTextValue(options.Op_Key.get(el).value?.toString() ?? "")
        }
        else {
            options.BindAsso.setValue(el);
        }
        inputRef.current.value = options.Op_Label.get(el).value?.toString() ?? "";
        onInput_SelectList();
    }

    var el = <div className="css_DropdownListWithAttribute_container">
        <div className="css_DropdownListWithAttribute">
            <input tabIndex={props.tabIndex} id={props.id} className="css_input_select" onChange={(options.Can_Search ? onInput_Change : undefined)} onFocus={onInput_SelectList} readOnly={!props.Can_Search} ref={inputRef} />
        </div>
        <ul className="css_DropdownListWithAttribute_list">
            {renderList()}
        </ul>
    </div>;

    return el;
}



// export function onInputChange() {
//     if (!input_select) {
//         input_select = document.getElementById(options.id) as HTMLInputElement;
//     }

//     if (!input_
// select) {
//         return;
//     }
//     let ipt = input_select;

//     let val_input = ipt.value?.trim();
//     if (!val_input || val_input == pre_val_input) {
//         return;
//     }
//     pre_val_input = val_input;

//     if (pre_val_input) {
//         options.Options.items?.filter(pt => {
//             options.Op_Label.get(pt).value?.startsWith(pre_val_input)
//         }).map(o => {

//         })

//     }

// }



