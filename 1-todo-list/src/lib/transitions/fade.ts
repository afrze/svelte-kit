import { cubicInOut } from "svelte/easing";

export default function fade(
  node: any,
  { delay = 0, duration = 400, easing = cubicInOut }
) {
  const originalOpacity = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    tick: (t: any) => {
      node.style.opacity = t * originalOpacity;
    },
  };
}
