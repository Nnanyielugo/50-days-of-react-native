import React from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';

import HistoryItem from './Item';

import type { FunctionComponent } from 'react';
import type { History } from '../../index';

interface ComponentProps {
  history: History[];
  jumpTo: (step: number) => void;
}

const HistoryContainer: FunctionComponent<ComponentProps> = ({
  history,
  jumpTo,
}) => {
  const [iconOpen, toggleIconOpen] = React.useState(false);
  const [iconIndex, setIconIndex] = React.useState(0);

  const handleSetIconIndex = (index: number) => {
    setIconIndex(index);
  };
  const handleToggleIconOpen = (toggleAction: boolean) => {
    toggleIconOpen(toggleAction);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Moves:</Text>
      {history.slice(0, history.length - 1).map((item, index) => (
        <HistoryItem
          iconOpen={iconOpen}
          iconIndex={iconIndex}
          historyItem={item}
          historyNumber={index}
          key={`history-${index}`}
          setIconIndex={handleSetIconIndex}
          toggleIconOpen={handleToggleIconOpen}
          jumpTo={jumpTo}
          history={history}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#505458',
    alignItems: 'flex-start',
    width: 300,
    borderRadius: 5,
    paddingLeft: 10,
    marginTop: 20,
    paddingBottom: 20,
  },
  header: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
    marginVertical: 10,
  },
});

export default HistoryContainer;
