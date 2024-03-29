import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import Slider from '@react-native-community/slider';
import { formatVideoDuration } from '../utils';

import type { FunctionComponent, RefObject } from 'react';
import { Video as TVideo, Direction } from '../interfaces';

type VoidFn = (arg: any) => void;

interface ComponentProps {
  onLoad: VoidFn;
  onProgress: VoidFn;
  onEnd: () => void;
  onSkip: (direction: Direction) => void;
  onTogglefullScreen: VoidFn;
  refObj: RefObject<Video>;
  currentVideo: TVideo;
  loaded: boolean;
  fullScreen: boolean;
  currentVideoDetails: {
    duration?: number;
    naturalSize?: {};
    currentTime?: number;
    playableDuration?: number;
  };
}

const VideoComp: FunctionComponent<ComponentProps> = ({
  onLoad,
  onProgress,
  onEnd,
  onSkip,
  onTogglefullScreen,
  fullScreen,
  refObj,
  currentVideo,
  currentVideoDetails,
  loaded,
}) => {
  const [paused, setPaused] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
  const [toggledDescription, toggleDescription] = React.useState(false);
  const onSeek = (value: number) => {
    refObj.current?.seek(value);
  };

  return (
    <>
      <Video
        source={{
          uri: currentVideo.source,
        }}
        ref={refObj}
        style={fullScreen ? styles.fullScreen : styles.video}
        onLoad={onLoad}
        onEnd={onEnd}
        onProgress={onProgress}
        resizeMode={'contain'}
        paused={paused}
        onTouchStart={() => {
          setShowControls(true);
          setTimeout(() => setShowControls(false), 2000);
        }}
      />
      {!loaded && (
        <View style={styles.videoPlaceholder}>
          <ActivityIndicator color={'white'} size={'large'} />
        </View>
      )}
      {showControls && (
        <View style={fullScreen ? styles.fullScreenControls : styles.controls}>
          <View></View>
          <View style={styles.playbackControls}>
            <Icon
              name="play-skip-back"
              size={32}
              color="white"
              onPress={() => onSkip(Direction.Back)}
            />
            <Icon
              name={paused ? 'play' : 'pause'}
              size={32}
              color="white"
              onPress={() => setPaused(!paused)}
            />
            <Icon
              name="play-skip-forward"
              size={32}
              color="white"
              onPress={() => onSkip(Direction.Forward)}
            />
          </View>
          <View>
            <View style={styles.duationContainer}>
              {currentVideoDetails.duration &&
              currentVideoDetails.currentTime ? (
                <Text style={styles.duration}>
                  {formatVideoDuration(currentVideoDetails.currentTime)}/
                  {formatVideoDuration(currentVideoDetails.duration)}
                </Text>
              ) : (
                <Text>0:00/0:00</Text>
              )}
              {/* <Icon
                name="tablet-landscape-outline"
                size={20}
                color="white"
                onPress={() => onTogglefullScreen(true)}
              /> */}
            </View>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={currentVideoDetails.duration || 0}
              value={currentVideoDetails.currentTime || 0}
              minimumTrackTintColor="red"
              maximumTrackTintColor="#000000"
              thumbTintColor="red"
              onValueChange={value => onSeek(value)}
            />
          </View>
        </View>
      )}
      {!fullScreen && (
        <View style={styles.subscript}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{currentVideo.title}</Text>
            <Icon
              name={
                toggledDescription
                  ? 'chevron-up-outline'
                  : 'chevron-down-outline'
              }
              size={20}
              color="black"
              onPress={() => toggleDescription(!toggledDescription)}
            />
          </View>
          {toggledDescription ? (
            <Text style={styles.description}>{currentVideo.description}</Text>
          ) : (
            <Text style={styles.description} numberOfLines={1}>
              {currentVideo.description}
            </Text>
          )}
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
  fullScreen: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  fullScreenControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.6,
    justifyContent: 'space-between',
  },
  controls: {
    backgroundColor: 'black',
    height: 225,
    width: Dimensions.get('window').width,
    marginTop: -225,
    opacity: 0.6,
    justifyContent: 'space-between',
  },
  playbackControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  duration: {
    color: 'white',
  },
  duationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  slider: {
    width: Dimensions.get('window').width,
    height: 20,
    marginBottom: -10,
    padding: 0,
    marginLeft: -10,
    marginRight: -10,
  },
  subscript: {
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    fontSize: 13,
    color: '#6D6D6D',
  },
  videoPlaceholder: {
    height: 225,
    marginTop: -225,
    width: Dimensions.get('window').width,
    backgroundColor: '#999999',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoComp;
