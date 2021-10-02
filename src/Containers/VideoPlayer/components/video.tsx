import React from 'react';
import type { FunctionComponent, RefObject } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';

type VoidFn = (arg: any) => void;

interface ComponentProps {
  onError: VoidFn;
  onLoad: VoidFn;
  onBuffer: VoidFn;
  refObj: RefObject<Video>;
}

const VideoComp: FunctionComponent<ComponentProps> = ({
  onError,
  onBuffer,
  onLoad,
  refObj,
}) => {
  // const video: RefObject<Video> = React.createRef();
  return (
    <Video
      source={{
        // uri: 'https://storage.googleapis.com/muxdemofiles/mux-video-intro.mp4',
        uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      }}
      ref={refObj}
      style={styles.video}
      onBuffer={onBuffer}
      onError={onError}
      onLoad={onLoad}
      resizeMode={'contain'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
  video: {
    height: 225,
    width: 400,
    // backgroundColor: 'red',
  },
});

export default VideoComp;
