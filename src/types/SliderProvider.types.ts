import type { AnimatedValues } from './AnimatedValues.types';
import type { Slide } from './Slide.types';
import type { SliderIntroProps } from './SliderIntro.types';
export interface SliderContextProps extends SliderIntroProps {
  numberOfSlides: number;
  navContainerMaxSize: number;
  dotMaxPossibleWidth: number;
  buttonsMaxSize: number;
  slidesMaxWidth: number;
  slide: Slide;
  setDefaultState: () => void;
  animations: AnimatedValues;
  goToNewSlide: (active: number) => void;
  isLastSlide: boolean;
}

export interface SliderProviderProps extends Partial<SliderIntroProps> {
  children: React.ReactNode;
  isCustomRender: boolean;
}
