import React from 'react';
import { Modal, View, ModalProps, StyleSheet } from 'react-native';
import { Text, PrimaryButton } from '../theme';
import ActivityDetails from '../../../types/activity-details';
import TouchableOpacityOnPress from '../../../types/touchable-on-press';

interface ActivityDetailsModalProps extends ModalProps {
  details: ActivityDetails | null;
  onCancel: Function;
  onConfirm: TouchableOpacityOnPress;
}

class ActivityDetailsModal extends React.Component<ActivityDetailsModalProps> {
  render() {
    const { onConfirm, details, ...rest } = this.props;
    return (
      <Modal
        animationType="slide"
        visible={!!details}
        transparent
        {...rest}
      >
        <View style={styles.container}>
          <Text>{JSON.stringify(details)}</Text>
          <PrimaryButton title="Invite" onPress={onConfirm} />
        </View>
      </Modal>
    );
  }
}

export default ActivityDetailsModal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    padding: 20,
    flex: 1,
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.4,
    elevation: 5
  }
});
