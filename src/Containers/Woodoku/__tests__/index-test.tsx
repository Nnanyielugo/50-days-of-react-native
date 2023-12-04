import 'react-native';
import React from 'react';
import Woodoku from '../';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Woodoku />);
});
