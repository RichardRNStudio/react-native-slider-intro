import { Animated } from 'react-native';

export interface IDotContainer {
  navContainerMaxSize: number;
  arrayOfSlideIndex: number[];
  fixDotBackgroundColor: string;
  fixDotOpacity: number;
  dotWidth: number;
  _moveSlideDotX: Animated.Value;
  _moveSlideDotMarginX: Animated.Value;
  animatedDotBackgroundColor: string;
}
