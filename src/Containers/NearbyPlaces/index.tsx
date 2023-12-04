import React from 'react';
import { View, StyleSheet } from 'react-native';

import Container from './components';

import type { RootStackParamList } from '../../utils/interfaces';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { FunctionComponent } from 'react';

interface NearbyPlacesProps {
  navigation: StackNavigationProp<RootStackParamList>;
}
const NearbyPlaces: FunctionComponent<NearbyPlacesProps> = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Container goBack={goBack} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default NearbyPlaces;
