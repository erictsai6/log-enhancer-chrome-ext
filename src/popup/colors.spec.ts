import { getRandomColor } from './colors';

describe('popup/colors.ts', () => {
  it('should return a random color in hex without the #', () => {
    const randomColor = getRandomColor();
    expect(randomColor).toBeTruthy();
    expect(randomColor.length).toEqual(6);
    expect(randomColor[0]).not.toEqual('#');
  })
})