import type { PanResponderInstance } from 'react-native';
import type { SliderIntroProps } from './SliderIntro.types';
import type { Slide } from './Slide.types';

declare type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface SliderContextProps extends SliderIntroProps {
  numberOfSlides: number;
  navContainerMaxSize: number;
  dotMaxPossibleWidth: number;
  buttonsMaxSize: number;
  slidesMaxWidth: number;
  panResponderState: [PanResponderInstance, SetState<PanResponderInstance>];
  sliderState: [Slide, SetState<Slide>];
}

export interface SliderProviderProps extends SliderIntroProps {
  children: React.ReactNode;
  isCustomRender: boolean;
}
