import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SliderIntro from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    image: require('./images/step4.png'),
    backgroundColor: '#febe29',
    slideMaxHeightPercent: 0.7,
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Simple description for the second step.',
    image: require('./images/step3.png'),
    backgroundColor: '#bb2323',
    slideMaxHeightPercent: 0.7,
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Try to make something beauty here.',
    image: require('./images/step2.png'),
    backgroundColor: '#84DAB2',
    slideMaxHeightPercent: 0.7,
  },
];

const renderNextButton = () => {
  return (
    <View style={styles.nextButton}>
      <Text style={styles.text}>Next</Text>
    </View>
  );
};

const renderDoneButton = () => {
  return (
    <View style={styles.nextButton}>
      <Text style={styles.text}>Done</Text>
    </View>
  );
};

const renderSkipButton = () => {
  return (
    <View>
      <Text style={styles.text}>Skip</Text>
    </View>
  );
};

const ColumnButtonsExample = ({ closeExample }) => {
  return (
    <SliderIntro
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      navContainerMaxSizePercent={0.3}
      navigationBarHeight={150}
      columnButtonStyle={true}
      data={slides}
      onDone={closeExample}
      onSkip={closeExample}
    />
  );
};

const styles = StyleSheet.create({
  nextButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 90,
    borderRadius: 10,
    backgroundColor: '#82817c',
    marginTop: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
});

export default ColumnButtonsExample;
