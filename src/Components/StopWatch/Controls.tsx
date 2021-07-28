import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../utils/Button';

import type { FunctionComponent } from 'react';

type VoidFn = () => void;

interface ComponentProps {
  start: VoidFn;
  stop: VoidFn;
  split: VoidFn;
  running: boolean;
  startColor: string;
}

const Controls: FunctionComponent<ComponentProps> = ({
  running,
  start,
  stop,
  split,
  startColor,
}) => {
  return (
    <View style={styles.container}>
      <Button
        onPress={split}
        disabled={!running}
        inactiveColor="whitesmoke"
        style={{
          container: {
            backgroundColor: '#F4F4F4',
          },
          text: {
            color: running ? 'grey' : 'grey',
          },
        }}>
        Lap
      </Button>

      <Button
        onPress={!running ? start : stop}
        style={{
          container: {
            backgroundColor: '#F4F4F4',
          },
          text: {
            color: running ? 'red' : startColor,
          },
        }}>
        {!running ? 'Start' : 'Stop'}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Controls;
