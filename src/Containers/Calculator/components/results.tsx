import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import type { FunctionComponent } from 'react';

interface ResultProps {
  value: string | null;
}
const Results: FunctionComponent<ResultProps> = ({ value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.result}>{value || 0}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    height: Dimensions.get('window').height * 0.3,
    paddingHorizontal: 10,
    backgroundColor: '#2B2B2B',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  result: {
    color: '#fff',
    fontSize: 70,
  },
});

export default Results;
