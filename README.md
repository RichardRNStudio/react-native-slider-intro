<h1>📲 react-native-slider-intro</h1>

![npm version](https://img.shields.io/npm/v/react-native-slider-intro.svg)
![build](https://img.shields.io/circleci/build/github/RichardRNStudio/react-native-slider-intro/main)
![platform](https://img.shields.io/badge/platform-Android_%7C_iOS-yellow)
![license](https://img.shields.io/badge/license-MIT-green)

<blockquote>
<p>A simple and fully customizable React Native component that implements an intro slider for your app.</p>
<p><i>This package has been written for the PC Controller react-native application as a submodule.</i></p>
  <a href="https://pccontroller.rnstudio.hu">Visit the PC Controller website</a>
</p>
</blockquote>

<h2>Installation</h2>

```sh
npm install react-native-slider-intro --save
```

<h2>Running the example project</h2>

```sh
cd example && npm run example
```

<h2>Usage</h2>

<h3>Basic example</h3>

![basic-example](https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/basic-example.gif?raw=true)

<p>Make your own data array and pass it to <b>SliderIntro</b>.</p>

```js
import React from 'react';
import SliderIntro from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
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
    link: 'https://pccontroller.rnstudio.hu',
    image: require('./images/step4.png'),
    backgroundColor: '#febe29',
  },
];

const BasicExample = () => {
  return <SliderIntro data={slides} />;
};
```

<h3>Custom buttons example</h3>

![custom-buttons-example](https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/custom-buttons-example.gif?raw=true)

```js
import React from 'react';
import SliderIntro from 'react-native-slider-intro';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faArrowCircleRight,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';

const slides = [...];

const renderNextButton = () => {
  return (
    <FontAwesomeIcon icon={faArrowCircleRight} color={'white'} size={35} />
  );
};

const renderDoneButton = () => {
  return <FontAwesomeIcon icon={faCheckCircle} color={'white'} size={35} />;
};

const renderSkipButton = () => {
  return <FontAwesomeIcon icon={faTimesCircle} color={'white'} size={35} />;
};

const CustomButtonsExample = () => {
  return (
    <SliderIntro
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      navContainerMaxSizePercent={0.3}
      data={slides}
    />
  );
};
```

<h3>Column buttons example</h3>

![column-buttons-example](https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/column-buttons-example.gif?raw=true)

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SliderIntro from 'react-native-slider-intro';

const slides = [...];

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

const ColumnButtonsExample = () => {
  return (
    <SliderIntro
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      renderSkipButton={renderSkipButton}
      navContainerMaxSizePercent={0.3}
      navigationBarHeight={150}
      columnButtonStyle={true}
      data={slides}
    />
  );
};
```

<h2>Props</h2>

<table>
  <thead align="center">
    <tr>
      <td width="25%"><b>Name</b></td>
      <td width="25%"><b>Type</b></td>
      <td width="25%"><b>Default value</b></td>
      <td width="25%"><b>Description</b></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>data</td>
      <td><b>array</b></td>
      <td>none, <b><i>required</i></b></td>
      <td>Array of objects, which represents your slider items. Each item should contain a unique <i>key</i>.</td>
    </tr>
    <tr>
      <td>renderItem</td>
      <td><b>function</b></td>
      <td>Default item renderer</td>
      <td></td>
    </tr>
    <tr>
      <td>navigationBarBottom</td>
      <td><b>number</b></td>
      <td>0</td>
      <td>Custom value of dot navigation container bottom position</td>
    </tr>
    <tr>
      <td>navigationBarHeight</td>
      <td><b>number</b></td>
      <td>70</td>
      <td>Height of dot navigation container</td>
    </tr>
    <tr>
      <td>animateSlideSpeed</td>
      <td><b>number</b></td>
      <td>15</td>
      <td>Speed of slider animation</td>
    </tr>
    <tr>
      <td>navContainerMaxSizePercent</td>
      <td><b>number</b></td>
      <td>0.5</td>
      <td>Percent value of navigation container's width</td>
   </tr>
   <tr>
      <td>dotWidth</td>
      <td><b>number</b></td>
      <td>12</td>
      <td>The radius of the 'dot' circle of navigation</td>
   </tr>
   <tr>
      <td>fixDotOpacity</td>
      <td><b>number</b></td>
      <td>0.35</td>
      <td>Each dots opacity which don't have animation</td>
   </tr>
   <tr>
      <td>fixDotBackgroundColor</td>
      <td><b>string</b></td>
      <td>grey</td>
      <td>Each dots background which don't have an animation</td>
   </tr>
   <tr>
      <td>animatedDotBackgroundColor</td>
      <td><b>string</b></td>
      <td>white</td>
      <td>Each dots background which have an animation</td>
   </tr>
   <tr>
      <td>animateDotSpeed</td>
      <td><b>number</b></td>
      <td>8</td>
      <td>Speed of dot animation</td>
   </tr>
   <tr>
      <td>animateDotBouncing</td>
      <td><b>number</b></td>
      <td>2</td>
      <td>The 'bounciness' value of all animations. (<a href="https://reactnative.dev/docs/animated#spring">https://reactnative.dev/docs/animated#spring</a>)</td>
   </tr>
   <tr>
      <td>hasReactNavigation</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>There is a trouble with backButton behaviour when you're using react-navigation. You should use <b>useFocusEffect</b> in this case for reach the expected behaviour. More info: <a href="https://reactnavigation.org/docs/custom-android-back-button-handling/#why-not-use-component-lifecycle-methods">https://reactnavigation.org/docs/custom-android-back-button-handling/#why-not-use-component-lifecycle-methods</a></td>
   </tr>
   <tr>
      <td>useCustomBackHandlerEffect</td>
      <td><b>function</b></td>
      <td>none</td>
      <td>As I mentioned above, sometimes we should rewrite the basic <b>backHandler</b> behaviour. This property will be a custom hook. See the example for more info: <a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/ReactNavigationExample.js">React navigation custom hook example</a></td>
   </tr>
   <tr>
      <td>backHandlerBehaviour</td>
      <td><b>string</b></td>
      <td>activeMinusOne</td>
      <td>This prop can controls the backButton behaviour. The value should be <i>activeMinusOne</i> or 'previous'</td>
   </tr>
   <tr>
      <td>skipLabel</td>
      <td><b>string</b></td>
      <td>Skip</td>
      <td>Custom label of skip button</td>
   </tr>
   <tr>
      <td>nextLabel</td>
      <td><b>string</b></td>
      <td>Next</td>
      <td>Custom label of next button</td>
   </tr>
   <tr>
      <td>doneLabel</td>
      <td><b>string</b></td>
      <td>Done</td>
      <td>Custom label of done button</td>
   </tr>
   <tr>
      <td>renderSkipButton</td>
      <td><b>function</b></td>
      <td>Default skip/previous button renderer</td>
      <td>Use to supply your own skip/previous button.</td>
   </tr>
   <tr>
      <td>renderNextButton</td>
      <td><b>function</b></td>
      <td>Default next button renderer</td>
      <td>Use to supply your own next button.</td>
   </tr>
   <tr>
      <td>renderDoneButton</td>
      <td><b>function</b></td>
      <td>Default done button renderer</td>
      <td>Use to supply your own done button.</td>
   </tr>
   <tr>
      <td>onDone</td>
      <td><b>function</b></td>
      <td>none</td>
      <td>Behaviour of done button</td>
   </tr>
   <tr>
      <td>onSkip</td>
      <td><b>function</b></td>
      <td>none</td>
      <td>Behaviour of skip button</td>
   </tr>
   <tr>
      <td>showLeftButton</td>
      <td><b>boolean</b></td>
      <td>true</td>
      <td>Show skip or previous button on the left side</td>
   </tr>
   <tr>
      <td>leftButtonType</td>
      <td><b>string</b></td>
      <td>skip</td>
      <td>The button type on the left side should be <b>skip</b> or <b>previous</b></td>
   </tr>
   <tr>
      <td>columnButtonStyle</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Buttons will show up in a column</td>
   </tr>
   <tr>
      <td>showStatusBar</td>
      <td><b>boolean</b></td>
      <td>false</td>
      <td>Show status bar on top of screen. Otherwise, you can make your own status bar outside of this component</td>
   </tr>
   <tr>
      <td>statusBarColor</td>
      <td><b>string</b></td>
      <td>#febe29</td>
      <td>Background color of status bar</td>
   </tr>
    <tr>
      <td>renderStatusBar</td>
      <td><b>function</b></td>
      <td>Default status bar renderer</td>
      <td>Use to supply your own status bar component.</td>
   </tr>
  </tbody>
</table>

<h2>Examples</h2>
<ul>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/BasicExample.js">Basic example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/ColumnButtonsExample.js">Column buttons example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/CustomButtonsExample.js">Custom buttons example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/PreviousButtonExample.js">Previous button example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/StatusBarExample.js">Status bar example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/ReactNavigationExample.js">React navigation custom hook example (CANNOT BE RUN, the file includes more information how you can test it.)</a></li>
</ul>

<h2>Troubleshooting</h2>

TouchableOpacity onPress function: I've created a new issue on official react-native repository, because `TouchableOpacity`, `Button` and `Pressable` don't working inside `PanResponder` with react-navigation `NavigationContainer`. My solution: Import `TouchableWithoutFeedback` from `react-native-gesture-handler` instead of `react-native` and use `onPressIn` instead of `onPress` function then overwrite the renderItem function.

<h2>Contributing</h2>

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

<h2>License</h2>

MIT
