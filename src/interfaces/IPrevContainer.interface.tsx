import React from 'react';
import { Animated } from 'react-native';
import { ISlide } from 'src/interfaces/ISlide.interface';

export interface IPrevContainer {
  setDefaultState: () => void;
  onSkip: () => void;
  buttonsMaxSize: number;
  _opacityOfSkipButton: Animated.Value;
  renderSkipButton: (skipLabel?: string) => React.ReactNode;
  type: 'previous' | 'skip';
  goToNewSlide: (
    nextActive: number,
    slide: ISlide,
    setSlide: (arg0: ISlide) => void,
    numberOfSlide: number,
    onDone: () => void,
    navContainerMaxSize: number,
    dotWidth: number,
    deviceMaxWidth: number
  ) => void;
  slide: ISlide;
  setSlide: (arg0: ISlide) => void;
  numberOfSlide: number;
  onDone: () => void;
  navContainerMaxSize: number;
  dotWidth: number;
  deviceMaxWidth: number;
  showLeftButton: boolean;
}
