import { Animated } from 'react-native';

export interface IAnimatedValues {
  _moveSlideX: Animated.Value;
  _moveSlideDotX: Animated.Value;
  _moveSlideDotMarginX: Animated.Value;
  _opacityOfNextButton: Animated.Value;
  _opacityOfDoneButton: Animated.Value;
  _opacityOfSkipButton: Animated.Value;
}
