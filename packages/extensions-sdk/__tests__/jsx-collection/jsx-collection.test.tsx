// TODO: remove reliance on React for JSX
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import React from 'react';
import JSXItem from '../../src/JSXCollection/JSXItem';
import JSXCollection from '../../src/JSXCollection/JSXCollection';
import { JSXItemRenderFn } from '../../src/types';
import { testComponent } from './jsx-item.test';

const renderFn: JSXItemRenderFn = () => <div>item</div>;

describe('JSXCollection', () => {
  it('adds an item into the collection using `add`', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn);

    expect(collection.find('item')).toBeInstanceOf(JSXItem);
  });

  it('has the correct length when using `all` to return items', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn);

    expect(collection.all().length).toBe(1);
  });

  it('returns instance of JSXItem when using `find`', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn);

    expect(collection.find('item')).toBeInstanceOf(JSXItem);
  });

  it('throws an error when trying to find an item that does not exist', () => {
    const collection = new JSXCollection();

    try {
      collection.find('item');
    } catch (e) {
      expect(e.message).toBe(
        'The JSXItem key provided was not found. Did you mean to `add`?',
      );
    }
  });

  it('`isEmpty` returns true when a collection is empty', () => {
    const collection = new JSXCollection();

    expect(collection.isEmpty()).toBe(true);
  });

  it('`isEmpty` returns false when a collection is not empty', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn, 0);

    expect(collection.isEmpty()).toBe(false);
  });

  it('`has` returns true when the item exists in a collection', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn, 0);

    expect(collection.has('item')).toBe(true);
  });

  it('`has` returns false when the item does not exist in a collection', () => {
    const collection = new JSXCollection();

    expect(collection.has('item')).toBe(false);
  });

  it('returns the item when using `get`', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn, 123);

    expect(collection.get('item').getPriority()).toBe(123);
  });

  it('throws an error when trying to get an item that does not exist', () => {
    const collection = new JSXCollection();

    try {
      collection.get('item');
    } catch (e) {
      expect(e.message).toBe(
        'The JSXItem key provided was not found. Did you mean to `add`?',
      );
    }
  });

  it('throws an error when trying to add an item whose key is already in-use', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn, 0);

    try {
      collection.add('item', renderFn, 1);
    } catch (e) {
      expect(e.message).toBe(
        'The `key` provided already exists. Did you mean to `replace`?',
      );
    }
  });

  it('replaces the content in a JSXItem using `replace`', () => {
    const collection = new JSXCollection();

    collection.add('item', renderFn);

    const item = collection.get('item');
    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'div',
    });

    collection.replace('item', () => <p>replaced</p>);

    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'p',
    });
  });

  it('replaces the priority of a JSXItem using `replace`', () => {
    const collection = new JSXCollection();

    collection.add('item', renderFn, 100);

    const item = collection.get('item');
    expect(item.getPriority()).toBe(100);

    collection.replace('item', undefined, 300);

    expect(item.getPriority()).toBe(300);
    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'div',
    });
  });

  it('replaces the content and priority of a JSXItem using `replace`', () => {
    const collection = new JSXCollection();

    collection.add('item', renderFn, 100);
    const item = collection.get('item');

    collection.replace('item', () => <p>replaced</p>, 300);

    expect(item.getPriority()).toBe(300);
    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'p',
    });
  });

  it('throws an error when using `replace` for a key that does not exist', () => {
    const collection = new JSXCollection();

    try {
      collection.replace('item', renderFn);
    } catch (e) {
      expect(e.message).toBe(
        'The `key` provided does not exist. Did you mean to `add`?',
      );
    }
  });

  it('removes an item using `remove`', () => {
    const collection = new JSXCollection();
    collection.add('one', renderFn);
    collection.add('two', renderFn);

    expect(collection.all().length).toBe(2);
    collection.remove('one');

    expect(collection.all().length).toBe(1);

    expect(collection.get('two')).toBeInstanceOf(JSXItem);
  });

  it('throws an error when using `remove` for a key that does not exist', () => {
    const collection = new JSXCollection();

    try {
      collection.remove('item');
    } catch (e) {
      expect(e.message).toBe('The `key` provided does not exist.');
    }
  });

  it('merges two collections with unique keys using `merge`', () => {
    const intoCollection = new JSXCollection();
    intoCollection.add('item', renderFn);

    const otherCollection = new JSXCollection();
    otherCollection.add('unique', renderFn);

    expect(intoCollection.all().length).toBe(1);
    expect(otherCollection.all().length).toBe(1);

    intoCollection.merge(otherCollection);

    expect(intoCollection.all().length).toBe(2);
  });

  it('errors when merging a collection with non-unique keys and safety enabled', () => {
    const intoCollection = new JSXCollection();
    intoCollection.add('item', renderFn);

    const otherCollection = new JSXCollection();
    otherCollection.add('item', renderFn);

    expect(intoCollection.all().length).toBe(1);
    expect(otherCollection.all().length).toBe(1);

    try {
      intoCollection.merge(otherCollection);
    } catch (e) {
      expect(e.message).toBe(
        'Unable to merge, the incoming collection would override a key on the current collection. Disable safety if this is intentional.',
      );
    }
  });

  it('merges a collection with non-unique keys when safety is disabled', () => {
    const intoCollection = new JSXCollection();
    intoCollection.add('item', renderFn);

    const otherCollection = new JSXCollection();
    otherCollection.add('item', renderFn);

    expect(intoCollection.all().length).toBe(1);
    expect(otherCollection.all().length).toBe(1);

    expect(intoCollection.merge(otherCollection, false).all().length).toBe(1);
  });

  it('renders a collection', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn, 0);
    collection.add('item2', () => <p>item2</p>);

    const rendered = collection.render(testComponent.vm.$createElement);
    expect(rendered.length).toBe(2);
    expect(rendered[0]).toMatchObject({ type: 'div' });
    expect(rendered[1]).toMatchObject({ type: 'p' });
  });

  it('properly prioritizes items (positives)', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn, 100);
    collection.add('item2', () => <p>item2</p>, 200);

    const rendered = collection.render(testComponent.vm.$createElement);
    expect(rendered.length).toBe(2);
    expect(rendered[0]).toMatchObject({ type: 'p' });
    expect(rendered[1]).toMatchObject({ type: 'div' });
  });

  it('properly prioritizes items (negatives)', () => {
    const collection = new JSXCollection();
    collection.add('item', renderFn, -200);
    collection.add('item2', () => <p>item2</p>, -100);

    const rendered = collection.render(testComponent.vm.$createElement);
    expect(rendered.length).toBe(2);
    expect(rendered[0]).toMatchObject({ type: 'p' });
    expect(rendered[1]).toMatchObject({ type: 'div' });
  });
});
