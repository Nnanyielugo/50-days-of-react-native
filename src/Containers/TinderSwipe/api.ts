import { Profile } from './interfaces';

const profiles: Profile[] = [
  {
    id: String((Math.random() * 100000000).toFixed(0)),
    name: 'Alice',
    age: 27,
    distance: '2.6 miles away',
    image: 'https://lorempixel.com/500/800/people/1/',
  },
  {
    id: String((Math.random() * 200000000).toFixed(0)),
    name: 'Holly',
    age: 25,
    distance: '4.5 miles away',
    image: 'https://lorempixel.com/500/800/people/2/',
  },
  {
    id: String((Math.random() * 300000000).toFixed(0)),
    name: 'Tiffany',
    age: 24,
    distance: '3 miles away',
    image: 'https://lorempixel.com/500/800/people/9/',
  },
  {
    id: String((Math.random() * 400000000).toFixed(0)),
    name: 'Flynn',
    age: 25,
    distance: '1.7 miles away',
    image: 'https://lorempixel.com/500/800/people/7/',
  },
  {
    id: String((Math.random() * 500000000).toFixed(0)),
    name: 'Timothy',
    age: 26,
    distance: '4.8 miles away',
    image: 'https://lorempixel.com/500/800/fashion/8/',
  },
  {
    id: String((Math.random() * 600000000).toFixed(0)),
    name: 'Christine',
    age: 31,
    distance: '10 miles away',
    image: 'https://lorempixel.com/500/800/fashion/3/',
  },
  {
    id: String((Math.random() * 700000000).toFixed(0)),
    name: 'Sarah',
    age: 43,
    distance: '7.2 miles away',
    image: 'https://lorempixel.com/500/800/fashion/6/',
  },
  {
    id: String((Math.random() * 101000000).toFixed(0)),
    name: 'Fred',
    age: 45,
    distance: '4.1 miles away',
    image: 'https://lorempixel.com/500/800/business/1/',
  },
  {
    id: String((Math.random() * 800000000).toFixed(0)),
    name: 'Jennifer',
    age: 26,
    distance: '13 miles away',
    image: 'https://lorempixel.com/500/800/fashion/9/',
  },
  {
    id: String((Math.random() * 900000000).toFixed(0)),
    name: 'Alex',
    age: 48,
    distance: '1.8 miles away',
    image: 'https://lorempixel.com/500/800/business/6/',
  },
  {
    id: String((Math.random() * 110000000).toFixed(0)),
    name: 'Chris',
    age: 25,
    distance: '3.6 miles away',
    image: 'https://lorempixel.com/500/800/business/2/',
  },
  {
    id: String((Math.random() * 120000000).toFixed(0)),
    name: 'Stacey',
    age: 24,
    distance: '2.9 miles away',
    image: 'https://lorempixel.com/500/800/people/8/',
  },
  {
    id: String((Math.random() * 120000000).toFixed(0)),
    name: 'Marie',
    age: 24,
    distance: '6.4 miles away',
    image: 'https://lorempixel.com/500/800/fashion/7/',
  },
];

export function fetchProfiles(): Promise<Profile[]> {
  return new Promise((resolve, reject) => {
    if (profiles) setTimeout(() => resolve(profiles), 1000);
    else reject('No data available');
  });
}
