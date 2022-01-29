import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

import { PAGES } from '../utils/constants';

import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList, Page } from '../utils/interfaces';

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
          <Text>{page.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        {PAGES.map((page, index) => renderComponent(page, index))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    backgroundColor: 'whitesmoke',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  component: {
    borderColor: '#CAD3D6',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 3,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text: {},
});
