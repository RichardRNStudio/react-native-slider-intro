import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { SliderIntroItemProps } from '../types/SliderIntroItem.types';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: Dimensions.get('window').height * 0.85,
  },
  slide: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
  },
  text: {
    marginLeft: 20,
    marginRight: 20,
    lineHeight: 24,
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
  },
  image: {
    maxWidth: Dimensions.get('window').width,
    maxHeight: Dimensions.get('window').width,
  },
  link: {
    marginLeft: 20,
    marginRight: 20,
    fontSize: 15,
    color: '#2f39ff',
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});

const deviceMaxHeight = Dimensions.get('screen').height;

const Slide = ({ item }: { item: SliderIntroItemProps }) => {
  const {
    activeLanguage,
    slideMaxHeightPercent,
    index,
    backgroundColor,
    title,
    image,
    text,
    link,
  } = item;
  const language = activeLanguage || 'en';
  const slideHeight = deviceMaxHeight * (slideMaxHeightPercent || 0.78);

  return (
    <View key={index} style={[styles.slide, { backgroundColor }]}>
      <View
        style={[
          styles.wrapper,
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
          <Text style={styles.text}>
            {Array.isArray(text) ? text[language as unknown as number] : text}
          </Text>
          {link && (
            <TouchableOpacity onPress={() => Linking.openURL(link)}>
              <Text style={styles.link}>{link}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Slide;
