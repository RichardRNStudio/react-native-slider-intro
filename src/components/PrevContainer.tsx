import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native'
import { IPrevContainer } from 'interfaces/IPrevContainer.interface'

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const PrevContainer = ({
  setDefaultState,
  onSkip,
  buttonsMaxSize,
  _opacityOfSkipButton,
  renderSkipButton,
  type,
  goToNewSlide,
  slide,
  setSlide,
  numberOfSlide,
  onDone,
  navContainerMaxSize,
  dotWidth,
  deviceMaxWidth,
  showLeftButton
}: IPrevContainer) => {
  const handlePress = () => {
    const { active } = slide
    if (type === 'skip') {
      setDefaultState()
      onSkip()
      return
    }
    goToNewSlide(active - 1, slide, setSlide, numberOfSlide, onDone, navContainerMaxSize, dotWidth, deviceMaxWidth)
  }

  return (
    <View style={[styles.buttonContainer, { maxWidth: buttonsMaxSize }]}>
      {showLeftButton && (
        <TouchableOpacity onPress={handlePress}>
          <Animated.View
            style={{
              maxWidth: buttonsMaxSize,
              opacity: _opacityOfSkipButton
            }}
          >
            {renderSkipButton()}
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  )
}

export default PrevContainer
