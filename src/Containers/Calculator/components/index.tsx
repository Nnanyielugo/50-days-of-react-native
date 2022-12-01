import React from 'react';
import { View, StyleSheet } from 'react-native';
import Results from './results';
import WorkArea from './workarea';

import { CalculatorButtonType } from '../utils';

const Container = () => {
  const [input, setInput] = React.useState<string | null>(null);
  const [freezeDel, setfreezeDel] = React.useState(false);

  const handleItemPress = (item: CalculatorButtonType) => {
    switch (true) {
      case !input && item.mode === 'numeric':
        // base: no input in state
        setInput((item.value as number).toString());
        break;
      case input && item.mode === 'numeric':
        // case: input in state
        let tempInput = (input as string)?.concat(
          (item.value as number).toString(),
        );
        // subcase: convert to int and back to string
        // to get rid of leading zeroes
        setInput(Number(tempInput).toString());
        break;
      case item.mode === 'misc' && item.function === 'clear':
        // case: clear
        setInput(null);
        // unfreeze deletion
        setfreezeDel(false);
        break;
      case item.mode === 'misc' && item.function === 'delete':
        // case; delete
        if (freezeDel) {
          // deleting is frozen, do nothing
        } else {
          let slicedStrInputForDel = input?.slice(0, input.length - 1);
          setInput(slicedStrInputForDel as string);
        }
        break;
      case item.mode === 'misc' && item.function === 'decimal':
        // case: decimal
        // subcase: no input, concat zero to decimal
        if (!input) {
          let decimal = '0'?.concat(item.value as string);
          setInput(decimal);
        } else {
          if (input.includes('.')) {
            // subcase: already decimal, do nothing
          } else {
            let decimal = (input as string)?.concat(item.value as string);
            setInput(decimal);
          }
        }
        break;
      case item.mode === 'misc' && item.function === 'percentage':
        // case: percentage shortcut
        let tempNumForPercentage = Number(input as string);
        let tempPercentage = tempNumForPercentage / 100;

        // subcase: handle extra digits
        if (tempPercentage.toString().length > 4) {
          setInput(tempPercentage.toFixed(4).toString());
        } else {
          setInput(tempPercentage.toString());
        }

        // freeze deletion
        setfreezeDel(true);
        break;
    }
    // base func: type a number
    // if (item.mode === 'numeric') {
    //   if (!numericInput) {
    //     setInput(item.value);
    //   } else {
    //   }
    // }
    // if (item.mode === 'misc' && item.function === 'decimal') {
    //   // let strInput = item.value.concat(numericInput.toString());
    //   // setInput(+strInput);
    // }
  };
  return (
    <View style={styles.container}>
      <Results value={input} />
      <WorkArea handleItemPress={handleItemPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#2c3e50',
  },
});

export default Container;
