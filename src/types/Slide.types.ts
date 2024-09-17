import type { AnimatedValues } from './AnimatedValues.types';

export type Slide = {
  active: number;
  previous: number;
  marginLeft: number;
  dotMarginLeft: number;
  expectOpacityOfNext: number;
  expectOpacityOfDone: number;
  expectOpacityOfSkip: number;
  animations: AnimatedValues;
};
