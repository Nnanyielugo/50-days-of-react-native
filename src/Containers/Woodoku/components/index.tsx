import React from 'react';
import { View, StyleSheet } from 'react-native';
import Board from './board';

import { generateRow, generateBoard } from '../functions';
import type { BrickObj, RowObj } from '../types';

const Woodoku = () => {
  const [rows, setRows] = React.useState<RowObj[]>([]);

  React.useEffect(() => {
    setRows(generateBoard());
  }, []);

  return (
    <View style={styles.container}>
      <Board rows={rows} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default Woodoku;
