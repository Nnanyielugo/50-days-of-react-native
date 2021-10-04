import React from 'react';
import type { FunctionComponent, RefObject } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import { Video as TVideo, Direction } from '../interfaces';
import Slider from '@react-native-community/slider';
import { formatVideoDuration } from '../utils';

type VoidFn = (arg: any) => void;

interface ComponentProps {
  onError: VoidFn;
  onLoad: VoidFn;
  onBuffer: VoidFn;
  onProgress: VoidFn;
  onEnd: () => void;
  onSkip: (direction: Direction) => void;
  refObj: RefObject<Video>;
  currentVideo: TVideo;
  loaded: boolean;
  currentVideoDetails: {
    duration?: number;
    naturalSize?: {};
    currentTime?: number;
    playableDuration?: number;
  };
}

const VideoComp: FunctionComponent<ComponentProps> = ({
  onError,
  onBuffer,
  onLoad,
  onProgress,
  onEnd,
  onSkip,
  refObj,
  currentVideo,
  currentVideoDetails,
  loaded,
}) => {
  const [paused, setPaused] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);
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
        style={styles.video}
        onBuffer={onBuffer}
        onError={onError}
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
        <View style={styles.controls}>
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
              <Icon
                name="tablet-landscape-outline"
                size={20}
                color="white"
                // onPress={() => setPaused(!paused)}
              />
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
      <View style={styles.subscript}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{currentVideo.title}</Text>
          <Icon
            name="chevron-down-outline"
            size={20}
            color="black"
            // onPress={() => setPaused(!paused)}
          />
        </View>
        <Text style={styles.description} numberOfLines={1}>
          {currentVideo.description}
        </Text>
      </View>
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
    // paffi
    height: 20,
    marginBottom: -10,
    padding: 0,
    // paddingTop: 9,
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
