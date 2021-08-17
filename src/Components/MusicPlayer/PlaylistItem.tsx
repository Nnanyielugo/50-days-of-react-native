import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {
  State,
  usePlaybackState,
} from 'react-native-track-player';

import type { FunctionComponent } from 'react';
import type { Track } from '../../utils/interfaces';

interface ComponentProps {
  track: Track;
  index: number;
  currentTrack?: Track;
}

const PlayListItem: FunctionComponent<ComponentProps> = ({
  track,
  index,
  currentTrack,
}) => {
  const playbackState = usePlaybackState();
  const handlePress = async () => {
    if (track.id === currentTrack?.id) {
      if (playbackState === State.Playing) {
        TrackPlayer.pause();
      } else {
        TrackPlayer.play();
      }
    } else {
      await TrackPlayer.skip(index);
      await TrackPlayer.play();
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={styles.container}
        onStartShouldSetResponder={() => false}
        onMoveShouldSetResponder={() => false}
        pointerEvents="none">
        <View>
          <Image
            style={styles.image}
            source={{
              uri: track.artwork,
            }}
          />
        </View>
        <View>
          <Text style={styles.title}>{track.title}</Text>
          <View style={styles.artistContainer}>
            <Text>{track.artist}</Text>
            {currentTrack && track.id === currentTrack.id && (
              <Icon name="volume-medium" size={17} />
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 5,
    flexDirection: 'row',
  },
  title: {
    fontWeight: '700',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 3,
    marginRight: 10,
  },
  artistContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width * 0.7,
  },
});

export default PlayListItem;
