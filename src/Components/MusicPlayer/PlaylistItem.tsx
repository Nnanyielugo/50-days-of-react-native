import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import type { FunctionComponent } from 'react';
import type { Track } from '../../utils/interfaces';

interface ComponentProps {
  track: Track;
  index: number;
}

const PlayListItem: FunctionComponent<ComponentProps> = ({ track, index }) => {
  const handlePress = () => {
    console.log('pressed');
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
          <View>
            <Text>{track.artist}</Text>
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
});

export default PlayListItem;
