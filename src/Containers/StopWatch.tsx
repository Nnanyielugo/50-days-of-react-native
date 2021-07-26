import * as React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';

import Timer from '../Components/StopWatch/Timer';
import Controls from '../Components/StopWatch/Controls';
import LapList from '../Components/StopWatch/LapList';
import { format } from '../Components/StopWatch/utils';
import Button from '../Components/utils/Button';

interface ComponentState {
  timeElapsed: number;
  laps: number[];
  running: boolean;
  lastLap: number;
}

function getInitialState(): ComponentState {
  return {
    timeElapsed: 0,
    laps: [],
    running: false,
    lastLap: 0,
  };
}

export default class StopWatch extends React.Component<{}, ComponentState> {
  private timing!: number;
  private timer!: NodeJS.Timer;
  constructor(props: {}) {
    super(props);
    this.state = getInitialState();
  }

  start = (): void => {
    const { running } = this.state;
    if (!running) {
      this.timing = Date.now();
      this.timer = setInterval(this.update, 100);
      this.setState({ running: true });
    }
  };

  update = (): void => {
    let diff = Date.now() - this.timing;
    this.setState(state => ({
      timeElapsed: state.timeElapsed + diff,
      lastLap: state.lastLap + diff,
    }));
    this.timing = Date.now();
  };

  split = (): void => {
    this.setState(state => ({
      laps: state.laps.concat(state.lastLap),
      lastLap: getInitialState().lastLap,
    }));
  };

  stop = (): void => {
    clearInterval(this.timer);
    this.setState({
      running: false,
    });
  };

  reset = (): void => {
    clearInterval(this.timer);
    this.setState(() => ({
      ...getInitialState(),
    }));
  };

  render() {
    const { timeElapsed, laps, running, lastLap } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Timer
            time={format(timeElapsed)}
            lastLap={format(lastLap)}
            lastLapColor={running ? 'red' : 'grey'}
          />
        </View>
        <View style={styles.body}>
          <Controls
            stop={this.stop}
            start={this.start}
            split={this.split}
            running={running}
            startColor={running ? 'grey' : 'blue'}
          />
        </View>
        <LapList laps={laps} />
        <View style={styles.cancelContainer}>
          <Button
            onPress={this.reset}
            disabled={!running && laps.length === 0}
            style={{
              container: styles.cancelButton,
              text: styles.cancelButtonText,
            }}>
            Reset
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    flex: 1,
  },
  scollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
  },
  timerHeader: {
    fontSize: 30,
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 15,
  },
  body: {
    paddingTop: 15,
  },
  cancelContainer: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    // marginBottom: 20,
    backgroundColor: 'whitesmoke',
    marginTop: 50,
  },
  cancelButton: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
    color: '#E31919',
    backgroundColor: 'maroon',
  },
  cancelButtonText: {
    fontSize: 19,
    color: 'white',
  },
});
