import React from 'react';
import ReactNative from 'react-native';
import Theme from '../../../assets/styles/theme';

export default class Text extends React.Component<any, any> {
  static defaultProps = {
    style: {},
    color: Theme.colors.textColor,
  }

  render() {
    const {
      children,
      style,
      color,
      ...rest
    } = this.props;

    return (
      <ReactNative.Text
        {...rest}
        style={[styles.text, { color }, style]}
      >
        {children}
      </ReactNative.Text>
    );
  }
}

const styles = ReactNative.StyleSheet.create({
  text: {
    color: Theme.colors.textColor,
    fontFamily: 'Poppins'
  }
})