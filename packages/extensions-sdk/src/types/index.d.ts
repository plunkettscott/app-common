import { CreateElement, VNode } from 'vue';
import JSXItem from '../JSXCollection/JSXItem';

export interface JSXItemsObject {
  [key: string]: JSXItem;
}

export interface JSXItemRenderFn {
  (h: CreateElement): VNode | JSX.Element;
}

export interface RGBAColorObject {
  r: number;
  g: number;
  b: number;
  a: number;
}
