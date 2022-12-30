import React from 'react';
import { View, StyleSheet, Pressable, Platform, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';

import Button from '../../../components/Button';

import type { FunctionComponent } from 'react';

type latLng = {
  lat: number;
  lng: number;
};

interface MapsModalProps {
  isVisible: boolean;
  closeModal: () => void;
  coords: latLng;
  placeName: string;
}

const MapsModal: FunctionComponent<MapsModalProps> = ({
  isVisible,
  closeModal,
  coords,
  placeName,
}) => {
  const openMap = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${coords.lat},${coords.lng}`;
    const label = placeName;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url as string);
  };

  return (
    <Modal
      animationIn={'fadeInUp'}
      animationOut="fadeOutDown"
      isVisible={isVisible}>
      <Pressable
        onPress={closeModal}
        style={state => ({
          opacity: state.pressed ? 0.6 : 1,
        })}>
        <Icon name="close" size={25} color="white" />
      </Pressable>
      <View style={styles.container}>
        <Button
          onPress={openMap}
          style={{ container: styles.proceedButtonContainerStyle }}>
          Open Map
        </Button>
        <Button
          onPress={closeModal}
          style={{ container: styles.cancelButtonContainerStyle }}>
          Cancel
        </Button>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    height: 200,
  },
  proceedButtonContainerStyle: {
    borderRadius: 5,
    backgroundColor: '#4D8EB8',
    elevation: 0,
  },
  cancelButtonContainerStyle: {
    backgroundColor: '#B84D4D',
    borderRadius: 5,

    elevation: 0,
  },
});

export default MapsModal;
