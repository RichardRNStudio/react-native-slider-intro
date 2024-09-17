import type { PanResponderInstance } from 'react-native';
import type { ISliderIntro } from './ISliderIntro.interface';
import type { ISlide } from './ISlide.interface';

declare type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ISliderContextProps extends ISliderIntro {
  numberOfSlides: number;
  navContainerMaxSize: number;
  dotMaxPossibleWidth: number;
  buttonsMaxSize: number;
  slidesMaxWidth: number;
  panResponderState: [PanResponderInstance, SetState<PanResponderInstance>];
  sliderState: [ISlide, SetState<ISlide>];
}

export interface ISliderProviderProps extends ISliderIntro {
  children: React.ReactNode;
  isCustomRender: boolean;
}
