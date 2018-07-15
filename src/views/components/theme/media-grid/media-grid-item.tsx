import React from 'react';
import { StyleSheet, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  source?: string;
  featured?: boolean;
}

export default class MediaGridItem extends React.Component<Props> {
  static defaultProps = {
    source: undefined,
    featured: false
  }

  render() {
    const { source } = this.props;
    if (!source) {
      return (
        <TouchableOpacity>
          <LinearGradient
            style={styles.container}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['#FFF799', '#FFC3A0']}
          >
            <Icon name="plus" size={16} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity >
      );
    }

    return (
      <View style={styles.container}>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#DDD',
    height: 75,
    width: 75
  }
});