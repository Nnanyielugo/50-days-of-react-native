import React, { Component } from 'react';
import type { RefObject } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import VideoComp from './components/video';

class VideoPlayer extends Component {
  video: RefObject<Video> = React.createRef();
  onBuffer(data: any) {
    console.log('bbuff', data);
  }
  onError(err: any) {
    console.log('err', err);
  }
  pause() {
    // this.video.current.
  }

  onLoad(data: any) {
    console.log('loaded', data);
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Text>VideoPlayer</Text> */}
        <VideoComp
          onError={this.onError}
          onLoad={this.onLoad}
          onBuffer={this.onBuffer}
          refObj={this.video}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  video: {
    height: 400,
    width: 400,
    backgroundColor: 'red',
  },
});

export default VideoPlayer;
