// Auto-generated — do not edit

import type { Component } from 'svelte';
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
  borderColor?: ColorValue;
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

  borderColor?: ColorValue;
  borderColorHover?: ColorValue;
  borderColorFocus?: ColorValue;
  borderColorActive?: ColorValue;

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

export interface ButtonProps extends SkeletonProps {
  label?: string;
  icon?: Component<any> | null;
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
export const Grid: Component<GridProps>;
export const HBox: Component<HBoxProps>;
export const Wrapper: Component<WrapperProps>;
export const Clamp: Component<ClampProps>;
export const Paned: Component<PanedProps>;
export const PopOver: Component<PopOverProps>;
export const PopOverWrapper: Component<PopOverWrapperProps>;
export const SelectField: Component<SelectFieldProps>;
export const SideLayout: Component<SideLayoutProps>;
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
export const TextRich: Component<TextRichProps>;
export const TitleBar: Component<TitleBarProps>;
export const Window: Component<WindowProps>;
export const Skeleton: Component<SkeletonComponentProps>;
export const Text: Component<TextProps>;
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
export const PreferencesGroup: Component<PreferencesGroupProps>;
export const PreferencesPage: Component<PreferencesPageProps>;
export const EntryRow: Component<EntryRowProps>;
export const SwitchRow: Component<SwitchRowProps>;
export const SpinRow: Component<SpinRowProps>;
export const LevelBar: Component<LevelBarProps>;

export const Menu: Component<MenuProps> & { Item: Component<MenuItemProps> };

export const PhIcon: Component<PhIconProps>;

export function initTheme(...args: any[]): any;
export function getTheme(...args: any[]): any;
export function generateColorVariants(...args: any[]): any;
export const defaultTheme: any;

export const Engine: any;
export const EventBus: any;

export * from './icons';
