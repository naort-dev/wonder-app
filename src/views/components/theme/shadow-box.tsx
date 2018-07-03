import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from "react-native";

interface Props {

}

export default class ShadowBox extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#FFF',
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowColor: 'black',
    shadowOpacity: 0.4,
  }
});