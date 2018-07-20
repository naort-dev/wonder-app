import React from 'react';
import { View, StyleSheet, TextInput as Input, TextInputProps } from 'react-native';
import theme from '../../../assets/styles/theme';
import Color from 'color';
import Label from './label';
import Icon from 'react-native-vector-icons/FontAwesome';
import ErrorHint from './text/error-hint';

interface Props extends TextInputProps {
  icon?: string;
  color?: string;
  errorHint?: string;
  label?: string;
  padLeft?: boolean;
}

const palette = Color(theme.colors.backgroundPrimary);
export default class TextInput extends React.Component<Props> {
  renderIcon = () => {
    const { icon, color } = this.props;
    if (icon) {
      return (
        <View style={styles.iconContainer}>
          <Icon name={icon} color={color || palette.darken(0.2).toString()} size={14} />
        </View>
      );
    }
  }

  renderErrorHint = () => {
    const { errorHint } = this.props;
    // if (errorHint) {
    return (<ErrorHint>{errorHint}</ErrorHint>);
    // }
  }

  render() {
    const { label, style, padLeft, ...rest } = this.props;
    return (
      <View style={styles.container}>
        {label && <Label>{label.toUpperCase()}</Label>}
        <View style={styles.inputContainer}>
          {this.renderIcon()}
          {padLeft && <View flex={1} />}
          <Input
            underlineColorAndroid="transparent"
            {...rest}
            style={[styles.input, style]}
          />
        </View>
        {this.renderErrorHint()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  errorHintContainer: {
    borderColor: 'red',
    borderWidth: 2,
  },
  errorHintText: {
    color: 'red',
    fontSize: 9,
    marginLeft: 20
  },
  label: {
    marginBottom: 15
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderBottomColor: Color(theme.colors.textColor).lighten(0.5),
  },
  input: {
    flex: 10,
    fontFamily: theme.fonts.primary,
    color: theme.colors.textColor
  },
  iconContainer: {
    flex: 1,
    paddingHorizontal: 10
  },
});