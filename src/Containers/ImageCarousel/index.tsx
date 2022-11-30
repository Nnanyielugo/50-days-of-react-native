import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
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
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default ImageCarousel;
