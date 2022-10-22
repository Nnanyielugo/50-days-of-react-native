import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CarouselComp from './components/carousel';

class ImageCarousel extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CarouselComp />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#EFF6F9',
  },
});

export default ImageCarousel;
