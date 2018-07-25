import React from 'react';
import { ImageProps, Image } from "react-native";

import api from '../../services/api';

interface Props extends ImageProps {
  host: string;
  uri: string;
}

class WonderImage extends React.Component<Props> {
  static defaultProps = {
    host: ''
  };

  render() {
    const { host, uri, ...rest } = this.props;
    return (
      <Image
        source={{ uri: `${api.defaults.baseURL}${uri}` }}
        {...rest}
      />
    );
  }
}

export default WonderImage;
