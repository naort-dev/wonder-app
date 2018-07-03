import React from 'react';
import { View, StyleSheet, TextInput as Input, TouchableOpacity } from 'react-native';
import { Text } from './index';
import theme from '../../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from 'color';
import LinearGradient from 'react-native-linear-gradient';


const palette = Color(theme.colors.backgroundPrimary);


export default class RoundedButton extends React.Component<any, any> {
  static defaultProps = {
    iconColor: undefined,
    colors: [],
    start: undefined,
    end: undefined,
    fullWidth: false,
    color: undefined
  }

  renderIcon = () => {
    const { icon, color, iconColor } = this.props;
    if (icon) {
      return (
        <View style={styles.iconContainer}>
          <Icon name={icon} color={iconColor || color || palette.darken(0.2).toString()} size={14} />
        </View>
      );
    }
  }

  render() {
    const {
      style,
      start,
      end,
      color,
      colors,
      title,
      onPress,
      fullWidth,
      icon,
      ...rest
    } = this.props;



    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.btnContainer, { width: fullWidth ? '100%' : 'auto' }]}
      >
        <LinearGradient
          start={start}
          end={end}
          colors={colors}
          style={styles.container}
        >
          {this.renderIcon()}
          <View style={styles.txtContainer}>
            <Text color={color} style={styles.title}>{title}</Text>
          </View>
          {icon && <View flex={1} />}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer: {
    elevation: 1,
    flex: 0,
    backgroundColor: palette.toString(),
    borderRadius: 30,
  },
  container: {
    flex: 0,
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
  },
  txtContainer: {
    flex: 10,
    justifyContent: 'center',
  },
  iconContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    textAlign: 'center'
  }
});