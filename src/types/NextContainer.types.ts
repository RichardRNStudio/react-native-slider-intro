import type { Slide } from './Slide.types';

export interface NextContainerProps {
  goToNewSlide: (slideIndex: number) => void;
  isLastSlide: boolean;
  animations: Slide['animations'];
}
