//import liraries
import * as React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import TrackPlayer, {
  useProgress,
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  State,
} from 'react-native-track-player';

// import type { FunctionComponent } from 'react';

const Player = () => {
  const { position, duration } = useProgress();
  const playbackState = usePlaybackState();
  // console.log(progress);
  // console.log(playbackState);
  let trackPlayerElem = (
    <Icon onPress={() => TrackPlayer.play()} name="play" size={30} />
  );

  if (playbackState === State.Playing) {
    trackPlayerElem = (
      <Icon onPress={() => TrackPlayer.pause()} name="pause" size={30} />
    );
  }

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.RemotePlay, Event.RemotePause],
    async event => {
      console.log('event', event);
      if (event.type === Event.RemotePlay) {
        TrackPlayer.play();
      }
      if (event.type === Event.RemotePause) {
        TrackPlayer.pause();
      }
    },
  );
  return (
    <View style={styles.container}>
      <View style={styles.trackArtContainer}></View>
      <View style={styles.progressContainer}>
        <Slider
          minimumValue={0}
          value={position}
          maximumValue={duration}
          style={styles.progress}
        />
      </View>
      <View style={styles.controlsContainer}>
        <Icon name="repeat" size={20} />
        <Icon name="play-skip-back" size={30} />
        {trackPlayerElem}
        <Icon name="play-skip-forward" size={30} />
        <Icon name="shuffle" size={20} />
      </View>
      <View style={styles.playlistContainer}>
        <Text>Playlist</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  trackArtContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: 'grey',
    marginTop: 30,
    elevation: 5,
    borderRadius: 5,
  },
  trackArt: {},
  progressContainer: {
    // width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.1,
    // alignItems: 'center',
    marginTop: 30,
  },
  progress: {
    width: Dimensions.get('window').width * 0.9,
    padding: 0,
    margin: 0,
  },
  controlsContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  controls: {},
  playlistContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.1,
    alignItems: 'center',
    marginTop: 20,
  },
  playlist: {},
});

export default Player;
