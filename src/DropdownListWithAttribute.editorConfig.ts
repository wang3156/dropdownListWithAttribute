import { DropdownListWithAttributePreviewProps } from "../typings/DropdownListWithAttributeProps";

export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
  caption: string;
  propertyGroups?: PropertyGroup[];
  properties?: Property[];
};

type Property = {
  key: string;
  caption: string;
  description?: string;
  objectHeaders?: string[]; // used for customizing object grids
  objects?: ObjectProperties[];
  properties?: Properties[];
};

type ObjectProperties = {
  properties: PropertyGroup[];
  captions?: string[]; // used for customizing object grids
};

export type Problem = {
  property?: string; // key of the property, at which the problem exists
  severity?: "error" | "warning" | "deprecation"; // default = "error"
  message: string; // description of the problem
  studioMessage?: string; // studio-specific message, defaults to message
  url?: string; // link with more information about the problem
  studioUrl?: string; // studio-specific link
};

type BaseProps = {
  type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
  grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
}

type ImageProps = BaseProps & {
  type: "Image";
  document?: string; // svg image
  data?: string; // base64 image
  property?: object; // widget image property object from Values API
  width?: number; // sets a fixed maximum width
  height?: number; // sets a fixed maximum height
}

type ContainerProps = BaseProps & {
  type: "Container" | "RowLayout";
  children: PreviewProps[]; // any other preview element
  borders?: boolean; // sets borders around the layout to visually group its children
  borderRadius?: number; // integer. Can be used to create rounded borders
  backgroundColor?: string; // HTML color, formatted #RRGGBB
  borderWidth?: number; // sets the border width
  padding?: number; // integer. adds padding around the container
}

type RowLayoutProps = ContainerProps & {
  type: "RowLayout";
  columnSize?: "fixed" | "grow" // default is fixed
}

type TextProps = BaseProps & {
  type: "Text";
  content: string; // text that should be shown
  fontSize?: number; // sets the font size
  fontColor?: string; // HTML color, formatted #RRGGBB
  bold?: boolean;
  italic?: boolean;
}

type DropZoneProps = BaseProps & {
  type: "DropZone";
  property: object; // widgets property object from Values API
  placeholder: string; // text to be shown inside the dropzone when empty
  showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
}


type SelectableProps = BaseProps & {
  type: "Selectable";
  object: object; // object property instance from the Value API
  child: PreviewProps; // any type of preview property to visualize the object instance
}

type DatasourceProps = BaseProps & {
  type: "Datasource";
  property: object | null; // datasource property object from Values API
  child?: PreviewProps; // any type of preview property component (optional)
}

// 属性操作工具类
class PropertyEditor {
  /** 递归修改属性 */
  private modifyProperty(
    modify: (prop: Property, index: number, array: Property[]) => void,
    groups: PropertyGroup[], // 符合官方定义：PropertyGroup[]
    key: string,
    nestedPropIndex?: number,
    nestedPropKey?: string
  ): void {
    groups.forEach(group => {
      // 处理嵌套分组（仍是PropertyGroup[]类型）
      if (group.propertyGroups) {
        this.modifyProperty(modify, group.propertyGroups, key, nestedPropIndex, nestedPropKey);
      }

      // 处理当前分组的属性（Property[]类型）
      group.properties?.forEach((prop, index, array) => {
        if (prop.key === key) {
          if (nestedPropIndex === undefined || nestedPropKey === undefined) {
            // 直接修改当前属性
            modify(prop, index, array);
          }
          // 处理objects嵌套属性（根据官方类型，objects是ObjectProperties[]）
          else if (prop.objects?.[nestedPropIndex]) {
            // ObjectProperties的properties是PropertyGroup[]，符合modifyProperty的参数要求
            this.modifyProperty(
              modify,
              prop.objects[nestedPropIndex].properties,
              nestedPropKey
            );
          }
          // 处理properties嵌套属性（根据官方类型，properties是Properties[]即PropertyGroup[][]）
          else if (prop.properties?.[nestedPropIndex]) {
            // prop.properties[nestedPropIndex]是PropertyGroup[]，符合参数要求
            this.modifyProperty(
              modify,
              prop.properties[nestedPropIndex],
              nestedPropKey
            );
          }
        }
      });
    });
  }

  /** 隐藏多个属性 */
  hidePropertiesIn(propertyGroups: PropertyGroup[], keys: string[]): void {
    keys.forEach(key => {
      this.modifyProperty((_, index, container) => {
        container.splice(index, 1); // 从属性数组中移除目标属性
      }, propertyGroups, key);
    });
  }
}

// 工具实例
const propertyEditor = new PropertyEditor();


export type PreviewProps = ImageProps | ContainerProps | RowLayoutProps | TextProps | DropZoneProps | SelectableProps | DatasourceProps;

export function getProperties(_values: DropdownListWithAttributePreviewProps, defaultProperties: Properties/*, target: Platform*/): Properties {

  // 根据数据类型隐藏属性
  switch (_values.BindType.toString()) {
    case "BindAssociation":
      propertyEditor.hidePropertiesIn(defaultProperties, ["BindAttr"]);
      break;
    case "BindAttribute":
      propertyEditor.hidePropertiesIn(defaultProperties, ["BindAsso"]);
      break;
  }
  return defaultProperties;
}

// export function check(_values: DropdownListWithAttributePreviewProps): Problem[] {
//     const errors: Problem[] = [];
//     // Add errors to the above array to throw errors in Studio and Studio Pro.
//     /* Example
//     if (values.myProperty !== "custom") {
//         errors.push({
//             property: `myProperty`,
//             message: `The value of 'myProperty' is different of 'custom'.`,
//             url: "https://github.com/myrepo/mywidget"
//         });
//     }
//     */
//     return errors;
// }

// export function getPreview(values: DropdownListWithAttributePreviewProps, isDarkMode: boolean, version: number[]): PreviewProps {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     }
// }

// export function getCustomCaption(values: DropdownListWithAttributePreviewProps, platform: Platform): string {
//     return "DropdownListWithAttribute";
// }


export function getPreview(values: DropdownListWithAttributePreviewProps, isDarkMode: boolean, version: number[]): PreviewProps {
  // Customize your pluggable widget appearance for Studio Pro.
  console.log(version);
  var readOnlyColor = "lightgray"; // Color when widget is readOnly
  var defaultColor = isDarkMode ? "#333333" : "#FFFFFF";
  var svgIcon = "<svg\n            class=\"svg-icon\"\n            style=\"width: 1em; height: 1em;vertical-align: middle;fill: currentColor;overflow: hidden;\"\n            viewBox=\"0 0 1024 1024\"\n            version=\"1.1\"\n            xmlns=\"http://www.w3.org/2000/svg\"\n        >\n            <path d=\"M556.01602 769.767264l453.883943-454.93226c18.798868-18.797098 18.798868-49.373591 0.008854-68.167148-9.057669-9.054127-21.159352-14.042485-34.080917-14.042485s-25.023249 4.988358-34.082688 14.044256L511.467873 687.601901 82.146769 246.561608c-8.95142-8.94965-21.054874-13.938008-33.972898-13.938008-12.919795 0-25.023249 4.988358-34.082688 14.044256-18.786473 18.791785-18.786473 49.368279 0 68.156523l452.562922 454.652473c10.723996 9.19225 25.28887 21.563095 38.55043 21.559553 1.156336 0 2.30913-0.093853 3.424737-0.279787l2.103717-0.348849 2.078925 0.462181c1.514038 0.336453 3.102451 0.504679 4.720967 0.504679 10.879827 0.001771 24.546902-7.672899 38.483139-21.607365z\" />\n        </svg>";
  var objectsDatasources = values.Options;
  var contenName = function () {
    if (objectsDatasources && "caption" in objectsDatasources) {
      return objectsDatasources.caption;
    } else {
      return "[dataSource : Entity List]";

    }
  }();
  return {
    type: "Container",
    borders: true,
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: values.readOnly ? readOnlyColor : defaultColor,
    // Apply color change based on readOnly state
    padding: 0,
    children: [{
      type: "RowLayout",
      columnSize: "grow",
      children: [{
        type: "Container",
        grow: 1,
        padding: 6,
        children: [{
          type: "Text",
          content: contenName,
          fontSize: 9,
          fontColor: "#4667f7"
        }]
      }, {
        type: "Container",
        grow: 0,
        padding: 6,
        children: [{
          type: "Image",
          document: svgIcon,
          width: 15,
          // Width of the icon
          height: 15 // Height of the icon
        }]
      }]
    }]
  };
}