import React, { Component } from 'react';
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
    profiles: [],
    loaded: false,
    error: null,
  };

  componentDidMount() {
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
  }

  render() {
    const { profiles, loaded, error } = this.state;
    return <SwipeCards profiles={profiles} loaded={loaded} error={error} />;
  }
}

export default TinderSwipe;
