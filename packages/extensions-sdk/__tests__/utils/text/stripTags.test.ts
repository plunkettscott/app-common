import stripTags from '../../../src/utils/text/stripTags';

describe('stripTags utility', () => {
  it('properly removes tags', () => {
    expect(stripTags('<div><p>hello!</p></div>')).toBe('hello!');
  });

  it('removes all attributes as well', () => {
    expect(
      stripTags("<div class='color'><p>hello!</p> <img src='/' /></div>"),
    ).toBe('hello! ');
  });
});
