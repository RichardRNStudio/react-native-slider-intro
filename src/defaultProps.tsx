import React from 'react';
import { Dimensions, type ColorValue } from 'react-native';
import Button from './components/Button';
import StatusBarContainer from './components/StatusBarContainer';
import {
  BackHandlerType,
  type SliderIntroProps,
} from './types/SliderIntro.types';
import { ButtonType } from './types';

const deviceMaxWidth = Dimensions.get('window').width;

const defaultProps: SliderIntroProps = {
  data: [],
  children: null,
  numberOfSlides: 0,
  navigationBarBottom: 0,
  navigationBarHeight: 70,
  animateSlideSpeed: 15,
  navContainerMaxSizePercent: 0.5,
  dotWidth: 12,
  fixDotOpacity: 0.35,
  fixDotBackgroundColor: 'grey',
  animatedDotBackgroundColor: 'white',
  animateDotSpeed: 8,
  animateDotBouncing: 2,
  backHandlerBehaviour: BackHandlerType.ActiveMinusOne,
  hasReactNavigation: false,
  useCustomBackHandlerEffect: () => {},
  skipLabel: 'Skip',
  nextLabel: 'Next',
  doneLabel: 'Done',
  renderSkipButton: (skipLabel: string | undefined) => (
    <Button label={skipLabel} type={ButtonType.Skip} />
  ),
  renderNextButton: (nextLabel: string | undefined) => (
    <Button label={nextLabel} type={ButtonType.Next} />
  ),
  renderDoneButton: (doneLabel: string | undefined) => (
    <Button label={doneLabel} type={ButtonType.Done} />
  ),
  onDone: () => {},
  onSkip: () => {},
  showLeftButton: true,
  leftButtonType: 'skip',
  columnButtonStyle: false,
  showStatusBar: false,
  statusBarColor: '#febe29',
  renderStatusBar: (backgroundColor: ColorValue) => (
    <StatusBarContainer backgroundColor={backgroundColor} />
  ),
  limitToSlide: deviceMaxWidth * 0.35,
};

export default defaultProps;
