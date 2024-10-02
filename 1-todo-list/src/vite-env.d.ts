/// <reference types="svelte" />
/// <reference types="vite/client" />

declare namespace svelteHTML {
  interface HTMLAttributes<T> {
    "on:longpress"?: (event: CustomEvent) => void;
  }
}

declare module "uuid";
declare module "svelte-icons/fa/FaRegTrashAlt.svelte";
