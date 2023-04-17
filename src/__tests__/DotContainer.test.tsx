import { Animated } from 'react-native'
import renderer from 'react-test-renderer'
import DotContainer from '../components/DotContainer'

test('renders correctly', () => {
  const tree = renderer
    .create(
      <DotContainer
        arrayOfSlideIndex={[1, 2, 3]}
        fixDotBackgroundColor={'grey'}
        fixDotOpacity={0.35}
        dotWidth={12}
        _moveSlideDotX={new Animated.Value(0)}
        _moveSlideDotMarginX={new Animated.Value(0)}
        animatedDotBackgroundColor={'white'}
        navContainerMaxSize={0.3}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
