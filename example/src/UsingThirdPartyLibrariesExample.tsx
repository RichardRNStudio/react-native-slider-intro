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
import SliderIntro from 'react-native-slider-intro';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faHorse,
  faAddressBook,
} from '@fortawesome/free-solid-svg-icons';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const slides = [
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

// Inside the custom render function you can
// - manage multilanguages, for example title and text would be an array, and based on the active language you can select one of them,
// - use your custom layout,
// - use another package for customize the layout.

const _renderItem = (
  {
    index,
    backgroundColor,
    title,
    icon,
    text,
    link,
    activeLanguage,
    slideMaxHeightPercent,
  },
  isFetching
) => {
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
        <ShimmerPlaceHolder visible={isFetching} height={30}>
          <Text style={styles.title}>
            {Array.isArray(title) ? title[language] : title}
          </Text>
        </ShimmerPlaceHolder>
        {icon && (
          <ShimmerPlaceHolder visible={isFetching} height={260}>
            <FontAwesomeIcon icon={icon} color={'steelblue'} size={200} />
          </ShimmerPlaceHolder>
        )}
        <ShimmerPlaceHolder visible={isFetching} height={50} width={250}>
          <View>
            <Text style={styles.language}>
              {Array.isArray(text) ? text[language] : text}
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
};

const UsingThirdPartyLibrariesExample = ({ closeExample }) => {
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
      renderItem={(item) => _renderItem(item, fakeLoading)}
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

export default UsingThirdPartyLibrariesExample;
