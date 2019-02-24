import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  FlatList
} from 'react-native';

import format, { padZero } from './utils';

const ListItem = ({lap}) => {
  lap.index += 1
  return (
    <View style={styles.lap}>
      <Text style={styles.lapText}>{`Lap ${padZero(lap.index)}`}</Text>
      <Text style={styles.lapText}>{format(lap.item)}</Text>
    </View>
  )
}

class LapList extends Component {
  _renderitem = (lap) => {
    return (
      <ListItem lap={lap} />
    )
  }

  _keyExtractor = (item, index) => index;

  render() {
    const { laps } = this.props; 
    return (
      <View style={styles.container}>
        <FlatList
          data={laps}
          renderItem={this._renderitem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={() => (
            <View style={styles.separator} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  separator: {
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  lap: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  lapText: {
    fontSize: 18
  }
});

export default LapList;
