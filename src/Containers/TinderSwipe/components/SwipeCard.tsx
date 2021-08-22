import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card } from '../../../components';

import type { FunctionComponent } from 'react';
import { Profile } from '../interfaces';

interface ComponentProps {
  active?: boolean;
  profile: Profile;
}

const SwipeCard: FunctionComponent<ComponentProps> = ({ active, profile }) => {
  return (
    <Card
      style={{ ...styles.card, backgroundColor: 'grey' }}
      raised={active ? { height: 0.7 } : undefined}>
      <ImageBackground
        imageStyle={styles.imageBackground}
        style={styles.image}
        source={{
          uri: profile.image,
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{profile.name}</Text>
        <Text style={styles.text}>{profile.age}</Text>
        <View style={styles.location}>
          <Icon name="location" color="white" size={20} />
          <Text style={styles.locationText}>{profile.distance}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 501,
    width: Dimensions.get('window').width * 0.88,
    alignSelf: 'center',
    backgroundColor: '#F2FFFF',
    marginHorizontal: Dimensions.get('window').width * 0.06,
    borderRadius: 7,
    elevation: 0.2,
  },
  textContainer: {
    width: Dimensions.get('window').width * 0.88,
    position: 'absolute',
    bottom: 10,
  },
  text: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
  },
  imageBackground: {
    opacity: 1,
    borderRadius: 7,
  },
  image: {
    width: Dimensions.get('window').width * 0.88,
    height: 500,
    alignSelf: 'center',
    opacity: 0.6,
  },
  location: {
    marginLeft: 10,
    marginTop: 5,
    flexDirection: 'row',
  },
  locationText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 5,
  },
});

export default SwipeCard;
