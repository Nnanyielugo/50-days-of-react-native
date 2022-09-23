import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Video from 'react-native-video';
import VideoComp from './components/video';
import Preview from './components/preview';
import { LoadingList, LoadingVideo } from './components/loading';
import { fetchVideos } from './api';

import type { RefObject } from 'react';
import { Video as TVideo, Direction } from './interfaces';

interface State {
  videos: TVideo[];
  selectedIndex: number;
  currentVideoDetails: {};
  loadedSelectedVideo: boolean;
  fullScreen: boolean;
}

class VideoPlayer extends Component<{}, State> {
  state = {
    videos: [],
    selectedIndex: 0,
    currentVideoDetails: {},
    loadedSelectedVideo: false,
    fullScreen: false,
  };

  componentDidMount() {
    fetchVideos().then(videos => {
      this.setState({ videos });
    });
  }

  video: RefObject<Video> = React.createRef();

  toggleFullScreen = (toggle: boolean) => {
    if (toggle) {
      this.video.current?.presentFullscreenPlayer();
      this.setState(state => ({
        ...state,
        fullScreen: true,
      }));
    } else {
      this.video.current?.dismissFullscreenPlayer();
      this.setState(state => ({
        ...state,
        fullScreen: true,
      }));
    }
  };

  onEnd = () => {
    this.skip(Direction.Forward);
  };

  skip = (direction: Direction) => {
    const { selectedIndex, videos } = this.state;
    let indexToSkip =
      direction === Direction.Forward ? selectedIndex + 1 : selectedIndex - 1;
    if (indexToSkip < 0) {
      indexToSkip = videos.length - 1;
    }
    if (indexToSkip > videos.length - 1) {
      indexToSkip = 0;
    }
    this.setState(state => ({
      ...state,
      selectedIndex: indexToSkip,
      loadedSelectedVideo: false,
    }));
  };

  onProgress = (data: any) => {
    this.setState(state => ({
      ...state,
      currentVideoDetails: {
        ...state.currentVideoDetails,
        currentTime: data.currentTime,
        playableDuration: data.playableDuration,
      },
    }));
  };

  setCurrent = (index: number) => {
    this.setState(state => ({
      ...state,
      selectedIndex: index,
      loadedSelectedVideo: false,
    }));
  };

  onLoad = (data: any) => {
    this.setState(state => ({
      ...state,
      currentVideoDetails: {
        duration: data.duration,
        naturalSize: data.naturalSize,
      },
      loadedSelectedVideo: true,
    }));
  };
  render() {
    const {
      videos,
      selectedIndex,
      currentVideoDetails,
      loadedSelectedVideo,
      fullScreen,
    } = this.state;
    if (!videos.length) {
      return (
        <>
          <LoadingVideo />
          <LoadingList />
        </>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <VideoComp
          onLoad={this.onLoad}
          onProgress={this.onProgress}
          refObj={this.video}
          currentVideo={videos[selectedIndex]}
          currentVideoDetails={currentVideoDetails}
          loaded={loadedSelectedVideo}
          onEnd={this.onEnd}
          onSkip={this.skip}
          onTogglefullScreen={this.toggleFullScreen}
          fullScreen={fullScreen}
        />
        <ScrollView>
          {!fullScreen &&
            videos.map((video, index) => {
              if (index !== selectedIndex)
                return (
                  <Preview
                    setCurrent={this.setCurrent}
                    video={video}
                    key={index}
                    index={index}
                  />
                );
            })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  videoPlaceholder: {
    height: 225,
    width: 400,
    backgroundColor: '#ECECEC',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default VideoPlayer;
