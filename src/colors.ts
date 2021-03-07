import * as randomColor from 'randomcolor';

export function getRandomColor() {
  return randomColor().replace('#', '');
}