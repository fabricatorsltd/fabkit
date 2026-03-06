import { resolveToken } from './style/index.js';

/**
 * Maps expressive spacing props to CSS box model values
 * @param {string} prop - The property name (e.g., 'mx', 'py', 'pt')
 * @param {any} value - The value (number, string, or token)
 * @returns {Object} - Object with CSS property keys and values
 */
function expandSpacingProp(prop, value) {
  const result = {};
  const formatted = formatValue(value);

  if (prop === 'mx') {
    result['margin-left'] = formatted;
    result['margin-right'] = formatted;
  } else if (prop === 'my') {
    result['margin-top'] = formatted;
    result['margin-bottom'] = formatted;
  } else if (prop === 'mt') {
    result['margin-top'] = formatted;
  } else if (prop === 'mb') {
    result['margin-bottom'] = formatted;
  } else if (prop === 'ml') {
    result['margin-left'] = formatted;
  } else if (prop === 'mr') {
    result['margin-right'] = formatted;
  } else if (prop === 'px') {
    result['padding-left'] = formatted;
    result['padding-right'] = formatted;
  } else if (prop === 'py') {
    result['padding-top'] = formatted;
    result['padding-bottom'] = formatted;
  } else if (prop === 'pt') {
    result['padding-top'] = formatted;
  } else if (prop === 'pb') {
    result['padding-bottom'] = formatted;
  } else if (prop === 'pl') {
    result['padding-left'] = formatted;
  } else if (prop === 'pr') {
    result['padding-right'] = formatted;
  }

  return result;
}

/**
 * Formats a value to a CSS string
 * @param {any} value - Number, string, or array
 * @returns {string}
 */
function formatValue(value) {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  if (typeof value === 'string') {
    return resolveToken(value);
  }
  if (Array.isArray(value)) {
    return value.map(v => typeof v === 'number' ? `${v}px` : resolveToken(v)).join(' ');
  }
  return value;
}

/**
 * Formats border radius - handles single value or array [tl, tr, br, bl]
 * @param {any} value - Number, string, or array
 * @returns {string}
 */
function formatRadius(value) {
  if (typeof value === 'number') {
    return `${value}px`;
  }
  if (typeof value === 'string') {
    return resolveToken(value);
  }
  if (Array.isArray(value) && value.length === 4) {
    // [top-left, top-right, bottom-right, bottom-left]
    return value.map(v => typeof v === 'number' ? `${v}px` : resolveToken(v)).join(' ');
  }
  return value;
}

/**
 * Main system resolver: converts expressive props to CSS styles
 *
 * @param {Object} props - Component props object
 * @returns {Object} - { styles: string, className: string, filteredRest: Object }
 *
 * @example
 * // Component usage:
 * let { ...rest } = $props();
 * const { styles, className, filteredRest } = $derived(resolveProps(rest));
 *
 * // Accepts expressive syntax:
 * // mx={8}, py="1", radius={12}, hover={{ bg: 'gray.200' }}
 */
export function resolveProps(props) {
  const styles = {};
  const classNames = [];
  const filteredRest = {};

  // List of recognized expressive props to filter out
  const expressiveProps = new Set([
    // Spacing shortcuts
    'mx', 'my', 'mt', 'mb', 'ml', 'mr',
    'px', 'py', 'pt', 'pb', 'pl', 'pr',
    'margin', 'padding',
    // Sizing shortcuts
    'w', 'h', 'minW', 'minH', 'maxW', 'maxH',
    // Display
    'display', 'flex', 'flexDir', 'gap', 'align', 'justify',
    // Borders & Radius
    'radius', 'borderRadius', 'borderWidth', 'borderColor', 'borderStyle',
    // Backgrounds & Colors
    'bg', 'color', 'shadow',
    // Interactions
    'hover', 'focus', 'active',
    // Other
    'zIndex', 'opacity', 'overflow', 'position'
  ]);

  // Process each prop
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;

    // Handle spacing shortcuts (mx, my, pt, etc.)
    if (key.match(/^(mx|my|mt|mb|ml|mr|px|py|pt|pb|pl|pr)$/)) {
      Object.assign(styles, expandSpacingProp(key, value));
    }
    // Handle traditional margin array [top, right, bottom, left]
    else if (key === 'margin' && Array.isArray(value)) {
      const [t, r, b, l] = value;
      styles['margin-top'] = formatValue(t);
      styles['margin-right'] = formatValue(r);
      styles['margin-bottom'] = formatValue(b);
      styles['margin-left'] = formatValue(l);
    }
    // Handle traditional padding array [top, right, bottom, left]
    else if (key === 'padding' && Array.isArray(value)) {
      const [t, r, b, l] = value;
      styles['padding-top'] = formatValue(t);
      styles['padding-right'] = formatValue(r);
      styles['padding-bottom'] = formatValue(b);
      styles['padding-left'] = formatValue(l);
    }
    // Handle border radius
    else if ((key === 'radius' || key === 'borderRadius') && value !== undefined) {
      styles['border-radius'] = formatRadius(value);
    }
    // Handle sizing
    else if (key === 'w' && value !== undefined) {
      styles['width'] = formatValue(value);
    }
    else if (key === 'h' && value !== undefined) {
      styles['height'] = formatValue(value);
    }
    else if (key === 'minW' && value !== undefined) {
      styles['min-width'] = formatValue(value);
    }
    else if (key === 'minH' && value !== undefined) {
      styles['min-height'] = formatValue(value);
    }
    else if (key === 'maxW' && value !== undefined) {
      styles['max-width'] = formatValue(value);
    }
    else if (key === 'maxH' && value !== undefined) {
      styles['max-height'] = formatValue(value);
    }
    // Handle backgrounds and colors
    else if (key === 'bg' && value !== undefined) {
      styles['background-color'] = resolveToken(value);
    }
    else if (key === 'color' && value !== undefined) {
      styles['color'] = resolveToken(value);
    }
    // Handle shadows
    else if (key === 'shadow' && value !== undefined) {
      styles['box-shadow'] = resolveToken(value);
    }
    // Handle display properties
    else if (key === 'display' && value !== undefined) {
      styles['display'] = value;
    }
    else if (key === 'flex' && value !== undefined) {
      styles['flex'] = typeof value === 'number' ? value : value;
    }
    else if (key === 'flexDir' && value !== undefined) {
      styles['flex-direction'] = value;
    }
    else if (key === 'gap' && value !== undefined) {
      styles['gap'] = formatValue(value);
    }
    else if (key === 'align' && value !== undefined) {
      styles['align-items'] = value;
    }
    else if (key === 'justify' && value !== undefined) {
      styles['justify-content'] = value;
    }
    // Handle other CSS properties
    else if (key === 'zIndex' && value !== undefined) {
      styles['z-index'] = value;
    }
    else if (key === 'opacity' && value !== undefined) {
      styles['opacity'] = value;
    }
    else if (key === 'overflow' && value !== undefined) {
      styles['overflow'] = value;
    }
    else if (key === 'position' && value !== undefined) {
      styles['position'] = value;
    }
    // Handle interaction states
    else if (key === 'hover' && typeof value === 'object') {
      // Store as CSS custom properties for use in :hover pseudo-class
      for (const [hKey, hValue] of Object.entries(value)) {
        if (hKey === 'bg') {
          styles['--snt-bg-hover'] = resolveToken(hValue);
        } else if (hKey === 'color') {
          styles['--snt-color-hover'] = resolveToken(hValue);
        } else if (hKey === 'shadow') {
          styles['--snt-sh-hover'] = resolveToken(hValue);
        } else if (hKey === 'transform') {
          styles['--snt-tr-hover'] = hValue;
        }
      }
    }
    else if (key === 'focus' && typeof value === 'object') {
      for (const [fKey, fValue] of Object.entries(value)) {
        if (fKey === 'bg') {
          styles['--snt-bg-focus'] = resolveToken(fValue);
        } else if (fKey === 'color') {
          styles['--snt-color-focus'] = resolveToken(fValue);
        } else if (fKey === 'shadow') {
          styles['--snt-sh-focus'] = resolveToken(fValue);
        } else if (fKey === 'transform') {
          styles['--snt-tr-focus'] = fValue;
        }
      }
    }
    else if (key === 'active' && typeof value === 'object') {
      for (const [aKey, aValue] of Object.entries(value)) {
        if (aKey === 'bg') {
          styles['--snt-bg-active'] = resolveToken(aValue);
        } else if (aKey === 'color') {
          styles['--snt-color-active'] = resolveToken(aValue);
        } else if (aKey === 'shadow') {
          styles['--snt-sh-active'] = resolveToken(aValue);
        } else if (aKey === 'transform') {
          styles['--snt-tr-active'] = aValue;
        }
      }
    }
    // Pass through unrecognized props
    else if (!expressiveProps.has(key)) {
      filteredRest[key] = value;
    }
  }

  // Convert styles object to CSS string
  const styleString = Object.entries(styles)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');

  return {
    styles: styleString,
    className: classNames.join(' '),
    filteredRest
  };
}

export default {
  resolveProps
};

