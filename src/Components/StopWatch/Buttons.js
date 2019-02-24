import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity
} from 'react-native';

export class ResetButton extends Component {
  render () {
    return
  }
}

class Button extends Component {
  static defaultProps = {
    color: '#F4F4F4',
    textColor: 'blue',
    highlightColor: 'whitesmoke',
    highlightTextColor: 'red',
    inactiveTextColor: 'gray',
    style: {
      container: {
        marginVertical: 10,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 33,
        height: 65,
        width: 65,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center'
      },
      text: {}
    }
  }

  state = {
    color: this.props.color,
    textColor: this.props.textColor
  }

  componentDidMount() {
    this.setState({
      color: this.props.color,
      textColor: this.props.textColor
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.color !== this.props.color) {
      this.setState(state => ({
        ...state,
        color: this.props.color
      }))
    }
  }

  handlePress = () => {
    this.triggerhighlight();
    this.props.onPress()
  }

  triggerhighlight = () => {
    this.setState((state, props) => ({
      color: props.highlightColor,
      textColor: props.highlightTextColor
    }))
    setTimeout(this.restoreColor, 500)
  }

  restoreColor = () => {
    this.setState((state, props) => ({
      color: props.color,
      textColor: props.textColor
    }))
  }

  render() {
    const { text, disable, inactiveTextColor, style, inactiveColor } = this.props
    const { color, textColor } = this.state;
    let button = (
      <View style={
        [
          style.container, 
          { 
            backgroundColor: inactiveColor && disable ? inactiveColor : color 
          }
        ]
      }>
        <Text style={[style.text, { color: disable ? inactiveTextColor : textColor }]}>{text}</Text>
      </View>
    )

    if (disable) {
      return button;
    }

    return (
      <TouchableOpacity onPress={this.handlePress}>
        {button}
      </TouchableOpacity>
    );
  }
}

export default Button;
