import React, { Component } from 'react';
import TrackPlayer, { Capability } from 'react-native-track-player';
import Player from '../Components/MusicPlayer';

import type { Track } from '../utils/interfaces';

export interface ComponentState {
  tracks: Track[];
}

class MusicPlayer extends Component<{}, ComponentState> {
  state = {
    tracks: [],
  };

  startPlayer = async () => {
    console.log('tracks', this.state.tracks);
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
    const url = 'https:/api.deezer.com/chart/0?limit=30';
    fetch(url)
      .then(res => res.json())
      .then(response => {
        const tracks: Track[] = [];
        response.tracks.data.map((track: any) => {
          return tracks.push({
            id: track.id,
            title: track.title,
            url: track.preview,
            artwork: track.md5_image,
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
  }

  render() {
    const { tracks } = this.state;
    return <Player tracks={tracks} />;
  }
}

export default MusicPlayer;
