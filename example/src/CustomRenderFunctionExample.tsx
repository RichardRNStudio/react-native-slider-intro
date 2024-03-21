import type { IItem } from 'interfaces/IItem.interface';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import SliderIntro from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    image: require('./images/step4.png'),
    backgroundColor: '#febe29',
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Simple description for the second step.',
    image: require('./images/step2.png'),
    backgroundColor: '#bb2323',
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Try to make something beauty here.',
    link: 'https://pccontroller.rnstudio.hu',
    image: require('./images/step3.png'),
    backgroundColor: '#84DAB2',
  },
];

// Inside the custom render function you can
// - manage multilanguages, for example title and text would be an array, and based on the active language you can select one of them,
// - use your custom layout,
// - use another package for customize the layout.

const _renderItem = ({
  index,
  backgroundColor,
  title,
  text,
  link,
  activeLanguage,
  image,
  slideMaxHeightPercent,
}: IItem) => {
  const deviceMaxHeight = Dimensions.get('screen').height;
  const language = activeLanguage || 'en';
  const slideHeight = deviceMaxHeight * (slideMaxHeightPercent || 0.78);

  return (
    <View key={index} style={[styles.slide, { backgroundColor }]}>
      <View
        style={[
          styles.container,
          {
            height: slideHeight,
            maxHeight: slideHeight,
          },
        ]}
      >
        <Text style={styles.title}>
          {Array.isArray(title) ? title[language as unknown as number] : title}
        </Text>
        {image && <Image style={styles.image} source={image} />}
        <View>
          <Text style={styles.language}>
            {Array.isArray(text) ? text[language as unknown as number] : text}
          </Text>
          {link && (
            <TouchableWithoutFeedback
              onPressIn={() => {
                Linking.openURL(link);
              }}
            >
              <Text style={styles.link}>{link}</Text>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    </View>
  );
};

const CustomRenderFunctionExample = ({
  closeExample,
}: {
  closeExample: () => void;
}) => {
  return (
    <SliderIntro
      navContainerMaxSizePercent={0.25}
      renderItem={_renderItem}
      data={slides}
      onDone={closeExample}
      onSkip={closeExample}
      dotWidth={15}
    />
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    paddingTop: 9,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: height * 0.85,
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    minHeight: 30,
  },
  image: {
    maxWidth: width,
    maxHeight: width,
  },
  link: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 15,
    color: '#2F39FF',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  language: {
    marginLeft: 12,
    marginRight: 12,
    lineHeight: 25,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
});

export default CustomRenderFunctionExample;
