import React from 'react';
import { View, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Text } from '.';
import TouchableOpacityOnPress from '../../../types/touchable-on-press';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  title: string,
  onPress: TouchableOpacityOnPress,
  style?: StyleProp<ViewStyle>,
  fullWidth?: boolean
}

export default class ElevatedButton extends React.Component<Props> {
  render() {
    const { onPress, title, style, fullWidth } = this.props;
    return (
      <View style={[styles.viewContainer, { width: fullWidth ? '100%' : 'auto' }]}>
        <TouchableOpacity onPress={onPress}>
          <LinearGradient colors={['#FEFEFE', '#FFF']} style={[styles.container, style]}>
            <Text style={styles.txt}>
              {title}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    borderRadius: 3
  },
  container: {
    borderRadius: 3,
    width: 'auto',
    padding: 10,
    elevation: 1,
    shadowRadius: 5,
    shadowColor: '#DDD',
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 5
    }
  },
  txt: {
    fontSize: 11,
    textAlign: 'center'
  }
});