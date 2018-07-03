import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientPoint from '../../../types/GradientPoint';

interface Props {
  children?: any,
  backgroundImage?: any,
  backgroundGradient?: string[],
  gradientStart?: GradientPoint,
  gradientEnd?: GradientPoint,
  style?: any
}

class Screen extends React.Component<Props> {
  render() {
    const { children, backgroundImage, backgroundGradient, gradientEnd, gradientStart, style } = this.props;
    if (backgroundImage) {
      return (
        <ImageBackground
          source={backgroundImage}
          style={[styles.container, style]}
        >
          {children}
        </ImageBackground>
      );
    } else if (backgroundGradient) {
      return (
        <LinearGradient
          colors={backgroundGradient}
          start={gradientStart}
          end={gradientEnd}
        >
          {children}
        </LinearGradient>
      )
    }

    return (
      <View>
        {children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Screen;