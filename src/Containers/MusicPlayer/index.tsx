import React, { Component } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import Player from './components/Player';

import type { Track } from './interface';

export interface ComponentState {
  tracks: Track[];
}

class MusicPlayer extends Component<{}, ComponentState> {
  state = {
    tracks: [],
  };

  startPlayer = async () => {
    const { tracks } = this.state;
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });
    await TrackPlayer.add(tracks);
  };

  componentWillUnmount() {
    TrackPlayer.destroy();
  }

  componentDidMount() {
    try {
      const url = 'https:/api.deezer.com/chart/0?limit=50';
      fetch(url)
        .then(res => res.json())
        .then(response => {
          const tracks: Track[] = [];
          response.tracks.data.map((track: any) => {
            return tracks.push({
              id: track.id,
              title: track.title,
              url: track.preview,
              artwork: track.album.cover_big,
              artist: track.artist.name,
            });
          });
          this.setState(
            _state => ({
              tracks,
            }),
            () => this.startPlayer(),
          );
        });
    } catch (err) {
      console.log('error', err);
      throw err;
    }
  }

  render() {
    const { tracks } = this.state;
    return <Player tracks={tracks} />;
  }
}

export default MusicPlayer;
