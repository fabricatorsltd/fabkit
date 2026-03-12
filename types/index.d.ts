// Auto-generated — do not edit

import type { Component } from 'svelte';

export type RGBA = readonly [number, number, number, number];
export type ColorValue = string | RGBA;
export type Length = number | string;
export type Box4<T = Length> = readonly [T, T, T, T];

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
export const ButtonVariant: Readonly<{
  primary: 'primary';
  secondary: 'secondary';
  destructive: 'destructive';
  flat: 'flat';
}>;

export interface StyleProps {
  bg?: ColorValue;
  color?: ColorValue;
  borderColor?: ColorValue;
  shadow?: string;
  margin?: Length | Box4;
  padding?: Length | Box4;
  borderWidth?: Length | Box4;
  borderRadius?: Length | Box4;
  class?: string;
  [key: string]: unknown;
}

export interface ButtonProps extends StyleProps {
  label?: string;
  icon?: unknown;
  labelBehavior?: 'auto' | 'always' | 'never';
  children?: unknown;
  disabled?: boolean;
  type?: string;
  square?: boolean;
  variant?: ButtonVariant;
  onClick?: (event: MouseEvent) => void;
}

export interface FlexBoxProps extends StyleProps {
  spacing?: Length | readonly [Length, Length];
  align?: Align;
  justify?: Justify;
  children?: unknown;
}

export interface HBoxProps extends FlexBoxProps {}
export interface VBoxProps extends FlexBoxProps {}

// System Utilities
export function resolveProps(props: Record<string, any>): {
  styles: string;
  className: string;
  filteredRest: Record<string, any>;
};

// Components
export const BaseField: Component<Record<string, any>>;
export const Button: Component<ButtonProps>;
export const Card: Component<Record<string, any>>;
export const Dialog: Component<Record<string, any>>;
export const Toast: Component<Record<string, any>>;
export const ToastOverlay: Component<Record<string, any>>;
export const Banner: Component<Record<string, any>>;
export const Grid: Component<Record<string, any>>;
export const AdaptiveGrid: Component<Record<string, any>>;
export const HBox: Component<HBoxProps>;
export const Wrapper: Component<Record<string, any>>;
export const Container: Component<Record<string, any>>;
export const Page: Component<Record<string, any>>;
export const Clamp: Component<Record<string, any>>;
export const ClampScrollable: Component<Record<string, any>>;
export const Paned: Component<Record<string, any>>;
export const PopOver: Component<Record<string, any>>;
export const PopOverWrapper: Component<Record<string, any>>;
export const SelectField: Component<Record<string, any>>;
export const SideLayout: Component<Record<string, any>>;
export const AdaptiveLayout: Component<Record<string, any>>;
export const Breakpoint: Component<Record<string, any>>;
export const Leaflet: Component<Record<string, any>>;
export const Flap: Component<Record<string, any>>;
export const Slider: Component<Record<string, any>>;
export const TextField: Component<Record<string, any>>;
export const VBox: Component<VBoxProps>;
export const SlideOver: Component<Record<string, any>>;
export const SlideOverContent: Component<Record<string, any>>;
export const Carousel: Component<Record<string, any>>;
export const ContextArea: Component<Record<string, any>>;
export const MenuSwitcher: Component<Record<string, any>>;
export const StaticNotebook: Component<Record<string, any>>;
export const Switcher: Component<Record<string, any>>;
export const TabsSwitcher: Component<Record<string, any>>;
export const ToolbarView: Component<Record<string, any>>;
export const ViewStack: Component<Record<string, any>>;
export const ViewSwitcher: Component<Record<string, any>>;
export const TextRich: Component<Record<string, any>>;
export const TitleBar: Component<Record<string, any>>;
export const Window: Component<Record<string, any>>;
export const Skeleton: Component<Record<string, any>>;
export const DensityProvider: Component<Record<string, any>>;
export const Text: Component<Record<string, any>>;
export const AdaptiveContent: Component<Record<string, any>>;
export const ResponsiveSlot: Component<Record<string, any>>;
export const EngineDecorator: Component<Record<string, any>>;
export const Image: Component<Record<string, any>>;
export const TextArea: Component<Record<string, any>>;
export const NumberField: Component<Record<string, any>>;
export const Checkbox: Component<Record<string, any>>;
export const RadioGroup: Component<Record<string, any>>;
export const TagsInput: Component<Record<string, any>>;
export const ColorPicker: Component<Record<string, any>>;
export const SearchField: Component<Record<string, any>>;
export const FileChooser: Component<Record<string, any>>;
export const Separator: Component<Record<string, any>>;
export const Accordion: Component<Record<string, any>>;
export const AccordionItem: Component<Record<string, any>>;
export const Tooltip: Component<Record<string, any>>;
export const Chip: Component<Record<string, any>>;
export const DataTable: Component<Record<string, any>>;
export const Kbd: Component<Record<string, any>>;
export const ActionRow: Component<Record<string, any>>;
export const PreferencesGroup: Component<Record<string, any>>;
export const PreferencesPage: Component<Record<string, any>>;
export const EntryRow: Component<Record<string, any>>;
export const SwitchRow: Component<Record<string, any>>;
export const SpinRow: Component<Record<string, any>>;
export const LevelBar: Component<Record<string, any>>;

// Composite exports (typed loosely)
export const Menu: any;
export const Notebook: any;

// Theme
export function initTheme(...args: any[]): any;
export function getTheme(...args: any[]): any;
export function generateColorVariants(...args: any[]): any;
export const defaultTheme: any;

// Density
export const DENSITIES: any;
export const DENSITY_TOKENS: any;
export function normalizeDensity(...args: any[]): any;
export function resolveDensityTokens(...args: any[]): any;
export function getDensityStore(...args: any[]): any;

// Utils
export const Engine: any;
export const EventBus: any;

// Icons
export * from './icons';
