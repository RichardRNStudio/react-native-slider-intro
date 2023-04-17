import { Animated, Dimensions } from 'react-native'
import renderer from 'react-test-renderer'
import DoneButton from '../components/DoneButton'
import NextButton from '../components/NextButton'
import NextContainer from '../components/NextContainer'

const maxWidth = Dimensions.get('window').width
const slide = {
  active: 0,
  previous: 0,
  marginLeft: 0,
  dotMarginLeft: 0,
  expectOpacityOfNext: 1,
  expectOpacityOfDone: 0,
  expectOpacityOfSkip: 1,
  animations: {
    _moveSlideX: new Animated.Value(0),
    _moveSlideDotX: new Animated.Value(0),
    _moveSlideDotMarginX: new Animated.Value(0),
    _opacityOfNextButton: new Animated.Value(0),
    _opacityOfDoneButton: new Animated.Value(0),
    _opacityOfSkipButton: new Animated.Value(0)
  }
}

test('renders correctly', () => {
  const tree = renderer
    .create(
      <NextContainer
        goToNewSlide={() => {}}
        setSlide={() => {}}
        slide={slide}
        numberOfSlide={3}
        onDone={() => {}}
        navContainerMaxSize={0.9}
        dotWidth={12}
        deviceMaxWidth={maxWidth}
        renderNextButton={() => <NextButton nextLabel="Test next label" />}
        renderDoneButton={() => <DoneButton doneLabel="Test done label" />}
        isLastSlide={false}
        buttonsMaxSize={maxWidth * 0.2}
      />
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
