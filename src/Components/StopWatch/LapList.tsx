//import liraries
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';

import type { FunctionComponent } from 'react';

import { format, padZero } from './utils';

interface LapListProps {
  laps: number[];
}
interface ListItemProps {
  lap: any;
}

const ListItem: FunctionComponent<ListItemProps> = ({ lap }): JSX.Element => {
  lap.index += 1;
  return (
    <>
      <View style={styles.lap}>
        <Text style={styles.lapText}>{`Lap ${padZero(lap.index)}`}</Text>
        <Text style={styles.lapText}>{format(lap.item)}</Text>
      </View>
    </>
  );
};

const LapList: FunctionComponent<LapListProps> = ({ laps }) => {
  const _renderItem = (lap: any) => {
    return <ListItem lap={lap} />;
  };

  const _keyExtractor = (item: number, index: number) => index.toString();

  const _itemSeperator = () => <View style={styles.separator} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={laps}
        renderItem={_renderItem}
        ItemSeparatorComponent={_itemSeperator}
        keyExtractor={_keyExtractor}
        scrollEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 5,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.57,
  },
  separator: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lap: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  lapText: {
    fontSize: 18,
  },
});

export default LapList;
