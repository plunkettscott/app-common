import { JSXItemRenderFn } from '../types';
import { CreateElement, VNode } from 'vue';

export default class JSXItem {
  private index = 0;
  private priority: number;
  private content: JSXItemRenderFn;

  /** Constructor */
  public constructor(content: JSXItemRenderFn, priority = 0) {
    this.content = content;
    this.priority = priority;
  }

  /**
   * Returns the JSXItemRenderFn for the JSXItem.
   */
  public getContent(): JSXItemRenderFn {
    return this.content;
  }

  /**
   * Sets the render function used to render the element.
   *
   * @param content The JSXItemRenderFn for the JSXItem.
   */
  public setContent(content: JSXItemRenderFn): void {
    this.content = content;
  }

  /**
   * Returns the priority for the JSXItem.
   */
  public getPriority(): number {
    return this.priority;
  }

  /**
   * Sets the order priority for the JSXItem.
   *
   * @param priority Priority of the JSXItem in relation to others.
   */
  public setPriority(priority: number): void {
    this.priority = priority;
  }

  /**
   * Returns the JSXItem index.
   */
  public getIndex(): number {
    return this.index;
  }

  /**
   * Sets the unique index for the JSXItem.
   *
   * @param index The unique index
   */
  public setIndex(index: number): void {
    this.index = index;
  }

  /**
   * Renders the JSXItem as a JSX Element.
   *
   * @param h The CreateElement instance from the Vue component.
   */
  public render(h: CreateElement): VNode | JSX.Element {
    return this.getContent()(h);
  }
}
