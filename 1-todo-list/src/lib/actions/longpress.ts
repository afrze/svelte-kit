export default function longpress(node: any, options: any) {
  let timer: any;

  function handleMouseDown() {
    const { duration = 2000 } = options;

    timer = setTimeout(() => {
      console.log("here");
      node.dispatchEvent(new CustomEvent("longpress"));
    }, duration);
  }

  function handleMouseUp() {
    clearTimeout(timer);
  }

  node.addEventListener("mousedown", handleMouseDown);
  node.addEventListener("mouseup", handleMouseUp);

  return {
    update(newOptions: any) {
      options = newOptions;
    },
    destroy() {
      clearTimeout(timer);
      node.removeEventListener("mousedown", handleMouseDown);
      node.removeEventListener("mouseup", handleMouseUp);
    },
  };
}
