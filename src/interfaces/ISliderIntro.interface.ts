import React from 'react';
import type { ISliderIntroItem } from './ISliderIntroItem.interface';
import type { ISlide } from './ISlide.interface';
import type { ColorValue } from 'react-native';

declare type BackHandlerType = 'activeMinusOne' | 'previous';

declare type LeftButtonType = 'previous' | 'skip';

export interface ISliderIntro {
  /**
   * Default render - array of items. Children will be ignored if data is passed.
   */
  data: ISliderIntroItem[];
  /**
   * Custom render - if children is passed, data will be ignored. numberOfSlides is required in this case.
   */
  numberOfSlides: number;
  /**
   * Custom render - children elements to render.
   */
  children: React.ReactNode;
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
