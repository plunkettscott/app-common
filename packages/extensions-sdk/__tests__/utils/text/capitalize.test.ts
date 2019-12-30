import capitalize from '../../../src/utils/text/capitalize';

describe('capitalize utility', () => {
  it("converts 'hi my name is Joe.' to 'Hi my name is Joe.'", () => {
    expect(capitalize('hi my name is Joe.')).toBe('Hi my name is Joe.');
  });

  it("converts '|3ye my name is Joe.' to '|3ye my name is Joe.'", () => {
    expect(capitalize('|3ye my name is Joe.')).toBe('|3ye my name is Joe.');
  });

  it('returns an empty string', () => {
    expect(capitalize('')).toBe('');
  });
});
