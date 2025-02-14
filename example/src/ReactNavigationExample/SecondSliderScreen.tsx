import type { NavigationProp, ParamListBase } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SliderIntro, {
  type SliderIntroItemProps,
} from 'react-native-slider-intro';

const slides: SliderIntroItemProps[] = [
  {
    index: 1,
    title: 'First step',
    image: require('../images/step4.png'),
    backgroundColor: '#febe29',
    slideMaxHeightPercent: 0.65,
  },
  {
    index: 2,
    title: 'Second step',
    image: require('../images/step3.png'),
    backgroundColor: '#bb2323',
    slideMaxHeightPercent: 0.65,
  },
  {
    index: 3,
    title: 'Third step',
    image: require('../images/step2.png'),
    backgroundColor: '#84DAB2',
    slideMaxHeightPercent: 0.65,
  },
];

const renderNextButton = () => (
  <View style={styles.nextButton}>
    <Text style={styles.text}>Next</Text>
  </View>
);

const renderDoneButton = () => (
  <View style={styles.nextButton}>
    <Text style={styles.text}>Slider 1</Text>
  </View>
);

const renderSkipButton = () => (
  <View>
    <Text style={styles.text}>Skip</Text>
  </View>
);

const SecondSliderScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => (
  <SliderIntro
    renderNextButton={renderNextButton}
    renderDoneButton={renderDoneButton}
    renderSkipButton={renderSkipButton}
    navContainerMaxSizePercent={0.3}
    navigationBarHeight={130}
    columnButtonStyle={true}
    data={slides}
    onDone={() => navigation.navigate('SliderOne')}
    onSkip={() => navigation.navigate('SliderOne')}
  />
);

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

export default SecondSliderScreen;
