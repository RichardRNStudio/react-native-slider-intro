import type { PanResponderInstance } from 'react-native';
import type { ISliderIntro } from './ISliderIntro.interface';
import type { ISlide } from './ISlide.interface';

declare type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface ISliderContextProps extends ISliderIntro {
  panResponderState: [PanResponderInstance, SetState<PanResponderInstance>];
  sliderState: [ISlide, SetState<ISlide>];
  animations: ISlide['animations'];
  numberOfSlides: number;
  navContainerMaxSize: number;
  dotMaxPossibleWidth: number;
  buttonsMaxSize: number;
  goToNewSlide: (newSlide: number) => void;
  setDefaultState: () => void;
  isLastSlide: boolean;
}

export interface ISliderProviderProps extends ISliderIntro {
  children: React.ReactNode;
}
