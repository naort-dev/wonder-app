import React from 'react';
import { View, StyleSheet, TextInput as Input } from 'react-native';
import theme from '../../../assets/styles/theme';
import Color from 'color';
import Label from './label';
import Icon from 'react-native-vector-icons/FontAwesome';


const palette = Color(theme.colors.backgroundPrimary);
export default class TextInput extends React.Component<any, any> {
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
  render() {
    const { label, style, padLeft, ...rest } = this.props;
    return (
      <View style={styles.container}>
        {label && <Label>{label.toUpperCase()}</Label>}
        <View style={styles.inputContainer}>
          {this.renderIcon()}
          {padLeft && <View flex={1} />}
          <Input
            {...rest}
            style={[styles.input, style]}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 15
  },
  container: {
    width: '100%',
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