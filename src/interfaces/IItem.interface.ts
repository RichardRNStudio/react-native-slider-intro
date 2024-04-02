import type { ImageProps, ColorValue } from 'react-native';

export interface IItem {
  index: number;
  title?: object | string;
  text?: object | string;
  link?: string;
  image?: ImageProps['source'];
  backgroundColor?: ColorValue;
  activeLanguage?: string;
  slideMaxHeightPercent?: number;
  icon?: any;
}
