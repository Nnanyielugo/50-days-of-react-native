import { Profile } from './interfaces';
import F1 from './assets/profiles/pro_f_1.jpg';
import F2 from './assets/profiles/pro_f_2.jpg';
import F3 from './assets/profiles/pro_f_3.png';
import M1 from './assets/profiles/pro_m_1.jpg';
import M2 from './assets/profiles/pro_m_2.jpg';
import M3 from './assets/profiles/pro_m_3.jpg';
import M4 from './assets/profiles/pro_m_4.jpg';

const profiles: Profile[] = [
  {
    id: String((Math.random() * 100000000).toFixed(0)),
    name: 'Alice',
    age: 27,
    distance: '2.6 miles away',
    image: F1,
  },
  {
    id: String((Math.random() * 500000000).toFixed(0)),
    name: 'Timothy',
    age: 26,
    distance: '4.8 miles away',
    image: M2,
  },
  {
    id: String((Math.random() * 200000000).toFixed(0)),
    name: 'Holly',
    age: 25,
    distance: '4.5 miles away',
    image: F2,
  },
  {
    id: String((Math.random() * 400000000).toFixed(0)),
    name: 'Flynn',
    age: 25,
    distance: '1.7 miles away',
    image: M1,
  },
  {
    id: String((Math.random() * 300000000).toFixed(0)),
    name: 'Tiffany',
    age: 24,
    distance: '3 miles away',
    image: F3,
  },
  {
    id: String((Math.random() * 101000000).toFixed(0)),
    name: 'Fred',
    age: 45,
    distance: '4.1 miles away',
    image: M3,
  },
  {
    id: String((Math.random() * 900000000).toFixed(0)),
    name: 'Alex',
    age: 48,
    distance: '1.8 miles away',
    image: M4,
  },

  // {
  //   id: String((Math.random() * 600000000).toFixed(0)),
  //   name: 'Christine',
  //   age: 31,
  //   distance: '10 miles away',
  //   image: 'https://picsum.photos/id/1027/500/800',
  // },
  // {
  //   id: String((Math.random() * 700000000).toFixed(0)),
  //   name: 'Sarah',
  //   age: 43,
  //   distance: '7.2 miles away',
  //   image: 'https://picsum.photos/id/342/500/800',
  // },

  // {
  //   id: String((Math.random() * 800000000).toFixed(0)),
  //   name: 'Jennifer',
  //   age: 26,
  //   distance: '13 miles away',
  //   image: 'https://picsum.photos/id/325/500/800',
  // },

  // {
  //   id: String((Math.random() * 110000000).toFixed(0)),
  //   name: 'Chris',
  //   age: 25,
  //   distance: '3.6 miles away',
  //   image: 'https://picsum.photos/id/331/500/800',
  // },
  // {
  //   id: String((Math.random() * 120000000).toFixed(0)),
  //   name: 'Stacey',
  //   age: 24,
  //   distance: '2.9 miles away',
  //   image: 'https://picsum.photos/id/548/500/800',
  // },
  // {
  //   id: String((Math.random() * 120000000).toFixed(0)),
  //   name: 'Marie',
  //   age: 24,
  //   distance: '6.4 miles away',
  //   image: 'https://picsum.photos/id/596/500/800',
  // },
];

export function fetchProfiles(): Promise<Profile[]> {
  return new Promise((resolve, reject) => {
    if (profiles) setTimeout(() => resolve(profiles), 1000);
    else reject('No data available');
  });
}
