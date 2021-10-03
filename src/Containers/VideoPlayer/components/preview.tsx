import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import type { FunctionComponent } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Video } from '../interfaces';

interface ComponentProps {
  video: Video;
  setCurrent: (index: number) => void;
  index: number;
}

const Preview: FunctionComponent<ComponentProps> = ({
  video,
  setCurrent,
  index,
}) => {
  return (
    <Pressable style={styles.container} onPress={() => setCurrent(index)}>
      <Image source={{ uri: video.thumb }} style={styles.image} />
      <View style={styles.descriptionContainer}>
        <Icon name="person-circle-outline" size={40} />
        <View>
          <Text style={styles.title}>{video.title}</Text>
          <Text style={styles.description} numberOfLines={3}>
            {video.description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 225,
    width: 400,
  },
  title: {
    fontWeight: 'bold',
  },
  description: {
    color: '#6D6D6D',
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    width: Dimensions.get('window').width * 0.9,
  },
});

export default Preview;
