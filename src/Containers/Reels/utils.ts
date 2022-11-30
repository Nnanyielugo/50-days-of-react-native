import { Dimensions } from 'react-native';
import Image1 from './assets/image1.jpg';
import Image2 from './assets/image2.jpg';

import type { ImageSourcePropType } from 'react-native';

export type Item =
  | {
      type: 'image';
      source: ImageSourcePropType;
    }
  | {
      type: 'text';
      text: string;
    };

export const data: Item[] = [
  {
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris tellus, tristique nec ornare et, aliquet vitae ex.',
  },
  {
    type: 'image',
    source: Image1,
  },
  {
    type: 'text',
    text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas semper justo metus, eu condimentum lectus lacinia vel. Vivamus dapibus aliquet nisl, quis semper enim laoreet nec.',
  },
  {
    type: 'image',
    source: Image2,
  },
  {
    type: 'text',
    text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas semper justo metus, eu condimentum lectus lacinia vel. Vivamus dapibus aliquet nisl, quis semper enim laoreet nec.',
  },
];

export const INDICATOR_WIDTH =
  (Dimensions.get('window').width -
    (data.length * 1.5 + 12)) /** additional 2 pixels at the right end */ /
  data.length;
