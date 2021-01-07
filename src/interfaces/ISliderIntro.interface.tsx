import React from 'react';
import { IItem } from './IItem.interface';

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
  hasReactNavigation: boolean;
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
