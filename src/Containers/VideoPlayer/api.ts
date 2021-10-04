import videos from './media.json';
import { Video } from './interfaces';

export function fetchVideos(): Promise<Video[]> {
  return new Promise((resolve, reject) => {
    if (videos) setTimeout(() => resolve(videos), 1000);
    else reject('No data available');
  });
}
