// Auto-generated — do not edit

import type { Component } from 'svelte';
import type { Readable } from 'svelte/store';
import type { IconWeight } from './icons';

export type Snippet = () => any;

export type RGBA = readonly [number, number, number, number];
export type ColorValue = string | RGBA;
export type Length = number | string;
export type Box4<T = Length> = readonly [T, T, T, T];
export type Spacing = Length | readonly [Length, Length];

export type Align = 'start' | 'center' | 'end' | 'fill';
export type Justify =
  | 'start'
  | 'center'
  | 'end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type LeafletMode = 'auto' | 'split' | 'stacked';
export type HideBelowMode = 'auto' | 'visible' | 'hidden';

export type IconPosition = 'left' | 'right';
export type PopOverAlign = 'start' | 'center' | 'end';
export type GridAlign = 'start' | 'center' | 'end' | 'stretch';
export type GridJustify = 'start' | 'center' | 'end' | 'stretch';
export type TextAlign = 'left' | 'center' | 'right';
export type TextTransform = 'none' | 'uppercase' | 'lowercase' | 'capitalize';

export type ButtonVariant = 'primary' | 'secondary' | 'destructive' | 'flat';

export const Align: Readonly<{ start: 'start'; center: 'center'; end: 'end'; fill: 'fill' }>;
export const Justify: Readonly<{
  start: 'start';
  center: 'center';
  end: 'end';
  spaceBetween: 'space-between';
  spaceAround: 'space-around';
  spaceEvenly: 'space-evenly';
}>;
export const LeafletMode: Readonly<{ auto: 'auto'; split: 'split'; stacked: 'stacked' }>;
export const HideBelowMode: Readonly<{ auto: 'auto'; visible: 'visible'; hidden: 'hidden' }>;
export const IconPosition: Readonly<{ left: 'left'; right: 'right' }>;
export const PopOverAlign: Readonly<{ start: 'start'; center: 'center'; end: 'end' }>;
export const GridAlign: Readonly<{
  start: 'start';
  center: 'center';
  end: 'end';
  stretch: 'stretch';
}>;
export const GridJustify: Readonly<{
  start: 'start';
  center: 'center';
  end: 'end';
  stretch: 'stretch';
}>;
export const TextAlign: Readonly<{ left: 'left'; center: 'center'; right: 'right' }>;
export const TextTransform: Readonly<{
  none: 'none';
  uppercase: 'uppercase';
  lowercase: 'lowercase';
  capitalize: 'capitalize';
}>;
export const ButtonVariant: Readonly<{
  primary: 'primary';
  secondary: 'secondary';
  destructive: 'destructive';
  flat: 'flat';
}>;

export interface InteractionStyle {
  bg?: ColorValue;
  color?: ColorValue;
  shadow?: string;
  borderWidth?: Length | Box4;
  borderColor?: ColorValue | readonly ColorValue[];
  transform?: string;
}

export interface SkeletonProps {
  useSpacing?: boolean;
  ref?: unknown;

  margin?: Length | Box4;
  padding?: Length | Box4;
  spacing?: Spacing;

  m?: Length;
  mx?: Length;
  my?: Length;
  mt?: Length;
  mb?: Length;
  ml?: Length;
  mr?: Length;

  p?: Length;
  px?: Length;
  py?: Length;
  pt?: Length;
  pb?: Length;
  pl?: Length;
  pr?: Length;

  bg?: ColorValue;
  bgHover?: ColorValue;
  bgFocus?: ColorValue;
  bgActive?: ColorValue;

  hover?: InteractionStyle;
  focus?: InteractionStyle;
  active?: InteractionStyle;

  borderWidth?: Length | Box4;
  borderWidthHover?: Length | Box4;
  borderWidthFocus?: Length | Box4;
  borderWidthActive?: Length | Box4;

  borderColor?: ColorValue | readonly ColorValue[];
  borderColorHover?: ColorValue | readonly ColorValue[];
  borderColorFocus?: ColorValue | readonly ColorValue[];
  borderColorActive?: ColorValue | readonly ColorValue[];

  borderStyle?: string;
  borderRadius?: Length | Box4;

  shadow?: string;
  shadowSecondary?: string;
  shadowActive?: string;

  transformHover?: string;
  transformFocus?: string;
  transformActive?: string;

  zIndex?: number | string;

  width?: Length;
  height?: Length;
  minWidth?: Length;
  minHeight?: Length;
  maxWidth?: Length;
  maxHeight?: Length;

  w?: Length;
  h?: Length;
  minW?: Length;
  minH?: Length;
  maxW?: Length;
  maxH?: Length;

  display?: string;
  position?: string;
  opacity?: number | string;
  overflow?: string;
  flex?: number | string;

  color?: ColorValue;
  colorHover?: ColorValue;
  colorFocus?: ColorValue;
  colorActive?: ColorValue;

  fontSize?: Length;
  fontWeight?: number | string;
  textAlign?: TextAlign | string;

  class?: string;
  children?: Snippet;

  [key: string]: unknown;
}

export function resolveProps(props: Record<string, any>): {
  styles: string;
  className: string;
  filteredRest: Record<string, any>;
};

export type Density = 'compact' | 'regular' | 'roomy';

export interface DensityTokens {
  space2: number;
  space4: number;
  space8: number;
  space12: number;
  space16: number;
  space24: number;
  fontSize: number;
  controlHeight: number;
}

export const DENSITIES: readonly Density[];
export const DENSITY_TOKENS: Record<Density, DensityTokens>;
export function normalizeDensity(value: any): Density;
export function resolveDensityTokens(density: any, overrides?: Partial<DensityTokens>): DensityTokens;
export function getDensityStore(): Readable<{ density: Density; tokens: DensityTokens }>;

export interface ButtonProps extends SkeletonProps {
  label?: string;
  icon?: Component<any> | Snippet | null;
  labelBehavior?: 'auto' | 'always' | 'never';
  children?: Snippet;
  disabled?: boolean;
  type?: string;
  square?: boolean;
  variant?: ButtonVariant;
  onClick?: (event: MouseEvent) => void;
}

export interface HBoxProps extends SkeletonProps {
  spacing?: Spacing;
  align?: Align;
  justify?: Justify;
  children?: Snippet;
}

export interface VBoxProps extends SkeletonProps {
  spacing?: Spacing;
  align?: Align;
  justify?: Justify;
  children?: Snippet;
}

export interface GridProps extends SkeletonProps {
  spacing?: Spacing;
  columns?: string;
  rows?: string;
  align?: GridAlign | string;
  justify?: GridJustify | string;
  height?: Length;
  children?: Snippet;
}

export interface BaseFieldProps extends SkeletonProps {
  value?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: Component<any> | null;
  iconPosition?: IconPosition | string;
  readOnly?: boolean;
  flat?: boolean;
  contained?: boolean;
  onInput?: (event: Event) => void;
  ref?: unknown;
}

export interface TextFieldProps extends SkeletonProps {
  value?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  icon?: Component<any> | null;
  iconPosition?: IconPosition | string;
  readOnly?: boolean;
  flat?: boolean;
  ref?: unknown;
}

export interface TextAreaProps extends SkeletonProps {
  value?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  flat?: boolean;
  readOnly?: boolean;
  autoResize?: boolean;
  ref?: unknown;
}

export interface NumberFieldProps extends SkeletonProps {
  value?: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  icon?: Component<any> | null;
  iconPosition?: IconPosition | string;
}

export interface CheckboxProps extends SkeletonProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  onChange?: (event: Event) => void;
}

export interface RadioGroupOption {
  value: string;
  label: string;
}

export interface RadioGroupProps extends SkeletonProps {
  value?: string;
  options?: readonly RadioGroupOption[];
  name?: string;
  disabled?: boolean;
}

export interface SelectFieldOption {
  value: string;
  text: string;
}

export interface SelectFieldProps extends SkeletonProps {
  value?: string;
  label?: string;
  options?: readonly SelectFieldOption[];
  icon?: Component<any> | null;
  iconPosition?: IconPosition | string;
  flat?: boolean;
  dropdownBg?: ColorValue;
  dropdownColor?: ColorValue;
  optionHoverBg?: ColorValue;
  optionActiveBg?: ColorValue;
}

export interface SliderProps extends SkeletonProps {
  value?: number;
  min?: number;
  max?: number;
  points?: readonly number[];
  labels?: readonly string[];
}

export interface PopOverProps extends SkeletonProps {
  attachTo?: HTMLElement;
  children?: Snippet;
  onclose?: () => void;
  align?: PopOverAlign | string;
  offset?: readonly [number, number];
  initialStyle?: string;
  bg?: ColorValue;
  color?: ColorValue;
}

export interface PopOverWrapperProps extends SkeletonProps {
  trigger?: unknown;
  children?: Snippet;
  ref?: unknown;
}

export interface CardProps extends SkeletonProps {
  clip?: boolean;
  children?: Snippet;
}

export interface DialogProps extends SkeletonProps {
  title?: string;
  messages?: readonly any[];
  confirm?: () => void;
  confirmText?: string;
  confirmType?: ButtonVariant | string;
  cancel?: () => void;
  cancelText?: string;
  children?: Snippet;
}

export type ClampOrientation = 'horizontal' | 'vertical';

export interface ClampProps extends SkeletonProps {
  orientation?: ClampOrientation;
  maximumSize?: number;
  tighteningThreshold?: number;
  children?: Snippet;
  ref?: unknown;
}

export type WrapperSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | 'mobile'
  | 'tablet'
  | 'desktop'
  | 'wide'
  | 'full'
  | (string & {});

export interface WrapperProps extends SkeletonProps {
  size?: WrapperSize | number;
  maxWidth?: number | string;
  children?: Snippet;
}

export type SeparatorOrientation = 'horizontal' | 'vertical';

export interface SeparatorProps extends SkeletonProps {
  orientation?: SeparatorOrientation;
  label?: string;
  color?: ColorValue;
}

export interface TextProps extends SkeletonProps {
  element?: string;
  children?: Snippet;
  bold?: boolean;
  italic?: boolean;
  dimmed?: boolean;
  size?: Length;
  weight?: number | string;
  color?: ColorValue;
  align?: TextAlign | string;
  transform?: TextTransform | string;
  wrapping?: string;
}

export interface TabsSwitcherProps extends SkeletonProps {
  context?: string;
  allowNewTabs?: boolean;
}

export interface SwitcherProps extends SkeletonProps {
  model?: boolean;
}

export interface SwitchRowProps extends SkeletonProps {
  title?: string;
  subtitle?: string;
  model?: boolean;
}

export interface SpinRowProps extends SkeletonProps {
  title?: string;
  subtitle?: string;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface EntryRowProps extends SkeletonProps {
  title?: string;
  subtitle?: string;
  value?: string;
  placeholder?: string;
  type?: string;
}

export interface ActionRowProps extends SkeletonProps {
  title?: string;
  subtitle?: string;
  icon?: Component<any> | null;
  widget?: unknown;
  onClick?: () => void;
  activatable?: boolean;
}

export interface PreferencesGroupProps extends SkeletonProps {
  title?: string;
  description?: string;
  children?: Snippet;
}

export interface PreferencesPageProps extends SkeletonProps {
  title?: string;
  description?: string;
  children?: Snippet;
}

export interface MenuItemProps extends SkeletonProps {
  label?: string;
  action?: () => void;
  children?: Snippet;
  icon?: Component<any> | null;
  href?: string;
  target?: string;
}

export interface MenuItem {
  label: string;
  icon?: Component<any> | null;
  action?: () => void;
  link?: string;
  href?: string;
  target?: string;
}

export interface MenuProps extends SkeletonProps {
  items?: readonly MenuItem[];
  children?: Snippet;
}

export interface MenuSwitcherItem {
  label: string;
  pageId: number;
  isActive: boolean;
}

export interface MenuSwitcherProps extends SkeletonProps {
  context?: string;
  items?: readonly MenuSwitcherItem[];
}

export interface NotebookNewPage {
  component: Component<any>;
  props?: Record<string, any>;
}

export interface NotebookProps extends SkeletonProps {
  context?: string;
  newPageContent?: () => NotebookNewPage | undefined | null;
  children?: Snippet;
}

export interface StaticNotebookProps extends SkeletonProps {
  context?: string;
  children?: Snippet;
}

export interface TabProps extends SkeletonProps {
  label?: string;
  children?: Snippet;
}

export interface PanedSize {
  left: number;
  right: number;
}

export interface PanedProps extends SkeletonProps {
  context?: string;
  size?: PanedSize;
  leftTrigger?: number;
  minLeft?: number;
  left?: Snippet;
  right?: Snippet;
}

export interface SideLayoutProps extends SkeletonProps {
  context?: string;
  size?: PanedSize;
  sidebar?: Snippet;
  content?: Snippet;
}

export interface SlideOverProps extends SkeletonProps {
  title?: string;
  description?: string;
  close?: () => void;
  enterFunction?: () => void;
  enter?: unknown;
  height?: number;
  closeLabel?: string;
  disabled?: boolean;
  hideCancel?: boolean;
  modal?: boolean;
  allowOverflow?: boolean;
  children?: Snippet;
}

export interface SlideOverContentProps extends SkeletonProps {
  step?: number;
  align?: string;
  children?: Snippet;
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps extends SkeletonProps {
  text?: string;
  position?: TooltipPosition;
  delay?: number;
  children?: Snippet;
}

export interface ChipProps extends SkeletonProps {
  label?: string;
  removable?: boolean;
  onRemove?: () => void;
  icon?: Component<any> | null;
  color?: ColorValue;
  textColor?: ColorValue;
}

export interface FileChooserProps extends SkeletonProps {
  files?: readonly File[];
  accept?: string;
  multiple?: boolean;
  label?: string;
  maxSize?: number;
}

export interface TagsInputProps extends SkeletonProps {
  tags?: readonly string[];
  placeholder?: string;
  maxTags?: number;
}

export interface ColorPickerProps extends SkeletonProps {
  value?: string;
  label?: string;
}

export interface SearchFieldProps extends SkeletonProps {
  value?: string;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

export interface LevelBarProps extends SkeletonProps {
  value?: number;
  max?: number;
  segments?: number;
  color?: ColorValue;
  lowThreshold?: number;
  highThreshold?: number;
}

export interface AccordionProps extends SkeletonProps {
  multiple?: boolean;
  open?: any;
  children?: Snippet;
  ref?: unknown;
}

export interface AccordionItemProps extends SkeletonProps {
  title?: string;
  open?: boolean;
  icon?: Component<any> | null;
  children?: Snippet;
}

export interface CarouselProps extends SkeletonProps {
  children?: Snippet;
}

export interface ContextMenuItem {
  id: number;
  text: string;
  shortcut?: string;
  icon?: Component<any> | null;
  action: () => void;
  submenu?: readonly ContextMenuItem[];
}

export interface ContextAreaProps extends SkeletonProps {
  items?: readonly ContextMenuItem[];
  area?: Snippet;
  ref?: unknown;
}

export interface DataTableProps extends SkeletonProps {
  columns?: readonly any[];
  rows?: readonly any[];
  selectable?: boolean;
  selectedRows?: readonly any[];
  onRowClick?: (row: any) => void;
  ref?: unknown;
}

export interface TextRichProps extends SkeletonProps {
  children?: Snippet;
}

export interface KbdProps extends SkeletonProps {
  keys?: readonly string[];
  children?: Snippet;
}

export interface TitleBarProps extends SkeletonProps {
  area?: Snippet;
  showWindowControls?: boolean;
  onScrollTop?: () => void;
  onScrollBottom?: () => void;
}

export interface WindowProps extends SkeletonProps {
  top?: Snippet;
  content?: Snippet;
  flat?: boolean;
  hideTitleBarOnScroll?: boolean;
}

export interface SkeletonComponentProps extends SkeletonProps {
  element?: string;
}

export interface ImageProps extends SkeletonProps {
  src?: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: number | string;
  fit?: string;
  position?: string;
  placeholder?: string;
  placeholderColor?: ColorValue;
  fallback?: string;
  fallbackColor?: ColorValue;
  loading?: string;
  decoding?: string;
  fetchPriority?: string;
  blur?: boolean;
  blurAmount?: number;
  zoomOnHover?: boolean;
  crossOrigin?: string;
  borderRadius?: Length | Box4;
  overlay?: unknown;
  errorContent?: unknown;
  placeholderContent?: unknown;
  square?: boolean;
  portrait?: boolean;
  landscape?: boolean;
  role?: string;
  draggable?: boolean;
  onClick?: (event: MouseEvent) => void;
  onLoad?: (event: Event) => void;
  onError?: (event: Event) => void;
  opacity?: number | string;
  overflow?: string;
  ref?: unknown;
}

export type ToastVariant = 'neutral' | 'success' | 'warning' | 'error' | 'info';

export interface ToastProps extends SkeletonProps {
  title?: string;
  subtitle?: string;
  variant?: ToastVariant;
  actionLabel?: string;
  onAction?: (event: MouseEvent) => void;
  dismissible?: boolean;
  onDismiss?: (event: MouseEvent) => void;
  icon?: Component<any> | null;
  children?: Snippet;
}

export interface ToastInput {
  id?: string;
  title?: string;
  subtitle?: string;
  variant?: ToastVariant;
  actionLabel?: string;
  onAction?: (event: MouseEvent) => void;
  dismissible?: boolean;
  timeout?: number;
  icon?: Component<any> | null;
}

export type ToastPlacement = 'top' | 'bottom';

export interface ToastOverlayProps {
  children?: Snippet;
  toasts?: readonly ToastInput[];
  limit?: number;
  timeout?: number;
  placement?: ToastPlacement;
  width?: number;
  gap?: number;
  offset?: number;
  class?: string;
  ref?: unknown;
  [key: string]: unknown;
}

export interface BannerProps extends SkeletonProps {
  title?: string;
  subtitle?: string;
  variant?: ToastVariant | 'neutral';
  revealed?: boolean;
  actionLabel?: string;
  onAction?: (event: MouseEvent) => void;
  dismissible?: boolean;
  onDismiss?: (event: MouseEvent) => void;
  icon?: Component<any> | null;
  children?: Snippet;
}

export type AdaptiveGridMode = 'auto' | 'grid' | 'list';

export interface AdaptiveGridProps extends SkeletonProps {
  mode?: AdaptiveGridMode;
  minCardWidth?: Length;
  minColumns?: number;
  listBelow?: Length;
  columns?: string;
  spacing?: Length;
  listSpacing?: Length;
  listPadding?: Length | Box4;
  align?: GridAlign | string;
  justify?: GridJustify | string;
  children?: Snippet;
}

export interface ContainerGutters {
  compact?: Length;
  regular?: Length;
  wide?: Length;
}

export interface ContainerProps extends SkeletonProps {
  maxWidth?: Length;
  gutters?: Length | ContainerGutters;
  compactBelow?: Length;
  wideAbove?: Length;
  edgeToEdgeBelow?: boolean | number | string;
  center?: boolean;
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface PageProps extends ContainerProps {}

export type ClampScrollableOrientation = 'horizontal' | 'vertical';

export interface ClampScrollableProps extends SkeletonProps {
  orientation?: ClampScrollableOrientation;
  maximumSize?: number;
  tighteningThreshold?: number;
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface AdaptiveLayoutRenderArgs {
  activeBreakpoint?: string;
  width?: number;
  height?: number;
}

export interface AdaptiveLayoutProps extends SkeletonProps {
  activeBreakpoint?: string;
  width?: number;
  height?: number;
  children?: (args: AdaptiveLayoutRenderArgs) => any;
  class?: string;
  ref?: unknown;
}

export interface BreakpointProps {
  name?: string;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  priority?: number;
  fallback?: boolean;
  children?: Snippet;
}

export interface LeafletProps extends SkeletonProps {
  sidebar?: Snippet;
  content?: Snippet;
  children?: Snippet;
  mode?: LeafletMode;
  stackAt?: number;
  sidebarWidth?: Length;
  revealContent?: boolean;
  keepMounted?: boolean;
  class?: string;
  ref?: unknown;
}

export interface NavigationViewProps extends SkeletonProps {
  context?: string;
  stack?: number[];
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface NavigationSplitViewProps extends LeafletProps {}

export type FlapPlacement = 'left' | 'right';

export interface FlapProps extends SkeletonProps {
  sidebar?: Snippet;
  content?: Snippet;
  children?: Snippet;
  open?: boolean;
  width?: Length;
  placement?: FlapPlacement;
  closeOnEscape?: boolean;
  closeOnBackdrop?: boolean;
  keepMounted?: boolean;
  zIndex?: number;
  class?: string;
  ref?: unknown;
}

export type ToolbarViewMode = 'auto' | 'compact' | 'wide';

export interface ToolbarViewProps extends SkeletonProps {
  top?: Snippet;
  bottom?: Snippet;
  content?: Snippet;
  title?: string;
  subtitle?: string;
  start?: Snippet;
  end?: Snippet;
  center?: Snippet;
  mode?: ToolbarViewMode;
  compactMinWidth?: number;
  class?: string;
  ref?: unknown;
}

export interface ViewSwitcherView {
  id: string;
  title: string;
  icon?: Component<any> | null;
  disabled?: boolean;
}

export type ViewSwitcherMode = 'auto' | 'tabs' | 'segmented' | 'dropdown';

export interface ViewSwitcherProps extends SkeletonProps {
  views?: readonly ViewSwitcherView[];
  activeId?: string;
  mode?: ViewSwitcherMode;
  tabsMinWidth?: number;
  segmentedMinWidth?: number;
  dropdownLabel?: string;
  showIcons?: boolean;
  class?: string;
  ref?: unknown;
}

export interface ViewStackView {
  id: string;
  component?: Component<any> | null;
  props?: Record<string, any>;
}

export interface ViewStackProps extends SkeletonProps {
  views?: readonly ViewStackView[];
  activeId?: string;
  keepMounted?: boolean;
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface AdaptiveContentProps {
  activeBreakpoint?: string;
  fallback?: Snippet;
  children?: Snippet;
  [key: string]: unknown;
}

export interface ResponsiveSlotProps extends AdaptiveContentProps {}

export interface DensityProviderProps extends SkeletonProps {
  density?: Density | 'auto';
  compactBelow?: number;
  roomyAbove?: number;
  tokens?: Partial<DensityTokens>;
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface ActionBarItem {
  label?: string;
  icon?: Component<any> | null;
  variant?: ButtonVariant;
  disabled?: boolean;
  href?: string;
  onClick?: (event: MouseEvent) => void;
  action?: (event: MouseEvent) => void;
}

export type ActionBarMode = 'auto' | 'all' | 'overflow';

export interface ActionBarProps extends SkeletonProps {
  items?: readonly ActionBarItem[];
  mode?: ActionBarMode;
  spacing?: number;
  moreLabel?: string;
  moreIcon?: Component<any> | null;
  moreVariant?: ButtonVariant;
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface AdaptiveTableColumn {
  key: string;
  title?: string;
  sortable?: boolean;
}

export type AdaptiveTableMode = 'auto' | 'cards' | 'table';

export interface AdaptiveTableProps extends SkeletonProps {
  mode?: AdaptiveTableMode;
  stackAt?: number;
  columns?: readonly AdaptiveTableColumn[];
  rows?: readonly any[];
  selectable?: boolean;
  selectedRows?: readonly any[];
  titleKey?: string;
  onRowClick?: (row: any) => void;
  class?: string;
  ref?: unknown;
}

export interface AdaptiveMediaProps extends ImageProps {
  mode?: 'auto' | 'compact' | 'wide';
  stackAt?: number;
  wide?: Partial<ImageProps>;
  compact?: Partial<ImageProps>;
  class?: string;
  ref?: unknown;
}

export interface AdaptiveFormLayoutProps extends SkeletonProps {
  stackAt?: number;
  labelWidth?: Length;
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface AdaptiveFormRowProps {
  label?: string;
  help?: string;
  children?: Snippet;
  class?: string;
  [key: string]: unknown;
}

export interface HideBelowProps extends SkeletonProps {
  below?: number;
  mode?: HideBelowMode;
  children?: Snippet;
  fallback?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface OptionalProps extends SkeletonProps {
  below?: number;
  mode?: 'auto' | 'inline' | 'below';
  orderBelow?: number;
  unwrapInline?: boolean;
  children?: Snippet;
  class?: string;
  ref?: unknown;
}

export interface EngineDecoratorProps {
  children?: Snippet;
}

export interface PhIconProps {
  weight?: IconWeight;
  size?: number | string;
  color?: string;
  class?: string;
  mirrored?: boolean;
  paths?: Record<string, string>;
}

export const BaseField: Component<BaseFieldProps>;
export const Button: Component<ButtonProps>;
export const Card: Component<CardProps>;
export const Dialog: Component<DialogProps>;
export const Toast: Component<ToastProps>;
export const ToastOverlay: Component<ToastOverlayProps>;
export const Banner: Component<BannerProps>;
export const Grid: Component<GridProps>;
export const AdaptiveGrid: Component<AdaptiveGridProps>;
export const HBox: Component<HBoxProps>;
export const Wrapper: Component<WrapperProps>;
export const Container: Component<ContainerProps>;
export const Page: Component<PageProps>;
export const Clamp: Component<ClampProps>;
export const ClampScrollable: Component<ClampScrollableProps>;
export const Paned: Component<PanedProps>;
export const PopOver: Component<PopOverProps>;
export const PopOverWrapper: Component<PopOverWrapperProps>;
export const SelectField: Component<SelectFieldProps>;
export const SideLayout: Component<SideLayoutProps>;
export const AdaptiveLayout: Component<AdaptiveLayoutProps>;
export const Breakpoint: Component<BreakpointProps>;
export const Leaflet: Component<LeafletProps>;
export const NavigationSplitView: Component<NavigationSplitViewProps>;
export const NavigationView: Component<NavigationViewProps>;
export const Flap: Component<FlapProps>;
export const Slider: Component<SliderProps>;
export const TextField: Component<TextFieldProps>;
export const VBox: Component<VBoxProps>;
export const SlideOver: Component<SlideOverProps>;
export const SlideOverContent: Component<SlideOverContentProps>;
export const Carousel: Component<CarouselProps>;
export const ContextArea: Component<ContextAreaProps>;
export const MenuSwitcher: Component<MenuSwitcherProps>;
export const Notebook: Component<NotebookProps> & { Tab: Component<TabProps> };
export const StaticNotebook: Component<StaticNotebookProps>;
export const Switcher: Component<SwitcherProps>;
export const TabsSwitcher: Component<TabsSwitcherProps>;
export const ToolbarView: Component<ToolbarViewProps>;
export const ViewStack: Component<ViewStackProps>;
export const ViewSwitcher: Component<ViewSwitcherProps>;
export const TextRich: Component<TextRichProps>;
export const TitleBar: Component<TitleBarProps>;
export const Window: Component<WindowProps>;
export const Skeleton: Component<SkeletonComponentProps>;
export const DensityProvider: Component<DensityProviderProps>;
export const Text: Component<TextProps>;
export const AdaptiveContent: Component<AdaptiveContentProps>;
export const ResponsiveSlot: Component<ResponsiveSlotProps>;
export const EngineDecorator: Component<EngineDecoratorProps>;
export const Image: Component<ImageProps>;
export const TextArea: Component<TextAreaProps>;
export const NumberField: Component<NumberFieldProps>;
export const Checkbox: Component<CheckboxProps>;
export const RadioGroup: Component<RadioGroupProps>;
export const TagsInput: Component<TagsInputProps>;
export const ColorPicker: Component<ColorPickerProps>;
export const SearchField: Component<SearchFieldProps>;
export const FileChooser: Component<FileChooserProps>;
export const Separator: Component<SeparatorProps>;
export const Accordion: Component<AccordionProps>;
export const AccordionItem: Component<AccordionItemProps>;
export const Tooltip: Component<TooltipProps>;
export const Chip: Component<ChipProps>;
export const DataTable: Component<DataTableProps>;
export const Kbd: Component<KbdProps>;
export const ActionRow: Component<ActionRowProps>;
export const ActionBar: Component<ActionBarProps>;
export const PreferencesGroup: Component<PreferencesGroupProps>;
export const PreferencesPage: Component<PreferencesPageProps>;
export const EntryRow: Component<EntryRowProps>;
export const SwitchRow: Component<SwitchRowProps>;
export const SpinRow: Component<SpinRowProps>;
export const LevelBar: Component<LevelBarProps>;
export const AdaptiveTable: Component<AdaptiveTableProps>;
export const AdaptiveMedia: Component<AdaptiveMediaProps>;
export const AdaptiveFormLayout: Component<AdaptiveFormLayoutProps>;
export const AdaptiveFormRow: Component<AdaptiveFormRowProps>;
export const HideBelow: Component<HideBelowProps>;
export const Optional: Component<OptionalProps>;

export const Menu: Component<MenuProps> & { Item: Component<MenuItemProps> };

export const PhIcon: Component<PhIconProps>;

export function initTheme(...args: any[]): any;
export function getTheme(...args: any[]): any;
export function generateColorVariants(...args: any[]): any;
export const defaultTheme: any;

export const Engine: any;
export const EventBus: any;

export * from './icons';
