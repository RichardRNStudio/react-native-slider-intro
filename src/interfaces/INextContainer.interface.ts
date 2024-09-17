import type { ISlide } from './ISlide.interface';

export interface INextContainerProps {
  goToNewSlide: (slideIndex: number) => void;
  isLastSlide: boolean;
  animations: ISlide['animations'];
}
