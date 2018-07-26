
import React from 'react';
import { ImageProps, Image } from "react-native";
import api, {ApiConfig} from '../../../services/api';
import Omit from '../../../types/omit';

interface Props extends Omit<ImageProps, "source"> {
  uri: string;
}

class WonderImage extends React.Component<Props> {
  static defaultProps = {
    host: ''
  };

  render() {
    const { uri, ...rest } = this.props;
    return (
      <Image
        source={{ uri: `${ApiConfig.defaults.baseURL}${uri}` }}
        {...rest}
      />
    );
  }
}

export default WonderImage;
