import type { Page } from '../interfaces/index';
import Account from '_assets/icons/account-multiple.svg';
import Music from '_assets/icons/music-circle.svg';
import Timer from '_assets/icons/timer-outline.svg';
import ImageCarousel from '_assets/icons/panorama-variant-outline.svg';
import Weather from '_assets/icons/weather-partly-rainy.svg';
import Video from '_assets/icons/video-vintage.svg';
import TicTacToe from '_assets/icons/gamepad-circle-left.svg';
import Reels from '_assets/icons/multimedia.svg';
import Calculator from '_assets/icons/calculator.svg';
import NearbyPlaces from '_assets/icons/map-marker-radius.svg';
import Woodoku from '_assets/icons/woodoku.svg';

export const PAGES: Page[] = [
  {
    name: 'Stop Watch',
    componentName: 'StopWatch',
    Icon: Timer,
  },
  {
    name: 'Weather',
    componentName: 'Weather',
    Icon: Weather,
  },
  {
    name: 'Music Player',
    componentName: 'MusicPlayer',
    Icon: Music,
  },
  {
    name: 'Tinder Swipe',
    componentName: 'TinderSwipe',
    Icon: Account,
  },
  {
    name: 'Video Player',
    componentName: 'VideoPlayer',
    Icon: Video,
  },
  {
    name: 'Tic Tac Toe',
    componentName: 'TicTacToe',
    Icon: TicTacToe,
  },
  {
    name: 'Image Carousel',
    componentName: 'ImageCarousel',
    Icon: ImageCarousel,
  },
  {
    name: 'Reels',
    componentName: 'Reels',
    Icon: Reels,
  },
  {
    name: 'Calculator',
    componentName: 'Calculator',
    Icon: Calculator,
  },
  {
    name: 'Nearby Places',
    componentName: 'NearbyPlaces',
    Icon: NearbyPlaces,
  },
  {
    name: 'Woodoku',
    componentName: 'Woodoku',
    Icon: Woodoku,
  },
];
