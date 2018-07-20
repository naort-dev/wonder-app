import _ from 'lodash';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { Text } from '@components/theme';
import Topic from '../../../../types/topic';
import theme from '../../../../assets/styles/theme';
import TouchableOpacityOnPress from '../../../../types/touchable-on-press';

interface Props {
  topic: Topic;
  selected?: boolean;
  onPress?: Function;
}

export default class WonderPickerItem extends React.Component<Props> {
  static defaultProps = {
    selected: false,
    onPress: _.noop
  }

  render() {
    const { topic, selected, onPress } = this.props;
    const renderedStyles = [styles.container];
    selected && renderedStyles.push(styles.selectedContainer);
    return (
      <View style={renderedStyles}>
        <TouchableOpacity style={styles.btn} onPress={() => onPress && onPress(topic)}>
          <Text style={styles.label}>{_.toUpper(topic.name)}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    elevation: 3,
    shadowColor: '#383838',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 5,
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: '#FFF'
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: theme.colors.primaryLight,
    shadowColor: theme.colors.primary,
    shadowOpacity: 0.5,
  },
  btn: {
    borderRadius: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 8
  }
});