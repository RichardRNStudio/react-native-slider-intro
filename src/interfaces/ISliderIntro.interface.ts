import React from 'react';
import type { IItem } from './IItem.interface';
import type { ISlide } from './ISlide.interface';
import type { ColorValue } from 'react-native';

declare type BackHandlerType = 'activeMinusOne' | 'previous';

declare type LeftButtonType = 'previous' | 'skip';

export interface ISliderIntro {
  data: IItem[];
  renderItem: (item: IItem) => React.ReactNode;
  navigationBarBottom: number;
  navigationBarHeight: number;
  animateSlideSpeed: number;
  navContainerMaxSizePercent: number;
  dotWidth: number;
  fixDotOpacity: number;
  fixDotBackgroundColor: ColorValue;
  animatedDotBackgroundColor: ColorValue;
  animateDotSpeed: number;
  animateDotBouncing: number;
  hasReactNavigation: boolean;
  useCustomBackHandlerEffect: (
    active: number,
    onBackPress: (
      backHandlerBehaviour: BackHandlerType,
      slide: ISlide,
      setSlide: (arg0: ISlide) => void,
      numberOfSlide: number,
      onDone: () => void,
      navContainerMaxSize: number,
      dotWidth: number,
      deviceMaxWidth: number
    ) => boolean,
    backHandlerBehaviour: BackHandlerType,
    slide: ISlide,
    setSlide: (arg0: ISlide) => void,
    numberOfSlide: number,
    onDone: () => void,
    navContainerMaxSize: number,
    dotWidth: number,
    deviceMaxWidth: number
  ) => void;
  backHandlerBehaviour: BackHandlerType;
  skipLabel: string;
  nextLabel: string;
  doneLabel: string;
  renderSkipButton: (skipLabel: string) => React.ReactNode;
  renderNextButton: (nextLabel: string) => React.ReactNode;
  renderDoneButton: (doneLabel: string) => React.ReactNode;
  onSkip: () => void;
  onDone: () => void;
  showLeftButton: boolean;
  leftButtonType: LeftButtonType;
  columnButtonStyle: boolean;
  showStatusBar: boolean;
  statusBarColor: ColorValue;
  renderStatusBar: (backgroundColor: ColorValue) => React.ReactNode;
}
