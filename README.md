<h1>📲 react-native-slider-intro</h1>

![npm version](https://img.shields.io/badge/npm-1.0.0-brightgreen)
![platform](https://img.shields.io/badge/platform-android-yellow)
![license](https://img.shields.io/badge/license-MIT-yellow)

![example](https://github.com/RichardRNStudio/react-native-slider-intro/blob/main/docs/android-example.gif?raw=true)

<blockquote>
<p>A simple and fully customizable React Native component that implements an intro slider for your app.</p>
<p>NOTICE: It doesn't work with IOS yet. If you can help me in this case please contact me on the following email: info@rnstudio.hu</p>
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
<p>Make your own data array and pass it to `IntroSlider`.</p>

```js
import React from 'react';
import IntroSlider from 'react-native-slider-intro';

const slides = [
  {
    index: 1,
    title: 'First step',
    text: 'Simple description.',
    image: require('./images/step1.jpg'),
    backgroundColor: '#febe29',
  },
  {
    index: 2,
    title: 'Second step',
    text: 'Simple description for the second step.',
    image: require('./images/step2.jpg'),
    backgroundColor: '#febe29',
  },
  {
    index: 3,
    title: 'Third step',
    text: 'Try to make something beauty here.',
    image: require('./images/step3.jpg'),
    backgroundColor: '#febe29',
  },
  {
    index: 4,
    title: 'Fourth step',
    text: 'Here you can open a custom link.',
    link: 'https://pccontroller.rnstudio.hu',
    image: require('./images/step4.jpg'),
    backgroundColor: '#febe29',
  },
];

const BasicExample = () => {
  return <IntroSlider data={slides} />;
};
```

<h2>Contributing</h2>

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

<h2>License</h2>

MIT
