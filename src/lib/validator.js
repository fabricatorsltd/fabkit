/**
 * Runtime prop validation for development mode.
 *
 * @param {string} component - Component name
 * @param {string} prop - Prop name
 * @param {any} value - Provided value
 * @param {Object} allowedValues - The constant object from propTypes.js
 */
export function validateProp(component, prop, value, allowedValues) {
  // Only run in browser development mode
  if (typeof window !== "undefined" && import.meta.env.DEV) {
    if (value === undefined || value === null) return;

    const values = Object.values(allowedValues);
    if (!values.includes(value)) {
      console.warn(
        `[fabkit] <${component}>: Invalid value for prop "${prop}". ` +
          `Got "${value}", expected one of: ${values.map((v) => `"${v}"`).join(", ")}`
      );
    }
  }
}
