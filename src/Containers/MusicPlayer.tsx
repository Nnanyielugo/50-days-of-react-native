import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TrackPlayer from 'react-native-track-player';

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
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
        TrackPlayer.CAPABILITY_STOP,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
    await TrackPlayer.add(tracks);
    // await TrackPlayer.play();
  };
  componentDidMount() {
    const url2 = 'https:/api.deezer.com/chart/0?limit=30';
    fetch(url2)
      .then(res => res.json())
      .then(response => {
        const tracks: Track[] = [];
        console.log('resp', response);
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
    return (
      <View style={styles.container}>
        <Text>MusicPlayer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default MusicPlayer;
