import { Profile } from './interfaces';

const profiles: Profile[] = [
  {
    id: String((Math.random() * 100000000).toFixed(0)),
    name: 'Alice',
    age: 27,
    distance: '2.6 miles away',
    image: 'https://picsum.photos/id/1011/500/800',
  },
  {
    id: String((Math.random() * 200000000).toFixed(0)),
    name: 'Holly',
    age: 25,
    distance: '4.5 miles away',
    image: 'https://picsum.photos/id/1013/500/800',
  },
  {
    id: String((Math.random() * 300000000).toFixed(0)),
    name: 'Tiffany',
    age: 24,
    distance: '3 miles away',
    image: 'https://picsum.photos/id/1014/500/800',
  },
  {
    id: String((Math.random() * 400000000).toFixed(0)),
    name: 'Flynn',
    age: 25,
    distance: '1.7 miles away',
    image: 'https://picsum.photos/id/1005/500/800',
  },
  {
    id: String((Math.random() * 500000000).toFixed(0)),
    name: 'Timothy',
    age: 26,
    distance: '4.8 miles away',
    image: 'https://picsum.photos/id/1012/500/800',
  },
  {
    id: String((Math.random() * 600000000).toFixed(0)),
    name: 'Christine',
    age: 31,
    distance: '10 miles away',
    image: 'https://picsum.photos/id/1027/500/800',
  },
  {
    id: String((Math.random() * 700000000).toFixed(0)),
    name: 'Sarah',
    age: 43,
    distance: '7.2 miles away',
    image: 'https://picsum.photos/id/342/500/800',
  },
  {
    id: String((Math.random() * 101000000).toFixed(0)),
    name: 'Fred',
    age: 45,
    distance: '4.1 miles away',
    image: 'https://picsum.photos/id/338/500/800',
  },
  {
    id: String((Math.random() * 800000000).toFixed(0)),
    name: 'Jennifer',
    age: 26,
    distance: '13 miles away',
    image: 'https://picsum.photos/id/325/500/800',
  },
  {
    id: String((Math.random() * 900000000).toFixed(0)),
    name: 'Alex',
    age: 48,
    distance: '1.8 miles away',
    image: 'https://picsum.photos/id/177/500/800',
  },
  {
    id: String((Math.random() * 110000000).toFixed(0)),
    name: 'Chris',
    age: 25,
    distance: '3.6 miles away',
    image: 'https://picsum.photos/id/331/500/800',
  },
  {
    id: String((Math.random() * 120000000).toFixed(0)),
    name: 'Stacey',
    age: 24,
    distance: '2.9 miles away',
    image: 'https://picsum.photos/id/548/500/800',
  },
  {
    id: String((Math.random() * 120000000).toFixed(0)),
    name: 'Marie',
    age: 24,
    distance: '6.4 miles away',
    image: 'https://picsum.photos/id/596/500/800',
  },
];

export function fetchProfiles(): Promise<Profile[]> {
  return new Promise((resolve, reject) => {
    if (profiles) setTimeout(() => resolve(profiles), 1000);
    else reject('No data available');
  });
}
