import React from 'react';
import { View, StyleSheet } from 'react-native';
import Results from './results';
import WorkArea from './workarea';

import { CalculatorButtonType, Operands, Operation } from '../utils';

const Container = () => {
  const [input, setInput] = React.useState<string | null>(null);
  const [freezeDel, setfreezeDel] = React.useState(false);
  const [operand, setOperand] = React.useState<Operands | null>(null);
  const [operant, setOperant] = React.useState<string | null>(null);
  const [total, setTotal] = React.useState<string | null>(null);

  const handleItemPress = (item: CalculatorButtonType) => {
    switch (true) {
      case !input && item.mode === 'numeric':
        // base: no input in state
        setInput((item.value as number).toString());
        break;
      case input && item.mode === 'numeric':
        // case: input in state
        if (operand) {
          // freeze deletion
          setfreezeDel(true);

          if (!operant) {
            setOperant((item.value as number).toString());
          } else {
            let tempOperant = (operant as string).concat(
              (item.value as number).toString(),
            );

            setOperant(tempOperant);
          }
        } else {
          let tempInput = (input as string)?.concat(
            (item.value as number).toString(),
          );
          // subcase: convert to int and back to string
          // to get rid of leading zeroes
          setInput(Number(tempInput).toString());
        }
        break;
      case item.mode === 'misc' && item.function === 'clear':
        // case: clear
        setInput(null);
        // unfreeze deletion
        setfreezeDel(false);
        // clear operands
        setOperand(null);
        setOperant(null);
        setTotal(null);
        break;
      case item.mode === 'misc' && item.function === 'delete':
        // case; delete

        if (!freezeDel) {
          let slicedStrInputForDel = input?.slice(0, input.length - 1);
          if (!slicedStrInputForDel?.length) {
            setOperand(null);
          }
          setInput(slicedStrInputForDel as string);
        } else if (operant) {
          // if operant exist, it'll be what is shown on screen for deleting
          let slicedOperantForDel = operant.slice(0, operant.length - 1);
          setOperant(slicedOperantForDel);
        }
        break;
      case item.mode === 'misc' && item.function === 'decimal':
        // case: decimal
        if (operand) {
          // subcase: handle when operand exists
          if (!operant) {
            let decimal = '0'?.concat(item.value as string);
            setOperant(decimal);
          }
        } else if (!input) {
          // subcase: no input, concat zero to decimal
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

      case item.mode === 'misc' && item.function === 'unary-plus-minus':
        // case: unary +/-
        // subcase: apply on operant
        if (operand) {
          const numOperantForUnary = Number(operant);
          if (!operant) {
            setOperant('-');
          } else if (input === '-') {
            setOperant(null);
          } else if (numOperantForUnary > 0) {
            setOperant('-'.concat(numOperantForUnary.toString()));
          } else {
            setOperant(Math.abs(numOperantForUnary).toString());
          }
        } else {
          // subcase: apply on input
          const numInputForUnary = Number(input);
          if (!input) {
            setInput('-');
          } else if (input === '-') {
            setInput(null);
          } else if (numInputForUnary > 0) {
            setInput('-'.concat(numInputForUnary.toString()));
          } else {
            setInput(Math.abs(numInputForUnary).toString());
          }
        }
        break;

      case item.mode === 'operand' && item.function !== 'equal':
        if (!input) {
          // do nothing
        } else {
          if (operant) {
            if (operand === 'add') {
              const result = Number(input) + Number(operant);
              // clear operant
              setOperant(null);
              // set result as input
              setInput(result.toString());
              // set new operand
              setOperand((item as Operation).function);
            } else if (operand === 'subtract') {
              const result = Number(input) - Number(operant);
              setOperant(null);
              // set result as input
              setInput(result.toString());
              // set new operand
              setOperand((item as Operation).function);
            } else if (operand === 'multiply') {
              const result = Number(input) * Number(operant);
              setOperant(null);
              // set result as input
              setInput(result.toString());
              // set new operand
              setOperand((item as Operation).function);
            } else if (operand === 'divide') {
              const result = Number(input) / Number(operant);
              setOperant(null);
              // set result as input
              setInput(result.toString());
              // set new operand
              setOperand((item as Operation).function);
            }
          } else {
            setOperand((item as Operation).function);
          }
        }
        break;
      case item.mode === 'operand' && item.function === 'equal':
        if (input && operand && operant) {
          if (operand === 'add') {
            setTotal((Number(input) + Number(operant)).toString());
          } else if (operand === 'subtract') {
            setTotal((Number(input) - Number(operant)).toString());
          } else if (operand === 'multiply') {
            setTotal((Number(input) * Number(operant)).toString());
          } else if (operand === 'divide') {
            setTotal((Number(input) / Number(operant)).toString());
          }
          setInput(null);
          setOperand(null);
          setOperant(null);
        } else {
          // do nothing
        }
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Results
        value={
          typeof total === 'string'
            ? total
            : operand && operant
            ? operant
            : input
        }
      />
      <WorkArea
        handleItemPress={handleItemPress}
        resultActive={Boolean(input && operand && operant)}
        selectedOperand={operand}
        input={input}
        total={total}
        invalidDel={Boolean(input && operand && !operant)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Container;
