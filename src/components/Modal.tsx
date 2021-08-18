import React from 'react';
import { View, StyleSheet, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import type { FunctionComponent } from 'react';
import type { NamedStyles } from '../utils/interfaces';

interface ComponentProps {
  isVisible: boolean;
  closeModal: () => void;
  style?: NamedStyles;
  closeIconSize?: number;
  closeIconColor?: string;
  iconStyle?: NamedStyles;
}

export const ModalComp: FunctionComponent<ComponentProps> = ({
  isVisible,
  closeModal,
  children,
  style,
  iconStyle,
}) => {
  return (
    <Modal transparent visible={isVisible} onRequestClose={closeModal}>
      <View style={[styles.container, style]}>
        <Icon
          style={iconStyle}
          name="close-outline"
          color="black"
          size={25}
          onPress={closeModal}
        />
        {children}
      </View>
    </Modal>
  );
};

ModalComp.defaultProps = {
  closeIconSize: 25,
  closeIconColor: 'black',
  iconStyle: {
    marginLeft: Dimensions.get('window').width * 0.88,
  },
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    opacity: 0.9,
    alignSelf: 'center',
  },
});

export default ModalComp;
