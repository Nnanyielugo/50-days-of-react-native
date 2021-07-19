import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import Timer from '../Components/StopWatch/Timer';
import Controls from '../Components/StopWatch/Controls';
import LapList from '../Components/StopWatch/LapsList';
import format from '../Components/StopWatch/utils';
import Button from '../Components/StopWatch//Buttons';

class Index extends Component {
  getInitialState = () => ({
    timeElapsed: 0,
    laps: [],
    running: false,
    lastLap: 0,
  });

  state = this.getInitialState();

  start = () => {
    const { running } = this.state;
    if (!running) {
      this.timing = Date.now();
      this.timer = setInterval(this.update, 100);
      this.setState({ running: true });
    }
  };

  update = () => {
    let diff = Date.now() - this.timing;
    this.setState(state => ({
      timeElapsed: state.timeElapsed + diff,
      lastLap: state.lastLap + diff,
    }));
    this.timing = Date.now();
  };

  split = () => {
    this.setState(state => ({
      laps: state.laps.concat(state.timeElapsed),
      lastLap: this.getInitialState().lastLap,
    }));
  };

  stop = () => {
    clearInterval(this.timer);
    this.setState({
      running: false,
    });
  };

  reset = () => {
    clearInterval(this.timer);
    this.setState(() => ({
      ...this.getInitialState(),
    }));
  };

  render() {
    const { timeElapsed, laps, running, lastLap } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
              startCOlor={running ? 'grey' : 'blue'}
            />
            <View style={{ width: Dimensions.get('screen').width * 0.9 }}>
              <LapList laps={laps} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.cancelContainer}>
          <Button
            text="Reset"
            disable={!running && timeElapsed === 0}
            inactiveColor="#F7AFAF"
            color="#E31919"
            textColor="white"
            style={{
              container: styles.cancelButton,
              text: styles.cancelButtonText,
            }}
            onPress={this.reset}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 90,
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
  header: {
    backgroundColor: 'white',
    width: Dimensions.get('screen').width,
  },
  cancelContainer: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    paddingBottom: 20,
    backgroundColor: 'whitesmoke',
  },
  cancelButton: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  cancelButtonText: {
    fontSize: 19,
  },
});

export default Index;
