const TOKEN_MAP = {
  surface: "var(--surface)",
  "surface-elevated": "var(--surface-elevated)",
  "surface-elevated-2": "var(--surface-elevated-2)",
  "text-primary": "var(--text-primary)",
  "text-secondary": "var(--text-secondary)",
  "border-primary": "var(--border-primary)",
  "border-secondary": "var(--border-secondary)",
  "border-tertiary": "var(--border-tertiary)",
};

export function resolveToken(token) {
  if (typeof token !== "string") return token;

  // Direct mapping for simple tokens
  if (TOKEN_MAP[token]) {
    return TOKEN_MAP[token];
  }

  // Handle color palette tokens like "gray.500"
  if (token.includes(".")) {
    const [color, weight] = token.split(".");
    return `var(--${color}-${weight})`;
  }

  // Return the original string if it's not a token
  return token;
}

export function useSpacing(props) {
  const styles = [];
  const formatValue = (val) => (typeof val === "number" ? `${val}px` : val);

  // Margin
  const mTop = props.mt ?? props.my ?? props.m;
  const mBottom = props.mb ?? props.my ?? props.m;
  const mLeft = props.ml ?? props.mx ?? props.m;
  const mRight = props.mr ?? props.mx ?? props.m;

  if (mTop !== undefined || mBottom !== undefined || mLeft !== undefined || mRight !== undefined) {
    if (mTop !== undefined) styles.push(`margin-top: ${formatValue(mTop)}`);
    if (mBottom !== undefined) styles.push(`margin-bottom: ${formatValue(mBottom)}`);
    if (mLeft !== undefined) styles.push(`margin-left: ${formatValue(mLeft)}`);
    if (mRight !== undefined) styles.push(`margin-right: ${formatValue(mRight)}`);
  } else if (props.margin) {
    const margin = Array.isArray(props.margin) ? props.margin : [props.margin, props.margin, props.margin, props.margin];
    styles.push(`margin: ${margin.map(formatValue).join(" ")}`);
  }

  // Padding
  const pTop = props.pt ?? props.py ?? props.p;
  const pBottom = props.pb ?? props.py ?? props.p;
  const pLeft = props.pl ?? props.px ?? props.p;
  const pRight = props.pr ?? props.px ?? props.p;

  if (pTop !== undefined || pBottom !== undefined || pLeft !== undefined || pRight !== undefined) {
    if (pTop !== undefined) styles.push(`padding-top: ${formatValue(pTop)}`);
    if (pBottom !== undefined) styles.push(`padding-bottom: ${formatValue(pBottom)}`);
    if (pLeft !== undefined) styles.push(`padding-left: ${formatValue(pLeft)}`);
    if (pRight !== undefined) styles.push(`padding-right: ${formatValue(pRight)}`);
  } else if (props.padding) {
    const padding = Array.isArray(props.padding) ? props.padding : [props.padding, props.padding, props.padding, props.padding];
    styles.push(`padding: ${padding.map(formatValue).join(" ")}`);
  }

  return styles;
}
