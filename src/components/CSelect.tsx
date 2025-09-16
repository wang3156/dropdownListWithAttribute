import { ReactElement, createElement } from "react";
import { DropdownListWithAttributeContainerProps } from "../../typings/DropdownListWithAttributeProps";

let options: DropdownListWithAttributeContainerProps;
let input_select: HTMLInputElement | null;
export function CSelect(props: DropdownListWithAttributeContainerProps): ReactElement {
    options = props;
    console.log('CSelect-------')

    var el = <div className="css_DropdownListWithAttribute_container">
        <div className="css_DropdownListWithAttribute">
            <input tabIndex={props.tabIndex} id={props.id} onChange={onInputChange} className="css_input_select" onFocus={onInput_SelectList} readOnly={!props.Can_Search} />
        </div>
        {create_List(props.Options.items)}
    </div>
        ;
    return el;
}


let pre_val_input: string;
export function onInputChange() {
    if (!input_select) {
        input_select = document.getElementById(options.id) as HTMLInputElement;
    }

    if (!input_select) {
        return;
    }
    let ipt = input_select;

    let val_input = ipt.value?.trim();
    if (!val_input || val_input == pre_val_input) {
        return;
    }
    pre_val_input = val_input;
    options.BindAttr.setTextValue(val_input);


}

let showList = false;
export function onInput_SelectList() {

    if (!input_select) {
        input_select = document.getElementById(options.id) as HTMLInputElement;
    }

    if (!input_select) {
        return;
    }
    let parnt_ipt = input_select.parentElement;
    let c_cssName = 'r-180';

    if (showList) {
        parnt_ipt?.classList.remove(c_cssName);

    } else {
        parnt_ipt?.classList.add(c_cssName);
    }
    showList = !showList;


}

export function create_List(datas: any[] | undefined): ReactElement {
    let list: any = [];
    datas?.forEach(element => {
        list.push(<li onClick={() => {
            onSelectLi(element)
        }} key={options.Op_Key.get(element).value?.toString()}>{options.Op_Label.get(element).value}</li>)
    });
    return <ul className="css_DropdownListWithAttribute_list">{list}</ul>;
}

export function onSelectLi(el: any) {

    if (!input_select) {
        return;
    }
    options.BindAttr.setTextValue(options.Op_Key.get(el).value?.toString() ?? "")
    input_select.value = options.Op_Label.get(el).value?.toString() ?? "";
    onInput_SelectList();

}