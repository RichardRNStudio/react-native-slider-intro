import { ImageProps } from 'react-native';

export interface IItem {
  index: number;
  title?: object | string;
  text?: object | string;
  link?: string;
  image?: ImageProps['source'];
  backgroundColor?: string;
  activeLanguage?: string;
  slideMaxHeightPercent?: number;
}
