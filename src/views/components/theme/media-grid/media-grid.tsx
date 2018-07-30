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
  gutter: number;
  width: number;
}


export default class MediaGrid extends React.Component<Props> {
  static defaultProps = {
    gutter: 5,
    width: 200,
  };

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

  calcGridSpace = (span: number) => {
    const { gutter, width } = this.props;
    const base = ((width / 3) - (2 * gutter)) * span;

    let result = base;
    if (span > 1) {
      result += (span * gutter);
    }

    return result;
  }

  render() {
    const { featured, gutter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={[styles.column]}>
            <MediaGridItem
              featured
              size={this.calcGridSpace(2)}
              gutter={gutter}
            />
          </View>
          <View style={[styles.column]}>
            <MediaGridItem
              size={this.calcGridSpace(1)}
              gutter={gutter}
            />
            <MediaGridItem
              size={this.calcGridSpace(1)}
              gutter={gutter}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <MediaGridItem
              size={this.calcGridSpace(1)}
              gutter={gutter}
            />
          </View>
          <View style={styles.column}>
            <MediaGridItem
              size={this.calcGridSpace(1)}
              gutter={gutter}
            />
          </View>
          <View style={styles.column}>
            <MediaGridItem
              video
              size={this.calcGridSpace(1)}
              gutter={gutter}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    flexDirection: 'column',
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