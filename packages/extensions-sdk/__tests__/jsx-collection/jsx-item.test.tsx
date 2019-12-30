// TODO: remove reliance on React for JSX
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars
import React from 'react';

import { Vue, Component, Prop } from 'vue-property-decorator';
import { mount } from '@vue/test-utils';

import JSXItem from '../../src/JSXCollection/JSXItem';

@Component
export class EchoComponent extends Vue {
  @Prop()
  item!: JSXItem;

  render(): JSX.Element {
    return <p></p>;
  }
}
export const testComponent = mount(EchoComponent);

describe('JSXItem', () => {
  it('creates an instance with only content', async () => {
    const item = new JSXItem(() => <div>item</div>);

    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'div',
    });

    expect(item.getPriority()).toBe(0);
  });

  it('creates an instance with content and priority', async () => {
    const item = new JSXItem(() => <div>item</div>, 100);

    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'div',
    });

    expect(item.getPriority()).toBe(100);
  });

  it('has a default index of 0', async () => {
    const item = new JSXItem(() => <div>item</div>);

    expect(item.getIndex()).toBe(0);
  });

  it('allows setting of the index after creation', async () => {
    const item = new JSXItem(() => <div>item</div>);

    expect(item.getIndex()).toBe(0);

    item.setIndex(1);
    expect(item.getIndex()).toBe(1);
  });

  it('allows updating the content after creation', async () => {
    const item = new JSXItem(() => <div>item</div>);

    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'div',
    });

    item.setContent(() => <p>item</p>);

    expect(item.render(testComponent.vm.$createElement)).toMatchObject({
      type: 'p',
    });
  });

  it('allows updating the priority after creation', async () => {
    const item = new JSXItem(() => <div>item</div>, 100);

    expect(item.getPriority()).toBe(100);

    item.setPriority(0);

    expect(item.getPriority()).toBe(0);
  });
});
