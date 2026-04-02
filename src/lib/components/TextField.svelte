<script>
  /**
   * @typedef {import("../../types/index.d.ts").TextFieldProps} TextFieldProps
   */

  import BaseField from "./BaseField.svelte";
  import { IconPosition } from "../propTypes.js";
  import { validateProp } from "../validator.js";

  /** @type {TextFieldProps} */
  let {
    value = $bindable(""),
    label = "",
    placeholder = "",
    type = "text",
    icon = "",
    iconPosition = IconPosition.right,
    readOnly = false,
    flat = false,
    ref = $bindable(),
    ...rest
  } = $props();

  $derived.by(() => {
    validateProp("TextField", "iconPosition", iconPosition, IconPosition);
  });
</script>

<BaseField
  bind:value
  {label}
  {placeholder}
  {type}
  {icon}
  {iconPosition}
  {readOnly}
  {flat}
  bind:ref
  {...rest}
/>
