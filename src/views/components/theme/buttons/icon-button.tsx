import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../../assets/styles/theme';
import TouchableOpacityOnPress from '../../../../types/touchable-on-press';

interface IconButtonProps {
  disabled?: boolean;
  icon: string;
  circle?: boolean;
  primary?: string;
  secondary?: string;
  onPress?: TouchableOpacityOnPress;
  size: number;
}

class IconButton extends React.Component<IconButtonProps> {
  static defaultProps = {
    primary: theme.colors.primary,
    secondary: theme.colors.primaryLight,
    size: 45,
    disabled: false
  };

  render() {
    const { size, icon, primary, secondary, circle, onPress, disabled } = this.props;

    const btnStyle = {
      backgroundColor: secondary,
      borderRadius: circle ? (size / 2) : 3,
      width: size,
      height: size
    };

    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.btnContainer, btnStyle]}
        onPress={onPress}
      >
        <Icon name={icon} color={primary} size={size * 0.4} />
      </TouchableOpacity>
    );
  }
}

export default IconButton;

const styles = StyleSheet.create({
  btnContainer: {
    width: 50,
    height: 50,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
