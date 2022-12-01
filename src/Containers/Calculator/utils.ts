import { Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const dimension = deviceWidth * deviceHeight;
export const size = dimension * 0.00025;

export type CalculatorButtonType =
  | {
      mode: 'numeric';
      value: number;
      size: number;
      color: string;
      background: string;
    }
  | {
      mode: 'operand';
      value: '÷' | 'x' | '-' | '+' | '=';
      function: 'divide' | 'multiply' | 'subtract' | 'add' | 'equal';
      size: number;
      color: string;
      background: string;
    }
  | {
      mode: 'misc';
      value: string;
      function: string;
      size: number;
      color: string;
      background: string;
    };

export const buttons: CalculatorButtonType[] = [
  {
    mode: 'misc',
    value: 'AC',
    function: 'clear',
    background: '#CAC9C9',
    color: '#000',
    size: size / 3,
  },
  {
    mode: 'misc',
    value: '±',
    function: 'unary-plus-minus',
    background: '#CAC9C9',
    color: '#000',
    size: size / 2.5,
  },
  {
    mode: 'misc',
    value: '%',
    function: 'percentage',
    background: '#CAC9C9',
    color: '#000',
    size: size / 3,
  },
  {
    mode: 'operand',
    value: '÷',
    function: 'divide',
    background: '#E8A43A',
    color: '#fff',
    size: size / 2,
  },

  {
    mode: 'numeric',
    value: 7,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'numeric',
    value: 8,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'numeric',
    value: 9,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'operand',
    value: 'x',
    function: 'multiply',
    background: '#E8A43A',
    color: '#fff',
    size: size / 2.3,
  },

  {
    mode: 'numeric',
    value: 4,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'numeric',
    value: 5,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'numeric',
    value: 6,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'operand',
    value: '-',
    function: 'subtract',
    background: '#E8A43A',
    color: '#fff',
    size: size / 2,
  },

  {
    mode: 'numeric',
    value: 1,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'numeric',
    value: 2,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'numeric',
    value: 3,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'operand',
    value: '+',
    function: 'add',
    background: '#E8A43A',
    color: '#fff',
    size: size / 2,
  },

  {
    mode: 'numeric',
    value: 0,
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'misc',
    value: 'del',
    function: 'delete',
    background: '#2B2B2B',
    color: '#fff',
    size: size / 3,
  },
  {
    mode: 'misc',
    value: '.',
    function: 'decimal',
    background: '#2B2B2B',
    color: '#fff',
    size: size / 2,
  },
  {
    mode: 'operand',
    value: '=',
    function: 'equal',
    background: '#E8A43A',
    color: '#fff',
    size: size / 2,
  },
];
