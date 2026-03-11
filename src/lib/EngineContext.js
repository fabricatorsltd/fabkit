import { setContext, getContext } from "svelte";
import BrowserEngine from "./engines/Browser.js";

const ENGINE_CONTEXT_KEY = "FABKIT_ENGINE_CONTEXT";

/**
 * Provides an Engine instance to its children components via Svelte's context API.
 * @param {import('./Engine.js').default} [engine] - The Engine instance to provide. Defaults to BrowserEngine.
 */
export function provideEngine(engine = new BrowserEngine()) {
  setContext(ENGINE_CONTEXT_KEY, engine);
}

/**
 * Retrieves the Engine instance from Svelte's context.
 * @returns {import('./Engine.js').default} The Engine instance.
 * @throws {Error} if no Engine instance is found in context.
 */
export function getEngine() {
  const engine = getContext(ENGINE_CONTEXT_KEY);
  if (!engine) {
    throw new Error(
      "No Engine instance found in context. Did you forget to call provideEngine()?",
    );
  }
  return engine;
}
