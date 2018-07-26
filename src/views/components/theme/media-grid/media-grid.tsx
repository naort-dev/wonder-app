import React from 'react';
import { StyleSheet, View, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import theme from '../../../../assets/styles/theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import MediaGridItem from './media-grid-item';
import TouchableOpacityOnPress from '../../../../types/touchable-on-press';

interface Props {
  featured?: ImageSourcePropType;
  items?: any;
  images?: ImageSourcePropType[];
  onNewPicture?: TouchableOpacityOnPress;
}

export default class MediaGrid extends React.Component<Props> {
  static defaultProps = {

  }

  renderFeatured = () => {
    const { featured, onNewPicture } = this.props;

    if (featured) {
      return (
        <View style={styles.featuredContainer}>
          <Image source={featured} />
        </View>
      );
    }

    return (
      <LinearGradient
        start={{ x: 0, y: 0 }}
        style={styles.featuredContainer}
        colors={[theme.colors.primary, theme.colors.primaryLight]}
      >
        <TouchableOpacity onPress={onNewPicture}>
          <Icon name="plus" size={16} color="#FFF" />
        </TouchableOpacity>
      </LinearGradient>
    );
  }

  render() {
    const { featured } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {this.renderFeatured()}
          <View style={styles.column}>
            <MediaGridItem />
            <MediaGridItem />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <MediaGridItem />
          </View>
          <View style={styles.column}>
            <MediaGridItem />
          </View>
          <View style={styles.column}>
            <MediaGridItem />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 4
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container: {

  },
  featuredContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 154,
    height: 154
  },

});