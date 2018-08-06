import React from 'react';
import Screen from '../../components/screen';
import { AppointmentList } from '../../components/appointment-list';
import { connect } from 'react-redux';
import WonderAppState from '../../../types/wonder-app-state';
import { Dispatch } from 'redux';
import { getAppointments } from '../../../store/sagas/appointment';
import Appointment, { DecoratedAppointment } from '../../../types/appointment';
import { selectPastAppointments } from '../../../store/selectors/appointment';

const mapState = (state: WonderAppState) => ({
  appointments: selectPastAppointments(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
  onRefreshAppointments: () => dispatch(getAppointments())
});

interface PastAppointmentsProps {
  appointments: DecoratedAppointment[];
  onRefreshAppointments: () => void;
}

class PastAppointmentsScreen extends React.Component<PastAppointmentsProps> {
  componentDidMount() {
    this.props.onRefreshAppointments();
  }
  render() {
    const { appointments, onRefreshAppointments } = this.props;
    return (
      <Screen>
        <AppointmentList
          onRefresh={onRefreshAppointments}
          data={appointments}
        />
      </Screen>
    );
  }
}

export default connect(mapState, mapDispatch)(PastAppointmentsScreen);