import { ImageProps } from 'react-native';

export interface IData {
  key: number;
  title: object | string;
  text: object | string;
  link: string;
  image: ImageProps['source'];
  backgroundColor: string;
  activeLanguage?: string;
}
