import React from 'react';
import Screen from "../../components/screen";
import { StyleSheet, View } from 'react-native';
import { Text, Strong, RoundedTextInput, TextArea, PrimaryButton } from '../../components/theme';
import theme from '../../../assets/styles/theme';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';

interface Props {
  navigation: NavigationScreenProp<any, NavigationParams>;
}

// automatically get name and email from user in redux
class FeedbackScreen extends React.Component<Props> {
  render() {
    const { navigation } = this.props;
    return (
      <Screen>
        <View flex={1} style={styles.container}>
          <Text style={styles.infoText}>
            We want you to have a <Strong style={{ color: theme.colors.primary }}>Wonderful</Strong> experience! We would love to hear your feedback
          </Text>
          <TextArea
            placeholder="Message..."
          />
        </View>
        <PrimaryButton
          rounded={false}
          fullWidth
          title="Submit"
          onPress={() => navigation.goBack()}
        />
      </Screen>
    )
  }
}

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  infoText: {
    fontSize: 18,
    paddingHorizontal: 25,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20
  }
});