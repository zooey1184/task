import { createVNode, render } from "vue";
import Toast from "./index.vue";

const div = document.createElement("div");
div.setAttribute("class", "toast");
document.body.appendChild(div);

let time = null;
export const toast = (text, duration=1500) => {
  const NODE = createVNode(Toast, { text });
  render(NODE, div);
  clearTimeout(time);
  time = setTimeout(() => {
    render(null, div);
  }, duration);
};
