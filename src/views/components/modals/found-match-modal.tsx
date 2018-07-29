import Color from 'color';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, ModalProps, Modal, View } from 'react-native';
import Proposal from '../../../types/proposal';
import theme from '../../../assets/styles/theme';
import { Text, PrimaryButton, OutlineButton } from '../theme';

function lighten(color: string, value: number) {
  return Color(color).fade(value).toString();
}

interface FoundMatchModalProps extends ModalProps {
  proposal: Proposal;
}

const gradient = [lighten(theme.colors.primaryLight, 0.1), lighten(theme.colors.primary, 0.1)];
class FoundMatchModal extends React.Component<FoundMatchModalProps> {
  static defaultProps = {
    visible: false
  };

  renderModalContent = () => {
    const { proposal } = this.props;

    if (proposal && proposal.candidate) {
      return (
        <LinearGradient
          style={styles.container}
          colors={gradient}
        >
          <View flex={3}>
            <Text style={[styles.txt]}>{proposal.candidate.first_name} thinks</Text>
            <Text style={[styles.txt]}>YOU'RE WONDERFUL</Text>
            <Text style={[styles.txt]}>Tell {proposal.candidate.first_name} you think she is wonderful too!</Text>
          </View>
          <View flex={1}>
            <PrimaryButton
              title="Send Message"
              onPress={() => { }}
            />
            <View style={styles.spacer} />
            <OutlineButton
              title="Keep Wonderin"
              onPress={() => { }}
            />
          </View>
        </LinearGradient>
      );
    }
    return null;
  }
  render() {
    const { visible } = this.props;
    return (
      <Modal
        visible={visible}
        animationType="fade"
        transparent
        {...this.props}
      >
        <Text style={{ paddingTop: 20 }}>{visible && visible.toString() || 'None'}</Text>
        {this.renderModalContent()}
      </Modal>
    );
  }
}

export default FoundMatchModal;

const styles = StyleSheet.create({
  spacer: { height: 10 },
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    flex: 1
  },
  txt: {
    color: '#FFF'
  }
});