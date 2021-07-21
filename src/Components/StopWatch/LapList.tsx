//import liraries
import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

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
    <View style={styles.lap}>
      <Text style={styles.lapText}>{`Lap ${padZero(lap.index)}`}</Text>
      <Text style={styles.lapText}>{format(lap.item)}</Text>
    </View>
  );
};

const LapList: FunctionComponent<LapListProps> = ({ laps }) => {
  const _renderItem = (lap: any) => {
    return <ListItem lap={lap} />;
  };

  const _itemSeperator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={laps}
        renderItem={_renderItem}
        ItemSeparatorComponent={_itemSeperator}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
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
