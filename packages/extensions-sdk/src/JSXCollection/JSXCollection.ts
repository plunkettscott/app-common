import { CreateElement, VNode } from 'vue';
import JSXItem from './JSXItem';
import { JSXItemsObject, JSXItemRenderFn } from '../types';

export default class JSXCollection {
  private items: JSXItemsObject = {};

  /**
   * Retrieves all items from the JSXCollection.
   */
  public all(): Array<JSXItem> {
    return Object.keys(this.items).map((i) => this.find(i));
  }

  /**
   * Retrieves the raw JSXItemsObject from the collection.
   */
  public object(): JSXItemsObject {
    return this.items;
  }

  /**
   * Finds and returns a JSXItem from the JSXCollection. Returns
   * null if the item does not exist.
   *
   * @param key The JSXItem key
   */
  public find(key: string): JSXItem {
    if (this.has(key)) {
      return this.items[key];
    }

    throw new Error(
      'The JSXItem key provided was not found. Did you mean to `add`?',
    );
  }

  /**
   * Returns whether or not the JSXCollection is empty or not.
   */
  public isEmpty(): boolean {
    return Object.keys(this.items).length === 0;
  }

  /**
   * Determines whether the provided key exists in the JSXCollection.
   *
   * @param key The JSXItem key
   */
  public has(key: string): boolean {
    return this.items[key] !== null && this.items[key] !== undefined;
  }

  /**
   * Finds and returns a JSXItem from the JSXCollection. Returns
   * null if the item does not exist. Alias to find().
   *
   * @param key The JSXItem key
   */
  public get(key: string): JSXItem {
    return this.find(key);
  }

  /**
   * Adds a JSXItem to the JSXCollection.
   *
   * @param key The JSXItem key
   * @param content The JSXItemRenderFn
   * @param priority The priority to order by, higher to lower.
   */
  public add(
    key: string,
    content: JSXItemRenderFn,
    priority = 0,
  ): JSXCollection {
    if (this.has(key)) {
      throw new Error(
        'The `key` provided already exists. Did you mean to `replace`?',
      );
    }

    this.items[key] = new JSXItem(content, priority);

    return this;
  }

  /**
   * Replaces a JSXItem's content and priority by key with the provided
   * content and priority.
   *
   * @param key The JSXItem key to replace
   * @param content The JSXItemRenderFn to use for the JSXItem.
   * @param priority The priority if it should be changed
   */
  public replace(
    key: string,
    content?: JSXItemRenderFn,
    priority?: number | null,
  ): JSXCollection {
    if (!this.has(key)) {
      throw new Error(
        'The JSXItem key provided was not found. Did you mean to `add`?',
      );
    }

    const item = this.find(key);
    if (content !== null && content !== undefined) {
      item.setContent(content);
    }

    if (priority !== null && priority !== undefined) {
      item.setPriority(priority);
    }

    return this;
  }

  /**
   * Removes a JSXItem by key.
   *
   * @param key The JSXItem key to remove
   */
  public remove(key: string): JSXCollection {
    if (!this.has(key)) {
      throw new Error('The `key` provided does not exist.');
    }

    // TODO: Is this reactive?
    delete this.items[key];

    return this;
  }

  /**
   * Merges a JSXCollection into this JSXCollection, retaining
   * existing priorities. If `safe` is true, an error will be thrown
   * if the merging would override any existing keys. Passing false to
   * safe will allow merging of collection keys.
   *
   * @param collection A JSXCollection to merge
   * @param safe Whether or not to perform the operation safely.
   */
  public merge(collection: JSXCollection, safe = true): JSXCollection {
    for (const i in collection.object()) {
      if (this.has(i) && safe) {
        throw new Error(
          'Unable to merge, the incoming collection would override a key on the current collection. Disable safety if this is intentional.',
        );
      }

      this.items[i] = collection.find(i);
    }

    return this;
  }

  /**
   * Returns a renderable Array of JSXItems as JSX elements.
   *
   * @param h The CreateElement form the Vue component.
   */
  public render(h: CreateElement): Array<VNode | JSX.Element> {
    const renderItems: Array<JSXItem> = [];

    for (const i in this.all()) {
      if (this.has(i)) {
        const item = this.find(i);

        item.setIndex(renderItems.length);
        renderItems.push(item);
      }
    }

    return this.all()
      .sort((a: JSXItem, b: JSXItem): number => {
        if (a.getPriority() === b.getPriority()) {
          return a.getIndex() - b.getIndex();
        } else if (a.getPriority() > b.getPriority()) {
          return -1;
        }

        return 1;
      })
      .map((item) => item.render(h));
  }
}
