import React from 'react';
import { Dimensions } from 'react-native';
import Placeholder from '../../../components/Placeholder';

const DeviceWidth = Dimensions.get('window').width;

export const LoadingVideo = () => {
  return (
    <Placeholder>
      <Placeholder.Item width={DeviceWidth} height={225} />
      <Placeholder.Item width={DeviceWidth} marginTop={5} height={50} />
    </Placeholder>
  );
};

export const LoadingList = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <Placeholder key={index}>
          <Placeholder.Item width={DeviceWidth} height={225} marginTop={10} />
          <Placeholder.Item flexDirection="row" marginTop={5}>
            <Placeholder.Item width={40} height={40} borderRadius={20} />
            <Placeholder.Item marginLeft={10}>
              <Placeholder.Item
                width={DeviceWidth * 0.5}
                height={20}
                borderRadius={5}
              />
              <Placeholder.Item
                width={DeviceWidth * 0.8}
                height={15}
                borderRadius={5}
                marginTop={5}
              />
              <Placeholder.Item
                width={DeviceWidth * 0.8}
                height={15}
                borderRadius={5}
                marginTop={5}
              />
            </Placeholder.Item>
          </Placeholder.Item>
        </Placeholder>
      ))}
    </>
  );
};
