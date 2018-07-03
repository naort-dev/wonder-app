import React from 'react';
import { View, StyleSheet, TextInput as Input } from 'react-native';
import { Text } from './index';
import theme from '../../../assets/styles/theme';


export default class TextInput extends React.Component<any, any> {
  render() {
    const { label, style } = this.props;
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label.toUpperCase()}</Text>}
        <Input
          {...this.props}
          style={[styles.input, style]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 10
  },
  container: {
    width: '100%',
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.textColor,
  },
  input: {
    color: theme.colors.textColor
  }
});