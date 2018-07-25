import React from 'react';
import { TouchableOpacity, StyleSheet, StyleProp } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from '../../../../assets/styles/theme';
import TouchableOpacityOnPress from '../../../../types/touchable-on-press';

interface IconButtonProps {
  icon: string;
  circle?: boolean;
  primary?: string;
  secondary?: string;
  onPress?: TouchableOpacityOnPress;
}

class IconButton extends React.Component<IconButtonProps> {
  static defaultProps = {
    primary: theme.colors.primary,
    secondary: theme.colors.primaryLight
  };

  render() {
    const { icon, primary, secondary, circle, onPress } = this.props;

    const btnStyle = {
      backgroundColor: secondary,
      borderRadius: circle ? 25 : 3
    };

    return (
      <TouchableOpacity
        style={[styles.btnContainer, btnStyle]}
        onPress={onPress}
      >
        <Icon name={icon} color={primary} size={14} />
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
