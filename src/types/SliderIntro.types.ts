import React from 'react';
import type { SliderIntroItemProps } from './SliderIntroItem.types';
import type { Slide } from './Slide.types';
import type { ColorValue } from 'react-native';

export enum BackHandlerType {
  ActiveMinusOne = 'activeMinusOne',
  Previous = 'previous',
}

type LeftButtonType = 'previous' | 'skip';

export interface SliderIntroProps {
  /**
   * Default render - array of items. Children will be ignored if data is passed.
   */
  data: SliderIntroItemProps[];
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
      slide: Slide,
      setSlide: (arg0: Slide) => void,
      numberOfSlide: number,
      onDone: () => void,
      navContainerMaxSize: number,
      dotWidth: number,
      deviceMaxWidth: number
    ) => boolean,
    backHandlerBehaviour: BackHandlerType,
    slide: Slide,
    setSlide: (arg0: Slide) => void,
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
  limitToSlide: number;
}
