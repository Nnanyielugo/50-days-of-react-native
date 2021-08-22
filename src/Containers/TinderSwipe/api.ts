import { Profile, Gender } from './interfaces';

const profiles: Profile[] = [
  {
    id: String((Math.random() * 100000000).toFixed(0)),
    name: 'Alice',
    age: 27,
    gender: Gender.Female,
    hobbies: ['Photography', 'Reading'],
    image: 'https://lorempixel.com/300/300/people/1/',
  },
  {
    id: String((Math.random() * 200000000).toFixed(0)),
    name: 'Timothy',
    age: 35,
    gender: Gender.Male,
    hobbies: ['Playing with my kids'],
    image: 'https://lorempixel.com/300/300/people/2/',
  },
  {
    id: String((Math.random() * 300000000).toFixed(0)),
    name: 'Tiffany',
    age: 24,
    gender: Gender.Female,
    hobbies: ['Meditation', 'Playing the piano'],
    image: 'https://lorempixel.com/300/300/people/9/',
  },
  {
    id: String((Math.random() * 400000000).toFixed(0)),
    name: 'Flynn',
    age: 25,
    gender: Gender.Male,
    hobbies: ['Working out', 'Footbball'],
    image: 'https://lorempixel.com/300/300/people/7/',
  },
  {
    id: String((Math.random() * 500000000).toFixed(0)),
    name: 'Holly',
    age: 26,
    gender: Gender.Female,
    hobbies: ['Dancing', 'Photography', 'Modelling'],
    image: 'https://lorempixel.com/300/300/fashion/8/',
  },
  {
    id: String((Math.random() * 600000000).toFixed(0)),
    name: 'Enrique',
    age: 31,
    gender: Gender.Male,
    hobbies: ['Competitive drinking'],
    image: 'https://lorempixel.com/300/300/fashion/3/',
  },
  {
    id: String((Math.random() * 700000000).toFixed(0)),
    name: 'Sarah',
    age: 28,
    gender: Gender.Female,
    hobbies: ['Meditation', 'Dancing'],
    image: 'https://lorempixel.com/300/300/fashion/6/',
  },
  {
    id: String((Math.random() * 800000000).toFixed(0)),
    name: 'Jennifer',
    age: 26,
    gender: Gender.Female,
    hobbies: ['Dancing', 'Playing the flute'],
    image: 'https://lorempixel.com/300/300/fashion/10/',
  },
  {
    id: String((Math.random() * 900000000).toFixed(0)),
    name: 'Alex',
    age: 28,
    gender: Gender.Other,
    hobbies: ['Reviewing gadgets'],
    image: 'https://lorempixel.com/300/300/technics/1/',
  },
  {
    id: String((Math.random() * 101000000).toFixed(0)),
    name: 'Fred',
    age: 45,
    gender: Gender.Male,
    hobbies: ['Research', 'Playing drums'],
    image: 'https://lorempixel.com/300/300/business/1/',
  },
  {
    id: String((Math.random() * 110000000).toFixed(0)),
    name: 'Chris',
    age: 25,
    gender: Gender.Male,
    hobbies: ['Running', 'Dancing'],
    image: 'https://lorempixel.com/300/300/business/2/',
  },
];

export function fetchProfiles(): Promise<Profile[]> {
  return new Promise((resolve, reject) => {
    if (profiles) setTimeout(() => resolve(profiles), 1000);
    else reject('No data available');
  });
}
