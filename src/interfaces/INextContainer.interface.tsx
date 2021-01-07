import React from 'react';
import { ISlide } from 'src/interfaces/ISlide.interface';

export interface INextContainer {
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
  renderNextButton: (nextLabel?: string) => React.ReactNode;
  renderDoneButton: (doneLabel?: string) => React.ReactNode;
  isLastSlide: boolean;
  buttonsMaxSize: number;
}
