export const DENSITIES = ["compact", "regular", "roomy"];

export const DENSITY_TOKENS = {
  compact: {
    space2: 2,
    space4: 4,
    space8: 6,
    space12: 10,
    space16: 14,
    space24: 20,
    fontSize: 14,
    controlHeight: 28,
  },
  regular: {
    space2: 2,
    space4: 4,
    space8: 8,
    space12: 12,
    space16: 16,
    space24: 24,
    fontSize: 15,
    controlHeight: 32,
  },
  roomy: {
    space2: 3,
    space4: 6,
    space8: 10,
    space12: 14,
    space16: 20,
    space24: 28,
    fontSize: 16,
    controlHeight: 40,
  },
};

export function normalizeDensity(value) {
  if (value === "compact" || value === "regular" || value === "roomy") return value;
  return "regular";
}

export function resolveDensityTokens(density, overrides) {
  const key = normalizeDensity(density);
  const base = DENSITY_TOKENS[key];
  if (!overrides) return base;
  return { ...base, ...overrides };
}

export function densityTokensToCssVars(tokens) {
  const entries = Object.entries(tokens);
  return entries
    .map(([k, v]) => {
      if (typeof v === "number") {
        if (k.toLowerCase().includes("fontsize")) return `--fabkit-density-${k}: ${v}px`;
        if (k.toLowerCase().includes("height")) return `--fabkit-density-${k}: ${v}px`;
        return `--fabkit-density-${k}: ${v}px`;
      }
      return `--fabkit-density-${k}: ${String(v)}`;
    })
    .join("; ");
}
