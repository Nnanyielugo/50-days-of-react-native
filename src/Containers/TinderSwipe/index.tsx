import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import SwipeCards from './components/SwipeCards';
import { fetchProfiles } from './api';
import { Profile } from './interfaces';

interface ComponentProps {}
interface ComponentState {
  profiles: Profile[];
  loaded: boolean;
  error: string | null;
}
class TinderSwipe extends Component<ComponentProps, ComponentState> {
  state = {
    profiles: [] as Profile[],
    loaded: false,
    error: null,
  };

  handleFetchProfiles = () => {
    fetchProfiles()
      .then(profiles => {
        this.setState({
          error: null,
          profiles,
          loaded: true,
        });
      })
      .catch(err => {
        this.setState({
          error: err,
        });
      });
  };

  componentDidMount() {
    this.handleFetchProfiles();
  }

  removeCard = () => {
    this.setState(state => ({
      profiles: state.profiles.filter((item, index) => index !== 0),
    }));
  };

  render() {
    const { profiles, loaded } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <SwipeCards
          remove={this.removeCard}
          profiles={profiles}
          loaded={loaded}
          refresh={this.handleFetchProfiles}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF9F9',
  },
});

export default TinderSwipe;
