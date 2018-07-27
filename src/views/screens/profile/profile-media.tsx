import React from 'react';
import Screen from '../../components/screen';
import ShadowBox from '../../components/theme/shadow-box';
import { MediaGrid } from '../../components/theme/media-grid';
import { TextArea, PrimaryButton } from '../../components/theme';
import { View } from 'react-native';

class ProfileMediaScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Screen horizontalPadding={20}>
        <ShadowBox>
          <MediaGrid
            onNewPicture={() => navigation.navigate('ProfileCamera')}
          />
          <TextArea
            label="About Me"
            placeholder={`Take this time to describe yourself, life experience, hobbies, and anything else that makes you wonderful.`}
          />
          <View style={{ marginTop: 10 }}>
            <PrimaryButton title="DONE" onPress={() => navigation.goBack()} />
          </View>
        </ShadowBox>
      </Screen>
    );
  }
}

export default ProfileMediaScreen;