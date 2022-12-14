import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Container from './components';

import type { RootStackParamList } from '../../utils/interfaces';
import type { StackNavigationProp } from '@react-navigation/stack';

interface NearbyPlacesProps {
  navigation: StackNavigationProp<RootStackParamList>;
}
class NearbyPlaces extends Component<NearbyPlacesProps> {
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <Container goBack={this.goBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default NearbyPlaces;
