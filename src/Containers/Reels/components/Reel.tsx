import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
} from 'react-native';

import { Item } from '../utils';

import type { FunctionComponent } from 'react';
import type { GestureResponderEvent } from 'react-native';

interface ReelProps {
  onTouchStart: (e: GestureResponderEvent) => void;
  onTouchEnd: (e: GestureResponderEvent) => void;
  onLongPress: () => void;
  item: Item;
}
const Reel: FunctionComponent<ReelProps> = ({
  onLongPress,
  onTouchEnd,
  onTouchStart,
  item,
}) => {
  return (
    <Pressable
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onLongPress={onLongPress}>
      <View style={styles.container}>
        {item.type === 'text' ? (
          <Text style={styles.text}>{item.text}</Text>
        ) : (
          <Image source={item.source} style={styles.image} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.9,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  image: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width * 0.95,
    fontSize: 24,
    fontWeight: '500',
    lineHeight: 35,
    marginTop: Dimensions.get('window').height * 0.5,
  },
});

export default Reel;
