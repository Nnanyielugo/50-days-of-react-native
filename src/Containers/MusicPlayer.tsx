import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import TrackPlayer, { Capability } from 'react-native-track-player';
import Player from '../Components/MusicPlayer';

interface Track {
  id: number;
  title: string;
  url: string;
  artwork: string;
  artist: string;
}

interface ComponentState {
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
      // stopWithApp: true,
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.Stop,
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
    // await TrackPlayer.play();
  };

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
    return <Player />;
  }
}

export default MusicPlayer;
