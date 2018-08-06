import React from 'react';
import { connect } from "react-redux";
import Screen from '../../components/screen';
import { DecoratedAppointment } from '../../../types/appointment';
import { Title } from '../../components/theme';

interface AppointmentViewProps {
  appointment: DecoratedAppointment;
}

class AppointmentViewScreen extends React.Component<AppointmentViewProps> {
  render() {
    return (
      <Screen>
        <Title>Appointment</Title>
      </Screen>
    );
  }
}

export default connect()(AppointmentViewScreen);