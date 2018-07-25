import React from 'react';
import { Modal, View, ModalProps, StyleSheet, ScrollView, Platform } from 'react-native';
import theme from '../../../assets/styles/theme';
import { IconButton, Text, Title, Label } from '../theme';
import TouchableOpacityOnPress from '../../../types/touchable-on-press';
import Candidate from '../../../types/candidate';
import moment from 'moment-timezone';

interface Props extends ModalProps {
  candidate?: Candidate | null;
  onCancel?: TouchableOpacityOnPress;
  onSuccess?: Function;
}

class ProfileModal extends React.Component<Props> {

  renderContent = () => {
    const { candidate } = this.props;
    if (candidate) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.textContainer}>
            <Text>{JSON.stringify(candidate.topics, null, 2)}</Text>
            <Text>{JSON.stringify(candidate, null, 2)}</Text>
            <Title>{[candidate.first_name, moment().diff(candidate.birthdate, 'years')].join(', ')}</Title>
            <Label>Education</Label>
            <Text>{candidate.school}</Text>

            <Label>Occupation</Label>
            <Text>{candidate.occupation}</Text>

            <Label>About</Label>
            <Text>{candidate.about}</Text>
          </View>
        </ScrollView>
      );
    }

    return null;
  }

  render() {
    const { candidate, onCancel, onSuccess, onRequestClose, ...rest } = this.props;
    return (
      <Modal
        onRequestClose={onRequestClose}
        {...rest}
      >
        <View flex={1}>
          <View style={styles.header}>
            <IconButton circle size={44} icon="times" onPress={onCancel} />
          </View>
          {this.renderContent()}
        </View>
      </Modal>
    );
  }
}

export default ProfileModal;

const styles = StyleSheet.create({
  header: {
    marginTop: Platform.select({ ios: 20, android: 0 }),
    height: 44,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#DDD'
  },
  textContainer: {
    padding: 20
  },
  footer: {
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
