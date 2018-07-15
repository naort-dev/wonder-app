import React from 'react';
import { Switch } from 'react-native';
import theme from '../../../assets/styles/theme';
import SwitchValueChange from '../../../types/switch-value-change';

interface Props {
  disabled?: boolean;
  canValueChange?: Function;
  onValueChange?: SwitchValueChange;
  value?: boolean;
  initialValue?: boolean;
}

class Toggle extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.initialValue || false
    };
  }

  onChangeValue = (value: boolean) => {
    const { canValueChange, onValueChange } = this.props;
    if (!canValueChange || (canValueChange && canValueChange(value))) {
      this.setState({ value });
      onValueChange && onValueChange(value);
    }
  };

  render() {
    const { disabled, onValueChange } = this.props;
    const { value } = this.state;
    return (
      <Switch
        disabled={disabled}
        thumbTintColor={theme.colors.primaryLight}
        tintColor={theme.colors.primaryLight}
        onTintColor={theme.colors.primary}
        onValueChange={this.onChangeValue}
        value={value}
      />
    )
  }
}

export default Toggle;