import { CreateElement, VNode } from 'vue';
import JSXItem from '../JSXCollection/JSXItem';
import { ExtendFunction } from '@nuxt/types/config/module';
import { Configuration } from '@nuxt/types';
import { NuxtRouteConfig } from '@nuxt/types/config/router';

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

interface ExtendRoutesFunction {
  (
    routes: NuxtRouteConfig[],
    resolve: (...pathSegments: string[]) => string,
  ): void;
}

export interface ExtensionThis {
  extendBuild(fn: ExtendFunction): void;
  extendRoutes(fn: ExtendRoutesFunction): void;
  options: Configuration;
  nuxt: any; // TBD
  [key: string]: any; // TBD
}
