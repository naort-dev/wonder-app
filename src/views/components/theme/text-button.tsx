import React from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import { Text } from './index';

interface Props {
  text: string,
  color?: string,
  onPress?: any,
  style?: any
}

export default class TextButton extends React.Component<Props> {
  render() {
    const { text, onPress, style } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={[styles.txt, style]}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  txt: {

  }
});