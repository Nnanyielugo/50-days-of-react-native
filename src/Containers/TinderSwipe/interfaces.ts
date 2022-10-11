import type { ImageSourcePropType } from 'react-native';
export interface Profile {
  id: string;
  name: string;
  age: number;
  image: ImageSourcePropType;
  distance: string;
}
