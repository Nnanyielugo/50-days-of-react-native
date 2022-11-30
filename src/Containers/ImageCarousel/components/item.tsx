import React from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  Image,
} from 'react-native';

import type { FunctionComponent } from 'react';
import type { Item } from '../utils';

interface ImageItemProps {
  layoutIndex: number;
  itemIndex: number;
  item: Item;
}

const ImageItem: FunctionComponent<ImageItemProps> = ({
  layoutIndex,
  itemIndex,
  item,
}) => {
  const opacityAnim = React.useRef(new Animated.Value(0.3)).current;
  const heightAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    if (layoutIndex === itemIndex) {
      fadeIn();
    }

    return () => {
      fadeOut();
    };
  }, [layoutIndex]); //eslint-disable-line react-hooks/exhaustive-deps

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 310,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0.3,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 300,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.imageContainer,
        layoutIndex === itemIndex && Platform.OS === 'ios'
          ? styles.shadow
          : styles.elevation,
        { opacity: opacityAnim },
      ]}>
      <Animated.View
        style={[
          styles.imageItem,
          { backgroundColor: item.background, height: heightAnim },
        ]}>
        <Image source={item.source} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
        <Text style={styles.subText}>{item.subText}</Text>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 230,
    width: Dimensions.get('window').width * 0.8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageContainer: {
    width: Dimensions.get('window').width * 0.85,
    alignSelf: 'center',
    marginBottom: 5,
  },
  imageItem: {
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center',
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 5,
    fontWeight: '500',
    marginTop: 10,
  },
  subText: {
    color: 'grey',
    fontSize: 12,
    marginHorizontal: 5,
    fontStyle: 'italic',
    marginTop: 5,
  },
  shadow: {
    shadowColor: 'grey',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  elevation: {
    elevation: 10,
    shadowColor: 'grey',
  },
});

export default ImageItem;
