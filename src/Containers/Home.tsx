import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { PAGES } from '../utils/constants';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList, Page } from '../utils/interfaces';

const WIDTH = Dimensions.get('window').width;

type HomeScreenNavigationProps = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeProps {
  navigation: HomeScreenNavigationProps;
}

export default function Home(props: HomeProps) {
  const renderComponent = (page: Page, _index: number) => {
    return (
      <TouchableOpacity
        key={page.componentName}
        onPress={() => props.navigation.navigate(page.componentName)}>
        <View style={styles.component}>
          <page.Icon width={45} height={45} fill="black" />
          <Text>{page.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {PAGES.map((page, index) => renderComponent(page, index))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF6F9',
  },
  scrollContainer: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: WIDTH * 0.05,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  component: {
    borderColor: '#CAD3D6',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: WIDTH * 0.25,
    height: 100,
    alignItems: 'center',
    marginHorizontal: WIDTH * 0.025,
    marginTop: 20,
  },
  text: {},
});
