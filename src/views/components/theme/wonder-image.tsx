
import React from 'react';
import { ImageProps, Image } from "react-native";
import api, { ApiConfig } from '../../../services/api';
import Omit from '../../../types/omit';

interface Props extends Omit<ImageProps, "source"> {
  uri: string;
}

class WonderImage extends React.Component<Props> {
  render() {
    const { uri, ...rest } = this.props;
    if (uri) {
      return (
        <Image
          source={{ uri: `${ApiConfig.defaults.baseURL.replace('/v1', '/')}${uri}` }}
          {...rest}
        />
      );
    }
    return null;
  }
}

export default WonderImage;
