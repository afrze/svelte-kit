import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

export default function (node: any, options: any) {
  const instance: any = tippy(node, options);

  return {
    update(newOptions: any) {
      instance.setProps(newOptions);
    },

    destroy() {
      instance.destroy();
    },
  };
}
