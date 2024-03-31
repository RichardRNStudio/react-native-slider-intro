<h1>📲 react-native-slider-intro</h1>

[![npm version](https://img.shields.io/npm/v/react-native-slider-intro.svg)](https://www.npmjs.com/package/react-native-slider-intro)
[![build](https://github.com/RichardRNStudio/react-native-slider-intro/actions/workflows/build-app.yml/badge.svg?branch=main)](https://github.com/RichardRNStudio/react-native-slider-intro/actions/workflows/build-app.yml)
[![platform](https://img.shields.io/badge/platform-Android_%7C_iOS-yellow)](https://github.com/RichardRNStudio/react-native-slider-intro)
[![NPM total downloads](https://img.shields.io/npm/d18m/react-native-slider-intro.svg?style=flat)](https://npmcharts.com/compare/react-native-slider-intro?minimal=true)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/LICENSE)

<p align="center">
  A simple and full customizable React Native package which implements a unique slider.
</p>
<p align="center">
  <img src="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/basic-example.gif?raw=true" height="350"/>
  <img src="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/custom-buttons-example.gif?raw=true" height="350"/>
  <img src="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/column-buttons-example.gif?raw=true" height="350"/>
</p>

<h2>Installation</h2>

```sh
yarn add react-native-slider-intro
```

or

```sh
npm install react-native-slider-intro --save
```

<h2>Running the example project</h2>

iOS
```sh
yarn example ios
```
Android
```sh
yarn example android
```

<h2>Usage</h2>

<h3>Basic example</h3>

<p>Make your own data array and pass it to <b>SliderIntro</b>.</p>

```js
import React from 'react';
import SliderIntro from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    link: 'https://pccontroller.rnstudio.hu',
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
];

const BasicExample = ({ closeExample }: { closeExample: () => void }) => {
  return (
    <SliderIntro data={slides} onDone={closeExample} onSkip={closeExample} />
  );
};

export default BasicExample;
```

<h2>Properties</h2>

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
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/BasicExample.tsx">Basic example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/ColumnButtonsExample.tsx">Column buttons example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/CustomButtonsExample.tsx">Custom buttons example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/PreviousButtonExample.tsx">Previous button example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/StatusBarExample.tsx">Status bar example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/CustomRenderFunctionExample.tsx">Custom slider render function example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/ReactNavigationExample.tsx">React navigation custom hook example (CANNOT BE RUN, the file includes more information how you can test it.)</a></li>
 <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/UsingThirdPartyLibrariesExample.tsx">Another example for customize the renderItem function with third party libraries.</a></li>
</ul>

<h2>Troubleshooting</h2>

TouchableOpacity onPress function: I've created a new issue on official react-native repository, because `TouchableOpacity`, `Button` and `Pressable` don't working inside `PanResponder` with react-navigation `NavigationContainer`. My solution: Import `TouchableWithoutFeedback` from `react-native-gesture-handler` instead of `react-native` and use `onPressIn` instead of `onPress` function then overwrite the renderItem function.

<h2>Contributing</h2>

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

<h2>License</h2>

MIT
