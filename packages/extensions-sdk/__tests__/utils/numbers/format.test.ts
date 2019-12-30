import { default as format } from '../../../src/utils/numbers/format';

describe('formatNumber utility', () => {
  it('converts 1234 into 1,234', () => {
    const num = format(1234);

    expect(num).toBe('1,234');
  });

  it('converts 1000000 to 1,000,000', () => {
    const num = format(1000000);

    expect(num).toBe('1,000,000');
  });
});
