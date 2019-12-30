import truncate from '../../../src/utils/text/truncate';

describe('truncate utility', () => {
  it("converts 'The quick brown fox jumps over the lazy dog.' to  'The quick brown fox...'", () => {
    expect(truncate('The quick brown fox jumps over the lazy dog.', 20)).toBe(
      'The quick brown fox...',
    );
  });

  it("converts 'The quick brown fox jumps over the lazy dog.' to  'The quick brown fox...'", () => {
    expect(truncate('The quick brown fox jumps over the lazy dog.', 21)).toBe(
      'The quick brown fox j...',
    );
  });

  it("converts 'The quick brown fox jumps over the lazy dog.' to  'The quick brown fox...'", () => {
    expect(truncate('The quick brown fox jumps over the lazy dog.', 19)).toBe(
      'The quick brown fox...',
    );
  });

  it('remains the same by providing a length equal to the string length', () => {
    expect(truncate('Hello', 5, '...')).toBe('Hello');
  });

  it('remains the same by providing a length greater than the string length', () => {
    expect(truncate('Hello', 100, '...')).toBe('Hello');
  });

  it('throws an error by providing a negative length', () => {
    try {
      truncate('Hello', -1, '...');
    } catch (e) {
      expect(e.message).toBe(
        'Cannot truncate a string that is less than zero.',
      );
    }
  });
});
