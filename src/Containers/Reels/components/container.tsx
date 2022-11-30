import React from 'react';
import { View, StyleSheet } from 'react-native';
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

      <Button onPress={openModal}>Open Modal</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default ControlsContainer;
