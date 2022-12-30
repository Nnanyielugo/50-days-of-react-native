import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  Pressable,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import type { FunctionComponent } from 'react';

import type { IPlace } from '../types';
import MapsModal from './maps-modal';

type Place = {
  index: number;
  layoutIndex: number;
  place: IPlace;
};

type RatingStars = 'star' | 'star-outline' | 'star-half-full';

function getRatingStar(placeRating: number, comparison: number): RatingStars {
  if (placeRating < comparison) {
    if (placeRating > comparison - 1) {
      return 'star-half-full';
    } else {
      return 'star-outline';
    }
  } else {
    return 'star';
  }
}

const Place: FunctionComponent<Place> = ({ index, layoutIndex, place }) => {
  const opacityAnim = React.useRef(new Animated.Value(0.6)).current;
  const heightAnim = React.useRef(new Animated.Value(200)).current;
  const nameFontAnim = React.useRef(new Animated.Value(15)).current;
  const addressFontAnim = React.useRef(new Animated.Value(10)).current;
  const ratingsSizeAnim = React.useRef(new Animated.Value(0.5)).current;
  const [isModalVisible, handleToggleModal] = React.useState(false);

  const AnimatedIcon = Animated.createAnimatedComponent(Icon);

  React.useEffect(() => {
    if (layoutIndex === index) {
      fadeIn();
    }

    return () => {
      fadeOut();
    };
  }, [layoutIndex]); //eslint-disable-line react-hooks/exhaustive-deps

  const openModal = () => {
    handleToggleModal(true);
  };
  const closeModal = () => {
    handleToggleModal(false);
  };

  const fadeIn = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 210,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(nameFontAnim, {
        toValue: 18,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(addressFontAnim, {
        toValue: 15,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(ratingsSizeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const fadeOut = () => {
    Animated.parallel([
      Animated.timing(opacityAnim, {
        toValue: 0.6,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(heightAnim, {
        toValue: 200,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(nameFontAnim, {
        toValue: 15,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(addressFontAnim, {
        toValue: 10,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(ratingsSizeAnim, {
        toValue: 0.5,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const ratings = [1, 2, 3, 4, 5];
  return (
    <Pressable
      onPress={openModal}
      style={state => ({
        opacity: state.pressed ? 0.6 : 1,
      })}>
      <MapsModal
        coords={place.location}
        isVisible={isModalVisible}
        closeModal={closeModal}
        placeName={place.name}
      />
      <Animated.View
        style={[
          styles.container,
          { height: heightAnim, opacity: opacityAnim },
        ]}>
        <View style={styles.subContainer}>
          <View style={styles.imageContainer}>
            <Animated.Image
              source={{ uri: place.image }}
              style={[styles.image, { height: heightAnim }]}
            />
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.nameContainer}>
              <Animated.Text style={[styles.name, { fontSize: nameFontAnim }]}>
                {place.name}
              </Animated.Text>
            </View>
            <View style={styles.ratingsContainer}>
              <View style={styles.ratings}>
                {ratings.map((item, index) => {
                  if (!place.rating) {
                    return null;
                  }
                  return (
                    <AnimatedIcon
                      key={index}
                      size={20}
                      name={getRatingStar(place.rating, item)}
                      style={{
                        transform: [
                          {
                            scale: ratingsSizeAnim,
                          },
                        ],
                      }}
                      color="grey"
                    />
                  );
                })}
              </View>
              <Animated.Text style={{ fontSize: addressFontAnim }}>
                {place.rating}
              </Animated.Text>
            </View>
            <View style={styles.addressRatingContainer}>
              <Animated.Text
                style={[styles.address, { fontSize: addressFontAnim }]}>
                {place.address}
              </Animated.Text>
            </View>
          </View>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH * 0.85,
    zIndex: 999,
  },
  subContainer: {
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: 'transparent',
    height: 200,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameContainer: {
    marginHorizontal: 10,
  },
  name: {
    fontWeight: '600',
  },
  addressRatingContainer: {
    marginHorizontal: 10,
  },
  address: {},
  detailsContainer: {
    width: '60%',
    height: 180,
    backgroundColor: 'rgba(245, 245, 245, 1)',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  ratingsContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'space-between',
  },
  ratings: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: '40%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  image: {
    width: '100%',
  },
});

export default Place;
