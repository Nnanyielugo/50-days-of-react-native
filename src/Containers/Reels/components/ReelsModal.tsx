import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';

import { data } from '../utils';

import type { FunctionComponent } from 'react';
import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Indicator from './indicator';

interface ReelsModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

const ReelsModal: FunctionComponent<ReelsModalProps> = ({
  isVisible,
  closeModal,
}) => {
  let scrollViewRef = React.useRef<ScrollView | null>(null);
  let [layoutIndex, setLayoutIndex] = React.useState<number>(1);
  let [timerDuration, setTimerDuration] = React.useState(
    React.useRef(500).current,
  );
  const timeout = 4000; // in ms
  let upperTimer = React.useRef<NodeJS.Timer | number>(0);

  React.useEffect(() => {
    const totaling = setInterval(() => {
      setTimerDuration((timerDuration += 100)); // eslint-disable-line react-hooks/exhaustive-deps
    }, 100);

    return () => {
      clearInterval(totaling);
    };
  });

  React.useEffect(() => {
    setTimerDuration(300);
    let timer = upperTimer.current;
    timer = setInterval(scrollToNext, timeout);
    return () => {
      clearInterval(timer as NodeJS.Timer);
    };
  }, [layoutIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const scrollToNext = () => {
    const width = Dimensions.get('window').width;
    scrollViewRef.current?.scrollTo({
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
    <SafeAreaView>
      <Modal
        visible={isVisible}
        onRequestClose={closeModal}
        animationType="slide"
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.indicator}>
          {data.map((_, index) => {
            return (
              <Indicator
                key={index}
                timeout={timeout}
                timerDuration={timerDuration}
                itemIndex={index}
                layoutIndex={layoutIndex}
              />
            );
          })}
        </ScrollView>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.item}>
                {item.type === 'text' ? (
                  <Text>{item.text}</Text>
                ) : (
                  <Image source={item.source} style={styles.image} />
                )}
              </View>
            );
          })}
        </ScrollView>
      </Modal>
    </SafeAreaView>
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
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  indicator: {
    height: 4,
    marginTop: 50,
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  image: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default ReelsModal;
