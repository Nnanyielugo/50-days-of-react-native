import React from 'react';
import type { FunctionComponent, RefObject } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { Video as TVideo } from '../interfaces';

type VoidFn = (arg: any) => void;

interface ComponentProps {
  onError: VoidFn;
  onLoad: VoidFn;
  onBuffer: VoidFn;
  refObj: RefObject<Video>;
  currentVideo: TVideo;
}

const VideoComp: FunctionComponent<ComponentProps> = ({
  onError,
  onBuffer,
  onLoad,
  refObj,
  currentVideo,
}) => {
  const [paused, setPaused] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  return (
    <>
      <Video
        source={{
          uri: currentVideo.source,
        }}
        ref={refObj}
        style={styles.video}
        onBuffer={onBuffer}
        onError={onError}
        onLoad={onLoad}
        resizeMode={'contain'}
        paused={paused}
        onTouchStart={() => {
          setShowControls(true);
          setTimeout(() => setShowControls(false), 2000);
        }}
      />
      {showControls && (
        <View style={styles.controls}>
          <Icon
            name={paused ? 'play' : 'pause'}
            size={20}
            onPress={() => setPaused(!paused)}
            style={{ alignSelf: 'center' }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  video: {
    height: 225,
    width: 400,
    backgroundColor: '#ECECEC',
  },
  controls: {
    backgroundColor: 'whitesmoke',
    marginTop: -20,
    opacity: 0.5,
  },
});

export default VideoComp;
