import React, { Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Animated,
  Image,
} from 'react-native';

import Image1 from '../assets/image1.jpg';
import Image2 from '../assets/image2.jpg';

import type { FunctionComponent } from 'react';
import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from 'react-native';

interface ReelsModalProps {
  isVisible: boolean;
  closeModal: () => void;
}

type Item =
  | {
      type: 'image';
      source: ImageSourcePropType;
    }
  | {
      type: 'text';
      text: string;
    };

const data: Item[] = [
  {
    type: 'text',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam mauris tellus, tristique nec ornare et, aliquet vitae ex.',
  },
  {
    type: 'image',
    source: Image1,
  },
  {
    type: 'text',
    text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas semper justo metus, eu condimentum lectus lacinia vel. Vivamus dapibus aliquet nisl, quis semper enim laoreet nec.',
  },
  {
    type: 'image',
    source: Image2,
  },
  {
    type: 'text',
    text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas semper justo metus, eu condimentum lectus lacinia vel. Vivamus dapibus aliquet nisl, quis semper enim laoreet nec.',
  },
];

const INDICATOR_WIDTH =
  (Dimensions.get('window').width -
    (data.length * 1.5 + 12)) /** additional 2 pixels at the right end */ /
  data.length;

const ReelsModal: FunctionComponent<ReelsModalProps> = ({
  isVisible,
  closeModal,
}) => {
  let scrollViewRef = React.useRef<ScrollView | null>(null);
  let [layoutIndex, setLayoutIndex] = React.useState<number>(1);
  let [timerDuration, setTimerDuration] = React.useState(
    React.useRef(300).current,
  );
  let timerAnim = React.useRef(new Animated.Value(10)).current;
  const timeout = 4000; // in ms
  let upperTimer = React.useRef<NodeJS.Timer | number>(0);

  const calculateProgress = () => {
    return (timerDuration / timeout) * INDICATOR_WIDTH;
  };

  const fillDuration = () => {
    Animated.timing(timerAnim, {
      toValue: calculateProgress(),
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  React.useEffect(() => {
    fillDuration();
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
              <Fragment key={index}>
                {index === layoutIndex - 1 && (
                  <Animated.View
                    style={[
                      styles.progress,
                      {
                        width: timerAnim,
                        left:
                          index === 0 ? 0 : index * INDICATOR_WIDTH + index * 3, // take horizontal margins into account
                      },
                    ]}
                  />
                )}

                <View style={styles.indicatorItem} />
              </Fragment>
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
  indicatorItem: {
    height: 3,
    backgroundColor: 'grey',
    width: INDICATOR_WIDTH,
    marginHorizontal: 1.5,
    borderRadius: 2,
  },
  progress: {
    height: 3,
    backgroundColor: 'whitesmoke',
    marginHorizontal: 1.5,
    borderRadius: 2,
    zIndex: 999,
    position: 'absolute',
  },
  image: {
    height: Dimensions.get('window').height * 0.85,
    width: Dimensions.get('window').width * 0.95,
    borderRadius: 10,
    alignSelf: 'center',
  },
});

export default ReelsModal;
