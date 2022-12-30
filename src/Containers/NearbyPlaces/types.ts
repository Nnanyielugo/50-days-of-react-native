export interface Coords {
  longitude: number;
  latitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type IPlace = {
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  rating: number;
  background: string;
  id: string;
  image: string;
};
