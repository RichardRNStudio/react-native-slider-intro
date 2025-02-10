import React from 'react';
import type { ColorValue } from 'react-native';
import type { SliderIntroItemProps } from './SliderIntroItem.types';
import type { ButtonType } from './Button.types';

export enum BackHandlerType {
  ActiveMinusOne = 'activeMinusOne',
  Previous = 'previous',
}

type LeftButtonType = 'previous' | ButtonType.Skip;

export type SliderIntroProps = {
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
  skipLabel: string;
  nextLabel: string;
  doneLabel: string;
  showLeftButton: boolean;
  leftButtonType: LeftButtonType;
  columnButtonStyle: boolean;
  limitToSlide: number;
  renderSkipButton?: (skipLabel: string) => React.ReactNode;
  renderNextButton?: (nextLabel: string) => React.ReactNode;
  renderDoneButton?: (doneLabel: string) => React.ReactNode;
  onSkip?: () => void;
  onDone?: () => void;
};
