import React from 'react';
import { IItem } from './IItem.interface';
import { ISlide } from './ISlide.interface';

export interface ISliderIntro {
  data: IItem[];
  renderItem: (item: IItem) => React.ReactNode;
  navigationBarBottom: number;
  navigationBarHeight: number;
  animateSlideSpeed: number;
  navContainerMaxSizePercent: number;
  dotWidth: number;
  fixDotOpacity: number;
  fixDotBackgroundColor: string;
  animatedDotBackgroundColor: string;
  animateDotSpeed: number;
  animateDotBouncing: number;
  hasCustomBackHandler: boolean;
  useCustomBackHandlerEffect: (
    active: number,
    onBackPress: (
      backHandlerBehaviour: 'activeMinusOne' | 'previous',
      slide: ISlide,
      setSlide: (arg0: ISlide) => void,
      numberOfSlide: number,
      onDone: () => void,
      navContainerMaxSize: number,
      dotWidth: number,
      deviceMaxWidth: number
    ) => boolean,
    backHandlerBehaviour: 'activeMinusOne' | 'previous',
    slide: ISlide,
    setSlide: (arg0: ISlide) => void,
    numberOfSlide: number,
    onDone: () => void,
    navContainerMaxSize: number,
    dotWidth: number,
    deviceMaxWidth: number
  ) => void;
  backHandlerBehaviour: 'activeMinusOne' | 'previous';
  skipLabel: string;
  nextLabel: string;
  doneLabel: string;
  renderSkipButton: (skipLabel: string) => React.ReactNode;
  renderNextButton: (nextLabel: string) => React.ReactNode;
  renderDoneButton: (doneLabel: string) => React.ReactNode;
  onSkip: () => void;
  onDone: () => void;
  showLeftButton: boolean;
  leftButtonType: 'previous' | 'skip';
  columnButtonStyle: boolean;
  showStatusBar: boolean;
  statusBarColor: string;
}
