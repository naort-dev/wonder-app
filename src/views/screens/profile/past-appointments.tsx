import React from 'react';
import Screen from '../../components/screen';
import { AppointmentList } from '../../components/appointment-list';
import mockSchedule from '../../../../mocks/appointment-schedule';

class PastAppointmentsScreen extends React.Component {
  render() {
    return (
      <Screen>
        <AppointmentList
          data={mockSchedule}
        />
      </Screen>
    );
  }
}

export default PastAppointmentsScreen;