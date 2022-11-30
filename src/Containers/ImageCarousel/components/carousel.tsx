import React from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

import type { NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import { defaultImages, Item } from '../utils';
import ImageItem from './item';

const CarouselComp = () => {
  let scrollViewRef = React.useRef<ScrollView | null>(null);
  let [layoutIndex, setLayoutIndex] = React.useState<number>(0);
  let [data, setData] = React.useState<Item[]>(defaultImages);

  const handleScroll = ({
    nativeEvent: { contentOffset, layoutMeasurement },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const widthForFullSwipe = layoutMeasurement.width;
    let focusedIndex = contentOffset.x / (widthForFullSwipe * 0.85);

    setLayoutIndex(Math.ceil(focusedIndex));

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
        decelerationRate={'fast'}
        snapToInterval={Dimensions.get('window').width * 0.85}
        snapToAlignment="center"
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {data.map((item, index) => {
          return (
            <ImageItem
              layoutIndex={layoutIndex}
              itemIndex={index}
              item={item}
              key={index}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
  },
});

export default CarouselComp;
