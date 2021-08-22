import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import { Card } from '../../../components';

import placeholder from '../assets/placeholder-person.png';

const NoCards = () => {
  return (
    <Card
      style={{ ...styles.card, backgroundColor: '#DFECEC' }}
      raised={{ height: 0.7 }}>
      <Image style={styles.image} source={placeholder} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>No Cards to display</Text>
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
    bottom: 30,
  },
  text: {
    marginLeft: 10,
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
  },
  image: {
    width: Dimensions.get('window').width * 0.88,
    height: 500,
    alignSelf: 'center',
    opacity: 0.6,
  },
});

export default NoCards;
