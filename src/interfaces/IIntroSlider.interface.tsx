import React from "react";
import { IData } from "./IData.interface";

export interface IIntroSlider {
  data: IData[];
  renderItem: (item: IData) => React.ReactNode;
  navigationBarPosition: number;
  animateSlideSpeed: number;
  navContainerMaxSizePercent: number;
  dotWidth: number;
  fixDotOpacity: number;
  fixDotBackgroundColor: string;
  animatedDotBackgroundColor: string;
  animateDotSpeed: number;
  animateDotBouncing: number;
  hasReactNavigation: boolean;
  backHandlerBehaviour: 'ActiveMinusOne' | 'Previous';
  skipLabel: string;
  nextLabel: string;
  doneLabel: string;
  renderSkipButton: (skipLabel: string) => React.ReactNode;
  renderNextButton: (nextLabel: string) => React.ReactNode;
  renderDoneButton: (doneLabel: string) => React.ReactNode;
  onSkip: () => void;
  onDone: () => void;
}
