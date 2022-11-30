import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../../../components';
import ReelsModal from './ReelsModal';

const ControlsContainer = () => {
  const [modalState, setModalState] = React.useState(false);
  const closeModal = () => {
    setModalState(false);
  };

  const openModal = () => {
    setModalState(true);
  };
  return (
    <View style={styles.container}>
      {modalState && (
        <ReelsModal isVisible={modalState} closeModal={closeModal} />
      )}
      <Text>ControlsContainer</Text>

      <Button onPress={openModal}>Open Modal</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    alignItems: 'center',
  },
});

export default ControlsContainer;
