import React from "react";
import { connect } from "react-redux";
import Screen from "../../components/screen";
import { Text, Strong } from "../../components/theme";
import { Dispatch } from "redux";
import { Calendar } from "react-native-calendars";
import moment from "moment-timezone";
import CalendarDate, { DATE_STRING_FORMAT } from "../../../types/calendar-date";
import theme from "../../../assets/styles/theme";
import { View, StyleSheet } from "react-native";
import WonderAppState from "../../../types/wonder-app-state";
import {
  AppointmentState,
  persistAppointmentData
} from "../../../store/reducers/appointment";

const mapState = (state: WonderAppState) => ({
  appointment: state.appointment
});

const mapDispatch = (dispatch: Dispatch) => ({
  onUpdateAppointment: (data: AppointmentState) =>
    dispatch(persistAppointmentData(data))
});

interface AppointmentInviteProps {
  appointment: AppointmentState;
}

interface State {
  selected: CalendarDate;
}

// markedDates={{
//   '2012-05-16': {selected: true, marked: true, selectedColor: 'blue'},
//   '2012-05-17': {marked: true},
//   '2012-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
//   '2012-05-19': {disabled: true, disableTouchEvent: true}
// }}
class AppointmentInviteScreen extends React.Component<
  AppointmentInviteProps,
  State
  > {
  static navigationOptions = ({ navigation }) => ({
    title: "Invite to Wonder"
  })

  private init = (): CalendarDate => {
    const now = moment();
    return {
      day: now.date(),
      month: now.month() + 1,
      year: now.year(),
      timestamp: now.utc().valueOf(),
      dateString: now.format(DATE_STRING_FORMAT)
    };
  }

  state: State = {
    selected: this.init()
  };

  today = () => moment().startOf("day");

  onDateChange = (date: any) => {
    const selected: CalendarDate = date as CalendarDate;
    // alert(JSON.stringify(selected));
    this.setState({ selected });
  }

  getMarkedDates = () => ({
    [this.state.selected.dateString]: {
      selected: true,
      selectedDotColor: theme.colors.primaryLight
    }
  })

  renderTitle = () => {
    const { activity } = this.props.appointment;
    if (activity) {
      return (
        <View style={styles.header}>
          <Text style={{ textAlign: 'center' }}>
            Please select a date for your trip to <Strong>{activity.name}</Strong>
          </Text>
        </View>
      );
    }
  }

  render() {
    const { selected } = this.state;
    return (
      <Screen>
        {this.renderTitle()}
        <Calendar
          current={selected.dateString}
          minDate={this.today().format(DATE_STRING_FORMAT)}
          maxDate={this.today()
            .add(1, "month")
            .format(DATE_STRING_FORMAT)}
          onDayPress={this.onDateChange}
          onDayLongPress={day => {
            console.log("selected day", day);
          }}
          monthFormat="MMMM '('yyyy')'" // http://arshaw.com/xdate/#Formatting
          // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
          firstDay={1}
          // Hide day names. Default = false
          hideDayNames={true}
          // Show week numbers to the left. Default = false
          showWeekNumbers={true}
          // Handler which gets executed when press arrow icon left. It receive a callback can go back month
          // onPressArrowLeft={substractMonth => substractMonth()}
          // Handler which gets executed when press arrow icon left. It receive a callback can go next month
          // onPressArrowRight={addMonth => addMonth()}
          markedDates={this.getMarkedDates()}
        />
      </Screen>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(AppointmentInviteScreen);

const styles = StyleSheet.create({
  header: {
    padding: 20
  }
});
