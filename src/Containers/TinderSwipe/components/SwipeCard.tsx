import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
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
      style={{ ...styles.card }}
      raised={active ? { height: 3 } : undefined}>
      <Image
        style={styles.image}
        source={{
          uri: profile.image,
        }}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 400,
    width: Dimensions.get('window').width * 0.88,
    alignSelf: 'center',
    backgroundColor: 'whitesmoke',
    marginHorizontal: Dimensions.get('window').width * 0.06,

    // marginHorizontal: 10,
    borderRadius: 7,
    elevation: 0.5,
    // position: 'absolute',
  },
  text: {
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.88,
    height: 300,
  },
});

export default SwipeCard;
