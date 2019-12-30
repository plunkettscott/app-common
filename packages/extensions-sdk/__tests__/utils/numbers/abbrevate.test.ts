import abbreviate from '../../../src/utils/numbers/abbreviate';

describe('abbreviateNum utility', () => {
  it('leaves below 1000 alone', () => {
    expect(abbreviate(999)).toBe('999');
  });

  it('abbreviates 1,091 to 1K', () => {
    expect(abbreviate(1091)).toBe('1K');
  });

  it('abbreviates 1,298 to 1K', () => {
    expect(abbreviate(1298)).toBe('1K');
  });

  it('abbreviates 1,000,000 to 1M', () => {
    expect(abbreviate(1000000)).toBe('1M');
  });

  it('abbreviates 1,000,100 to 1M', () => {
    expect(abbreviate(1000100)).toBe('1M');
  });
});
