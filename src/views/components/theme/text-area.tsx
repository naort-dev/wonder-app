import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Label from './label';
import theme from '../../../assets/styles/theme';

interface Props {
  label?: string;
  placeholder?: string;
  onChangeText?: any
}

export default class TextArea extends React.Component<Props> {
  render() {
    const { label, placeholder, onChangeText, ...rest } = this.props;
    return (
      <View style={styles.container}>
        {label && <Label>{label}</Label>}
        <TextInput
          style={styles.input}
          multiline
          placeholder={placeholder}
          onChangeText={onChangeText}
          numberOfLines={4}
          {...rest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  input: {
    borderRadius: 5,
    fontFamily: theme.fonts.primary,
    borderWidth: 1,
    borderColor: theme.colors.textColor,
    padding: 10
  }
});