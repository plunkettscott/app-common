import { default as stringToHslColor } from '../../../src/utils/colors/stringToHslColor';

describe('stringToHslColor utility', () => {
  it('converts Scott or scott to the same correct hsl', () => {
    expect(stringToHslColor('Scott')).toBe('hsl(287, 82%, 47%)');
    expect(stringToHslColor('scott')).toBe('hsl(287, 82%, 47%)');
  });

  it('converts Spencer or spencer to the same correct hsl', () => {
    expect(stringToHslColor('Spencer')).toBe('hsl(202, 92%, 42%)');
    expect(stringToHslColor('spencer')).toBe('hsl(202, 92%, 42%)');
  });

  it('converts Travis or travis to the same correct hsl', () => {
    expect(stringToHslColor('Travis')).toBe('hsl(229, 84%, 49%)');
    expect(stringToHslColor('travis')).toBe('hsl(229, 84%, 49%)');
  });

  it('converts Giovanni or giovanni to the same correct hsl', () => {
    expect(stringToHslColor('Giovanni')).toBe('hsl(297, 82%, 57%)');
    expect(stringToHslColor('giovanni')).toBe('hsl(297, 82%, 57%)');
  });

  it('converts Xander or xander to the same correct hsl', () => {
    expect(stringToHslColor('Xander')).toBe('hsl(356, 91%, 56%)');
    expect(stringToHslColor('xander')).toBe('hsl(356, 91%, 56%)');
  });
});
