import * as React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from 'react-native-slider';
import TrackPlayer, {
  useProgress,
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  State,
} from 'react-native-track-player';

import { formatTrackDuration } from '../../utils/functions';

import type { FunctionComponent } from 'react';
import type { Track } from '../../utils/interfaces';

interface ComponentProps {
  tracks: Track[];
}

const Player: FunctionComponent<ComponentProps> = ({ tracks }) => {
  const [currentTrack, setCurrentTrack] = React.useState<Track>();
  const { position, duration } = useProgress();
  const playbackState = usePlaybackState();

  let trackPlayerElem = (
    <Icon onPress={TrackPlayer.play} name="play" size={30} />
  );

  if (playbackState === State.Playing) {
    trackPlayerElem = (
      <Icon onPress={TrackPlayer.pause} name="pause" size={30} />
    );
  }

  useTrackPlayerEvents(
    [Event.PlaybackTrackChanged, Event.RemotePlay, Event.RemotePause],
    async event => {
      if (event.type === Event.RemotePlay) {
        TrackPlayer.play();
      }
      if (event.type === Event.RemotePause) {
        TrackPlayer.pause();
      }
      if (event.type === Event.PlaybackTrackChanged) {
        const currentTrackIndex = await TrackPlayer.getCurrentTrack();
        setCurrentTrack(tracks[currentTrackIndex]);
      }
    },
  );

  // console.log(currentTrack);

  return (
    <View style={styles.container}>
      <View style={styles.trackArtContainer}>
        <Image
          style={styles.trackArt}
          source={{
            uri: currentTrack?.artwork,
          }}
        />
      </View>
      <View style={styles.progressContainer}>
        <Slider
          minimumValue={0}
          value={position}
          maximumValue={duration}
          style={styles.progress}
        />

        <View style={styles.progressTextContainer}>
          <Text>{formatTrackDuration(position)}</Text>
          <Text>{formatTrackDuration(duration - position)}</Text>
        </View>
      </View>

      <View style={styles.trackInformation}>
        <Text style={styles.trackTitle}>{currentTrack?.title}</Text>
        <Text
          style={
            styles.artistAndTitle
          }>{`${currentTrack?.artist} - ${currentTrack?.title}`}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <Icon name="repeat" size={20} />
        <Icon
          name="play-skip-back"
          onPress={TrackPlayer.skipToPrevious}
          size={30}
        />
        {trackPlayerElem}
        <Icon
          name="play-skip-forward"
          onPress={TrackPlayer.skipToNext}
          size={30}
        />
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
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  trackArtContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    // backgroundColor: 'grey',
    marginTop: 30,
    // elevation: 5,
    borderRadius: 5,
  },
  trackArt: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    borderRadius: 5,
  },
  progressContainer: {
    height: Dimensions.get('window').height * 0.1,
    marginTop: 30,
  },
  progress: {
    width: Dimensions.get('window').width * 0.9,
    padding: 0,
    margin: 0,
  },
  progressTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trackInformation: {},
  trackTitle: {
    fontWeight: '700',
    fontSize: 16,
    textAlign: 'center',
    color: '#3C3C3C',
  },
  artistAndTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#626262',
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
