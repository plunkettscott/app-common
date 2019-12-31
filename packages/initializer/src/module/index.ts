import { resolve } from 'path';
import { Module } from '@nuxt/types';

const moduleRoot = resolve(__dirname);
const root = resolve(moduleRoot, '..');

/**
 * Handles initializing and installing the bare components for the
 * Response App to function properly.
 *
 * @param options The options to provide the module.
 */
const module: Module<InitializerOptions> = function(options) {
  // add Vuetify
};

export default module;
