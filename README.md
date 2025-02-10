<h1>📲 react-native-slider-intro</h1>

[![npm version](https://img.shields.io/npm/v/react-native-slider-intro.svg)](https://www.npmjs.com/package/react-native-slider-intro)
[![build](https://github.com/RichardRNStudio/react-native-slider-intro/actions/workflows/build-app.yml/badge.svg?branch=main)](https://github.com/RichardRNStudio/react-native-slider-intro/actions/workflows/build-app.yml)
[![platform](https://img.shields.io/badge/platform-Android_%7C_iOS-yellow)](https://github.com/RichardRNStudio/react-native-slider-intro)
[![react-native-slider-intro](https://snyk.io/advisor/npm-package/react-native-slider-intro/badge.svg)](https://snyk.io/advisor/npm-package/react-native-slider-intro)
[![NPM total downloads](https://img.shields.io/npm/d18m/react-native-slider-intro.svg?style=flat)](https://npmcharts.com/compare/react-native-slider-intro?minimal=true)
[![license](https://img.shields.io/badge/license-MIT-green)](https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/LICENSE)

[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-000.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

<p align="center">
  A simple and full customizable React Native package which implements a unique slider.
</p>
<p align="center">
  <a href="https://github.com/RichardRNStudio/react-native-slider-intro/">
    <img src="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/basic-example.gif?raw=true" height="350"/>
  </a>
  <a href="https://github.com/RichardRNStudio/react-native-slider-intro/">
    <img src="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/custom-buttons-example.gif?raw=true" height="350"/>
  </a>
  <a href="https://github.com/RichardRNStudio/react-native-slider-intro/">
    <img src="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/column-buttons-example.gif?raw=true" height="350"/>
  </a>
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

```ts
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

The package includes two render options. Besides the `default render` when you can pass `data` as an array of <a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/src/types/SliderIntroItem.types.ts">SliderIntroItemProps</a> props, you can use a `custom render` with `children` and `numberOfSlides` properties.

<h2>Properties</h2>

| Name                         | Type     | Default value                         | Description                                                                                  |
| ---------------------------- | -------- | ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `data`                       | array    | []                                    | `Default render` - array of items. Children will be ignored if data is passed.                 |
| `numberOfSlides`             | array    | number                                | `Custom render` - if children is passed, data will be ignored. numberOfSlides is required in this case. |
| `children`                   | ReactNode| null                                  | `Custom render` - JSX elements to render.                                                      |
| `navigationBarBottom`        | number   | 0                                     | Custom value of dot navigation container bottom position                                     |
| `navigationBarHeight`        | number   | 70                                    | Height of dot navigation container                                                           |
| `animateSlideSpeed`          | number   | 15                                    | Speed of slider animation                                                                    |
| `navContainerMaxSizePercent` | number   | 0.5                                   | Percent value of navigation container's width                                                |
| `dotWidth`                   | number   | 12                                    | The radius of the 'dot' circle of navigation                                                 |
| `fixDotOpacity`              | number   | 0.35                                  | Each dots opacity which don't have animation                                                 |
| `fixDotBackgroundColor`      | <a href="https://reactnative.dev/docs/colors">color</a>| grey  | Each dots background which don't have an animation                             |
| `animatedDotBackgroundColor` | <a href="https://reactnative.dev/docs/colors">color</a>| white | Each dots background which have an animation                                   |
| `animateDotSpeed`            | number   | 8                                     | Speed of dot animation                                                                       |
| `animateDotBouncing`         | number   | 2                                     | The 'bounciness' value of all animations. https://reactnative.dev/docs/animated#spring       |
| `skipLabel`                  | string   | Skip                                  | Custom label of skip button                                                                  |
| `nextLabel`                  | string   | Next                                  | Custom label of next button                                                                  |
| `doneLabel`                  | string   | Done                                  | Custom label of done button                                                                  |
| `renderSkipButton`           | function | Default skip/previous button renderer | Use to supply your own skip/previous button                                                  |
| `renderNextButton`           | function | Default next button renderer          | Use to supply your own next button                                                           |
| `renderDoneButton`           | function | Default done button renderer          | Use to supply your own done button                                                           |
| `onDone`                     | function | none                                  | Behaviour of done button                                                                     |
| `onSkip`                     | function | none                                  | Behaviour of skip button                                                                     |
| `showLeftButton`             | boolean  | true                                  | Show skip or previous button on the left side                                                |
| `leftButtonType`             | string   | skip                                  | The button type on the left side should be `skip` or `previous`                              |
| `columnButtonStyle`          | boolean  | false                                 | Buttons will show up in a column                                                             |
| `showStatusBar`              | boolean  | false                                 | Show status bar on top of screen. You can make your own status bar outside of this component |
| `statusBarColor`             | <a href="https://reactnative.dev/docs/colors">color</a>| #febe29 | Background color of status bar                                               |
| `renderStatusBar`            | function | Default status bar renderer           | Use to supply your own status bar component                                                  |
| `limitToSlide`               | number | (Device max width) * 0.35               | Use to change the limit of the slide animation. It is calculated based on the <a href="https://reactnative.dev/docs/panresponder">PanResponder's `gestureState.dx`</a> property.

<h2>Examples</h2>
<ul>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/BasicExample.tsx">Basic example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/ColumnButtonsExample.tsx">Column buttons example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/CustomButtonsExample.tsx">Custom buttons example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/PreviousButtonExample.tsx">Previous button example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/StatusBarExample.tsx">Status bar example</a></li>
  <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/CustomRenderFunctionExample.tsx">Custom slider render function example</a></li>
 <li><a href="https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/example/src/UsingThirdPartyLibrariesExample.tsx">Another example for customize the package with third party libraries.</a></li>
</ul>

<h2>Contributing</h2>

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

<h2>License</h2>

MIT
