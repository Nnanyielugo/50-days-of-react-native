import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from 'react-native-slider';
import TrackPlayer, {
  useProgress,
  Event,
  usePlaybackState,
  useTrackPlayerEvents,
  State,
  RepeatMode,
} from 'react-native-track-player';
import albumArt from '../assets/album-art-placeholder.jpeg';
import Playlist from './Playlist';

import { formatTrackDuration, setRandomBackgroundColor } from '../utils';

import type { FunctionComponent } from 'react';
import type { Track, BackgroundColor } from '../interface';

interface ComponentProps {
  tracks: Track[];
}

enum Repeat {
  off,
  track,
  queue,
}

enum RepeatIcon {
  off = 'repeat-off',
  track = 'repeat-once',
  queue = 'repeat',
}

const Player: FunctionComponent<ComponentProps> = ({ tracks }) => {
  const [backgroundColor, setBackgroundColor] = React.useState<BackgroundColor>(
    setRandomBackgroundColor(),
  );
  const [repeat, setRepeat] = React.useState<Repeat>(Repeat.off);
  const [repeatIcon, setRepeatIcon] = React.useState<RepeatIcon>(
    RepeatIcon.off,
  );
  const [prevDisabled, setPrevDisabled] = React.useState(true);
  const [nextDisabled, setNextDisabled] = React.useState(false);
  const [currentTrack, setCurrentTrack] = React.useState<Track>();
  const { position, duration } = useProgress();
  const playbackState = usePlaybackState();

  const handleSetRepeat = async () => {
    const currentTrackIndex = await TrackPlayer.getCurrentTrack();
    switch (repeat) {
      case Repeat.off:
        await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        setRepeat(Repeat.queue);
        setRepeatIcon(RepeatIcon.queue);
        // enable next button in case it is disabled
        setNextDisabled(false);
        break;
      case Repeat.queue:
        await TrackPlayer.setRepeatMode(RepeatMode.Track);
        setRepeat(Repeat.track);
        setRepeatIcon(RepeatIcon.track);
        // disable next button if track is last on queue
        if (currentTrackIndex === tracks.length - 1) {
          setNextDisabled(true);
        }
        break;
      case Repeat.track:
        await TrackPlayer.setRepeatMode(RepeatMode.Off);
        setRepeat(Repeat.off);
        setRepeatIcon(RepeatIcon.off);
        // disable next button if track is last on queue
        if (currentTrackIndex === tracks.length - 1) {
          setNextDisabled(true);
        }
        break;
    }
  };

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
      const repeatMode = await TrackPlayer.getRepeatMode();

      if (event.type === Event.RemotePlay) {
        TrackPlayer.play();
      }
      if (event.type === Event.RemotePause) {
        TrackPlayer.pause();
      }
      if (event.type === Event.PlaybackTrackChanged) {
        const currentTrackIndex = await TrackPlayer.getCurrentTrack();
        setCurrentTrack(tracks[currentTrackIndex]);
        setBackgroundColor(setRandomBackgroundColor());

        // enable/disable previous/next buttons
        if (event.nextTrack > 0) {
          setPrevDisabled(false);
        } else {
          setPrevDisabled(true);
        }
        if (
          event.nextTrack &&
          event.nextTrack === tracks.length - 1 &&
          repeatMode !== RepeatMode.Queue
        ) {
          setNextDisabled(true);
        } else if (
          event.track &&
          event.track === tracks.length - 1 &&
          repeatMode !== RepeatMode.Queue
        ) {
          setNextDisabled(true);
        } else {
          setNextDisabled(false);
        }
      }
    },
  );

  return (
    <View style={{ backgroundColor: backgroundColor.light }}>
      <View style={[styles.container]}>
        {currentTrack ? (
          <View style={styles.trackArtContainer}>
            <Image
              style={styles.trackArt}
              source={{
                uri: currentTrack?.artwork,
              }}
            />
          </View>
        ) : (
          <View style={styles.trackArtContainer}>
            <Image style={styles.trackArt} source={albumArt} />
          </View>
        )}
        <View style={styles.progressContainer}>
          <Slider
            minimumValue={0}
            value={position}
            maximumValue={duration}
            style={styles.progress}
            onValueChange={(value: number) => TrackPlayer.seekTo(value)}
          />

          <View style={styles.progressTextContainer}>
            <Text>{formatTrackDuration(position)}</Text>
            <Text>{formatTrackDuration(duration - position)}</Text>
          </View>
        </View>

        {currentTrack ? (
          <View style={styles.trackInformation}>
            <Text style={styles.trackTitle}>{currentTrack.title}</Text>
            <Text
              style={
                styles.artistAndTitle
              }>{`${currentTrack.artist} - ${currentTrack.title}`}</Text>
          </View>
        ) : (
          <View style={styles.noTrackInformation}>
            <ActivityIndicator size="small" color="black" />
          </View>
        )}

        <View style={styles.controlsContainer}>
          <MDIcon
            name={repeatIcon}
            onPress={handleSetRepeat}
            size={18}
            color="black"
          />

          <Icon
            name="play-skip-back"
            onPress={prevDisabled ? () => {} : TrackPlayer.skipToPrevious}
            size={30}
            color={prevDisabled ? 'grey' : 'black'}
          />
          {trackPlayerElem}
          <Icon
            name="play-skip-forward"
            onPress={nextDisabled ? () => {} : TrackPlayer.skipToNext}
            size={30}
            color={nextDisabled ? 'grey' : 'black'}
          />
          <Icon name="shuffle" size={20} />
        </View>
      </View>
      <Playlist
        currentTrack={currentTrack}
        tracks={tracks}
        background={backgroundColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  trackArtContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    backgroundColor: 'grey',
    marginTop: 30,
    borderRadius: 5,
    zIndex: 0,
  },
  trackArt: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.5,
    borderRadius: 5,
    zIndex: 0,
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
  noTrackInformation: {
    height: 40,
    justifyContent: 'center',
  },
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
