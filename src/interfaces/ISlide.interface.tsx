import { IAnimatedValues } from "./IAnimatedValues.interface";

export interface ISlide {
  active: number;
  previous: number;
  marginLeft: number;
  dotMarginLeft: number;
  expectOpacityOfNext: number;
  expectOpacityOfDone: number;
  expectOpacityOfSkip: number;
  animations: IAnimatedValues;
}
