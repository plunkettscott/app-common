import slugify from '../../../src/utils/text/slugify';

describe('slugify utility', () => {
  it("converts 'this is a string 122142wu90w' to 'this-is-a-string-122142wu90w'", () => {
    expect(slugify('this is a string 122142wu90w')).toBe(
      'this-is-a-string-122142wu90w',
    );
  });

  it("converts 'hi there $# 42 5 ^' to 'hi-there-42-5'", () => {
    expect(slugify('hi there $# 42 5 ^')).toBe('hi-there-42-5');
  });

  it("converts 'my name is spencer' to 'my-name-is-spencer'", () => {
    expect(slugify('my name is spencer')).toBe('my-name-is-spencer');
  });
});
