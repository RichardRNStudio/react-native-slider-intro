import React from 'react';
import Item from './components/Item';
import StatusBarContainer from './components/StatusBarContainer';
import type { IItem } from './interfaces/IItem.interface';
import type { ISliderIntro } from './interfaces/ISliderIntro.interface';
import Button from './components/Button';
import type { ColorValue } from 'react-native';

const defaultProps: ISliderIntro = {
  data: [],
  renderItem: (item: IItem) => {
    const {
      index,
      title,
      text,
      image,
      backgroundColor,
      activeLanguage,
      link,
      slideMaxHeightPercent,
    } = item;
    return (
      <Item
        key={index}
        index={index}
        title={title}
        text={text}
        image={image}
        backgroundColor={backgroundColor}
        activeLanguage={activeLanguage}
        link={link}
        slideMaxHeightPercent={slideMaxHeightPercent}
      />
    );
  },
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
  backHandlerBehaviour: 'activeMinusOne',
  hasReactNavigation: false,
  useCustomBackHandlerEffect: () => {},
  skipLabel: 'Skip',
  nextLabel: 'Next',
  doneLabel: 'Done',
  renderSkipButton: (skipLabel: string | undefined) => (
    <Button label={skipLabel} type="skip" />
  ),
  renderNextButton: (nextLabel: string | undefined) => (
    <Button label={nextLabel} type="next" />
  ),
  renderDoneButton: (doneLabel: string | undefined) => (
    <Button label={doneLabel} type="done" />
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
};

export default defaultProps;
