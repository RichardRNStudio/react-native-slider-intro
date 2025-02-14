import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import SliderIntro, {
  type SliderIntroItemProps,
} from 'react-native-slider-intro';

const slides: SliderIntroItemProps[] = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    link: 'https://rnstudio.hu',
    image: require('./images/step1.png'),
    backgroundColor: '#febe29',
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Simple description for the second step.',
    image: require('./images/step2.png'),
    backgroundColor: '#febe29',
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Try to make something beauty here.',
    image: require('./images/step3.png'),
    backgroundColor: '#febe29',
  },
  {
    index: 4,
    title: 'Fourth step',
    text: 'Here you can open a custom link.',
    link: 'https://rnstudio.hu',
    image: require('./images/step4.png'),
    backgroundColor: '#febe29',
  },
];

const StatusBarExample = ({ closeExample }: { closeExample: () => void }) => (
  <>
    <StatusBar backgroundColor="#79B45D" barStyle="light-content" />
    <SafeAreaView style={styles.safeAreViewContainer} />
    <SliderIntro data={slides} onDone={closeExample} onSkip={closeExample} />
  </>
);

const styles = StyleSheet.create({
  safeAreViewContainer: {
    backgroundColor: '#79B45D',
    height: StatusBar.currentHeight,
  },
});

export default StatusBarExample;
