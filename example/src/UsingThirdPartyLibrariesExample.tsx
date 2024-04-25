/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import SliderIntro, { type ISliderIntroItem } from 'react-native-slider-intro';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faHorse,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'expo-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient as any);

const { width, height } = Dimensions.get('window');

const slides: ISliderIntroItem[] = [
  {
    index: 1,
    title: 'First step',
    text: 'Custom FontAwesome Icon.',
    icon: faHome,
    backgroundColor: '#febe29',
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Custom FontAwesome Icon.',
    icon: faHorse,
    backgroundColor: '#bb2323',
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Custom FontAwesome Icon.',
    link: 'https://pccontroller.rnstudio.hu',
    icon: faAddressBook,
    backgroundColor: '#84DAB2',
  },
];

const deviceMaxHeight = Dimensions.get('screen').height;

// Do not forget, the first View of your map function should not include flex: 1 (Flexbox)

const UsingThirdPartyLibrariesExample = ({
  closeExample,
}: {
  closeExample: () => void;
}) => {
  const [fakeLoading, setFakeLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!fakeLoading) {
        setFakeLoading(true);
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <SliderIntro
      navContainerMaxSizePercent={0.25}
      numberOfSlides={slides.length}
      onDone={closeExample}
      onSkip={closeExample}
      dotWidth={15}
    >
      {slides.map(
        (
          {
            backgroundColor,
            title,
            icon,
            text,
            link,
            activeLanguage,
            slideMaxHeightPercent,
          },
          index
        ) => {
          const language = activeLanguage || 'en';
          const slideHeight = deviceMaxHeight * (slideMaxHeightPercent || 0.78);
          return (
            <View key={index} style={{ backgroundColor }}>
              <View
                style={[
                  styles.container,
                  {
                    height: slideHeight,
                    maxHeight: slideHeight,
                  },
                ]}
              >
                <ShimmerPlaceHolder visible={fakeLoading} height={30}>
                  <Text style={styles.title}>
                    {Array.isArray(title)
                      ? title[language as unknown as number]
                      : title}
                  </Text>
                </ShimmerPlaceHolder>
                {icon && (
                  <ShimmerPlaceHolder visible={fakeLoading} height={260}>
                    <FontAwesomeIcon
                      icon={icon}
                      color={'steelblue'}
                      size={200}
                    />
                  </ShimmerPlaceHolder>
                )}
                <ShimmerPlaceHolder
                  visible={fakeLoading}
                  height={50}
                  width={250}
                >
                  <View>
                    <Text style={styles.language}>
                      {Array.isArray(text)
                        ? text[language as unknown as number]
                        : text}
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
                </ShimmerPlaceHolder>
              </View>
            </View>
          );
        }
      )}
    </SliderIntro>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 9,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    maxHeight: height * 0.85,
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

export default UsingThirdPartyLibrariesExample;
