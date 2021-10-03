import React, { Component } from 'react';
import type { RefObject } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Video from 'react-native-video';
import VideoComp from './components/video';
import Preview from './components/preview';
import { fetchVideos } from './api';
import { Video as TVideo } from './interfaces';

interface State {
  videos: TVideo[];
  selectedIndex: number;
}

class VideoPlayer extends Component<{}, State> {
  state = {
    videos: [],
    selectedIndex: 0,
  };

  componentDidMount() {
    fetchVideos().then(videos => {
      this.setState({ videos });
    });
  }

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

  setCurrent = (index: number) => {
    this.setState(state => ({
      ...state,
      selectedIndex: index,
    }));
  };

  onLoad(data: any) {
    console.log('loaded', data);
  }
  render() {
    const { videos, selectedIndex } = this.state;
    if (!videos.length) {
      return (
        <View style={styles.videoPlaceholder}>
          <ActivityIndicator color={'grey'} size={'large'} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <VideoComp
          onError={this.onError}
          onLoad={this.onLoad}
          onBuffer={this.onBuffer}
          refObj={this.video}
          currentVideo={videos[selectedIndex]}
        />
        <ScrollView>
          {videos.map((video, index) => {
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
      </View>
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
