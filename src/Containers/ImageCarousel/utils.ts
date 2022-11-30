import Carousel1 from './assets/carousel-1.jpeg';
import Carousel2 from './assets/carousel-2.jpeg';
import Carousel3 from './assets/carousel-3.jpeg';

import type { ImageSourcePropType } from 'react-native';

export interface Item {
  source: ImageSourcePropType;
  background: string;
  text: string;
  subText: string;
}

export const defaultImages: Item[] = [
  {
    source: Carousel1,
    background: '#E8F3F5',
    text: 'Gallant Soldier',
    subText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    source: Carousel2,
    background: '#EDE8F5',
    text: 'Egg man',
    subText: 'Nam mauris tellus, tristique nec ornare et, aliquet vitae ex.',
  },
  {
    source: Carousel3,
    background: '#F5E9E8',
    text: 'Mini Boss',
    subText: 'Vestibulum mi augue, mattis vel enim nec, accumsan mollis nibh.',
  },
  {
    source: Carousel1,
    background: '#E8F3F5',
    text: 'Gallant Soldier',
    subText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    source: Carousel2,
    background: '#EDE8F5',
    text: 'Egg man',
    subText: 'Nam mauris tellus, tristique nec ornare et, aliquet vitae ex.',
  },
  {
    source: Carousel3,
    background: '#F5E9E8',
    text: 'Mini Boss',
    subText: 'Vestibulum mi augue, mattis vel enim nec, accumsan mollis nibh.',
  },
];
