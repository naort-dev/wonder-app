import React from 'react';
import { View, StyleSheet, TextInput as Input } from 'react-native';
import { Text } from './index';
import theme from '../../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from 'color';
import LinearGradient from 'react-native-linear-gradient';


const palette = Color(theme.colors.backgroundPrimary);

interface PasswordProps {
  secureTextEntry?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | undefined
  autoCorrect?: boolean
}

export default class RoundedTextInput extends React.Component<any, any> {

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
    const {
      type,
      label,
      style,
      start,
      end,
      color,
      colors,
      ...rest
    } = this.props;

    const passwordProps: PasswordProps = {};
    if (type === 'password') {
      passwordProps.secureTextEntry = true;
      passwordProps.autoCapitalize = 'none';
      passwordProps.autoCorrect = false;
    }

    const input = (
      <Input
        placeholderTextColor={color}
        secureTextEntry={passwordProps.secureTextEntry}
        autoCapitalize={passwordProps.autoCapitalize}
        autoCorrect={passwordProps.autoCorrect}
        style={[styles.input, style]}
        {...rest}
      />
    );

    if (colors) {
      return (
        <LinearGradient
          start={start}
          end={end}
          colors={colors}
          style={styles.container}
        >
          {this.renderIcon()}
          {input}
        </LinearGradient>
      );
    }

    return (
      <View style={styles.container}>
        {this.renderIcon()}
        {input}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 10
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    padding: 15,
    width: '100%',
    backgroundColor: palette.toString()
  },
  iconContainer: {
    paddingHorizontal: 10
  },
  input: {
    color: palette.darken(0.2).toString()
  }
});