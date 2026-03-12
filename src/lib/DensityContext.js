import { getContext } from "svelte";
import { readable } from "svelte/store";
import { DENSITY_CONTEXT_KEY } from "./context.js";
import { DENSITY_TOKENS } from "./density.js";

export function getDensityStore() {
  const store = getContext(DENSITY_CONTEXT_KEY);
  if (store) return store;
  return readable({ density: "regular", tokens: DENSITY_TOKENS.regular });
}
