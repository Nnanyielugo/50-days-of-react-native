import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Carousel1 from '../assets/carousel-1.jpeg';
import Carousel2 from '../assets/carousel-2.jpeg';
import Carousel3 from '../assets/carousel-3.jpeg';

import type {
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageSourcePropType,
} from 'react-native';

interface Images {
  source: ImageSourcePropType;
}

const defaultImages: Images[] = [
  {
    source: Carousel1,
  },
  {
    source: Carousel2,
  },
  {
    source: Carousel3,
  },
];

const CarouselComp = () => {
  let scrollViewRef = React.useRef<ScrollView | null>(null);
  let [layoutIndex, setLayoutIndex] = React.useState<number>(1);
  let [data, setData] = React.useState<Images[]>(defaultImages);

  React.useEffect(() => {
    let timer = setInterval(scrollToNext, 4000);
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

  const handleScroll = ({
    nativeEvent: { contentOffset, layoutMeasurement },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    // console.log(
    //   contentOffset.x,
    //   layoutMeasurement,
    // data.length,
    // layoutMeasurement.width * (data.length - 1),
    // );
    const widthForFullSwipe = layoutMeasurement.width;
    let focusedIndex = contentOffset.x / widthForFullSwipe;

    if (!Number.isInteger(focusedIndex)) {
      return;
    }

    // console.log('focused index', focusedIndex);
    setLayoutIndex(focusedIndex + 1);

    if (contentOffset.x >= layoutMeasurement.width * (data.length - 1)) {
      setData(data.concat(defaultImages));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        onScroll={handleScroll}
        horizontal
        // disableIntervalMomentum
        // decelerationRate={0}
        // snapToInterval={Dimensions.get('window').width - 60}
        // snapToOffsets={[]}
        // snapToAlignment="center"
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {data.map((image, index) => {
          return (
            <Image key={index} source={image.source} style={styles.image} />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  image: {
    height: 300,
    width: Dimensions.get('window').width,
  },
});

export default CarouselComp;
