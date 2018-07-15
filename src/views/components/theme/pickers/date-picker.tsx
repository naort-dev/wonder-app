import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Label } from '..';
import moment from 'moment-timezone';
import { Container, Header, Content, DatePicker as NativeDatePicker, Text } from 'native-base';
import theme from '../../../../assets/styles/theme';
import Color from 'color';

interface Props {
  label?: string;
  onChange: any;
  placeholder?: string;
}

export default class DatePicker extends React.Component<Props> {
  onChange = (newDate: Date) => {
    const { onChange } = this.props;
    onChange(newDate);
  }

  render() {
    const { label, onChange, placeholder } = this.props;
    return (
      <View style={styles.container}>
        {label && <Label>{label}</Label>}
        <NativeDatePicker
          defaultDate={new Date(2018, 4, 4)}
          minimumDate={new Date(2018, 1, 1)}
          maximumDate={new Date(2018, 12, 31)}
          locale="en"
          // timeZoneOffsetInMinutes={undefined}
          // modalTransparent={false}
          animationType="fade"
          androidMode="default"
          placeHolderText={placeholder || ' '}
          textStyle={styles.text}
          placeHolderTextStyle={styles.text}
          onDateChange={this.onChange}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: Color(theme.colors.textColor).lighten(0.5),
  },
  text: {
    color: theme.colors.textColor,
    fontFamily: theme.fonts.primary
  }
})