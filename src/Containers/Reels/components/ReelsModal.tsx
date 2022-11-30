import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
} from 'react-native';

import type { FunctionComponent } from 'react';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface ReelsModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const data = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris tellus, tristique nec ornare et, aliquet vitae ex.',
  },
  {
    text: 'Vestibulum mi augue, mattis vel enim nec, accumsan mollis nibh. Aliquam pulvinar, enim quis luctus egestas, nisl neque euismod metus, a euismod nunc diam ac est.',
  },
  {
    text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas semper justo metus, eu condimentum lectus lacinia vel. Vivamus dapibus aliquet nisl, quis semper enim laoreet nec.',
  },
];

const ReelsModal: FunctionComponent<ReelsModalProps> = ({
  isVisible,
  closeModal,
}) => {
  let scrollViewRef = React.useRef<ScrollView | null>(null);
  let [layoutIndex, setLayoutIndex] = React.useState<number>(1);
  const timeout = 4000; // in ms

  React.useEffect(() => {
    let timer = setInterval(scrollToNext, timeout);
    return () => {
      clearInterval(timer);
    };
  }, [layoutIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToNext = () => {
    const width = Dimensions.get('window').width;
    scrollViewRef.current?.scrollTo({
      // y: 0,
      x: width * layoutIndex,
      animated: true,
    });
  };

  const beginModalClosing = () => {
    setTimeout(() => {
      closeModal();
    }, timeout);
  };

  const handleScroll = ({
    nativeEvent: { contentOffset, layoutMeasurement },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const widthForFullSwipe = layoutMeasurement.width;
    let focusedIndex = contentOffset.x / widthForFullSwipe;

    if (!Number.isInteger(focusedIndex)) {
      return;
    }

    setLayoutIndex(focusedIndex + 1);

    if (contentOffset.x >= layoutMeasurement.width * (data.length - 1)) {
      beginModalClosing();
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={closeModal}
      animationType="slide">
      <ScrollView
        contentContainerStyle={styles.container}
        ref={scrollViewRef}
        onScroll={handleScroll}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled>
        {data.map((item, index) => {
          return (
            <View key={index} style={styles.item}>
              <Text>{item.text}</Text>
            </View>
          );
        })}
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexgrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  item: {
    width: Dimensions.get('window').width,
    paddingHorizontal: 20,
  },
});

export default ReelsModal;
