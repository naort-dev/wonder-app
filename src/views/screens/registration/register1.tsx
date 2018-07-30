import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { RoundedTextInput, PrimaryButton } from "../../components/theme";
import Screen from "../../components/screen";
import { Logo } from "../../../assets/images";
import { NavigationScreenProp, NavigationParams } from "react-navigation";
import validator from "validator";
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import WonderAppState from "../../../types/wonder-app-state";
import { persistRegistrationInfo, resetRegistration } from "../../../store/reducers/registration";

interface Props {
  onSave: Function;
  onReset: Function;
  navigation: NavigationScreenProp<any, NavigationParams>;
}

interface State {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  errors: StateErrors;
}

interface StateErrors {
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

const mapState = (state: WonderAppState) => ({

});

const mapDispatch = (dispatch: Dispatch) => ({
  onSave: (data: State) => dispatch(persistRegistrationInfo(data)),
  onReset: () => dispatch(resetRegistration())
});

class Register1 extends React.Component<Props, State> {

  public state: State = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    errors: {}
  };

  componentWillMount() {
    this.props.onReset();
  }

  public render() {
    const { errors } = this.state;
    return (
      <Screen>
        <View style={styles.header}>
          <Image style={{ width: "80%" }} source={Logo.DARK} resizeMode="contain" />
        </View>
        <View style={styles.body}>
          <View style={{ width: "100%" }}>
            <RoundedTextInput
              onValidate={(text: string) => text && !validator.isEmpty(text)}
              autoCorrect={false}
              autoCapitalize="words"
              errorHint={errors.first_name}
              icon="user"
              placeholder="First Name"
              onChangeText={this.onChangeText("first_name")}
              fullWidth
              maxLength={50}
            />
          </View>
          <View style={{ marginTop: 10, width: "100%" }}>
            <RoundedTextInput
              onValidate={(text: string) => text && !validator.isEmpty(text)}
              autoCorrect={false}
              autoCapitalize="words"
              errorHint={errors.last_name}
              icon="user"
              placeholder="Last Name"
              onChangeText={this.onChangeText("last_name")}
              fullWidth
              maxLength={50}
            />
          </View>
          <View style={{ marginTop: 10, width: "100%" }}>
            <RoundedTextInput
              onValidate={(text: string) => text && validator.isEmail(text)}
              autoCapitalize="none"
              autoCorrect={false}
              errorHint={errors.email}
              icon="envelope-o"
              placeholder="Email"
              onChangeText={this.onChangeText("email")}
              fullWidth
              maxLength={50}
            />
          </View>
          <View style={{ marginTop: 10, width: "100%" }}>
            <RoundedTextInput
              onValidate={(text: string) => text && validator.isMobilePhone(text, "en-US")}
              keyboardType="phone-pad"
              autoCapitalize="none"
              autoCorrect={false}
              errorHint={errors.phone}
              icon="phone"
              placeholder="Mobile Number"
              onChangeText={this.onChangeText("phone")}
              fullWidth
              maxLength={10}
            />
          </View>
          <View style={{ marginTop: 10, width: "100%" }}>
            <RoundedTextInput
              onValidate={(text: string) => text && text.length > 5}
              autoCapitalize="none"
              autoCorrect={false}
              errorHint={errors.password}
              icon="lock"
              placeholder="Password"
              onChangeText={this.onChangeText("password")}
              fullWidth
            />
          </View>
          <View style={{ paddingVertical: 10, width: "50%" }}>
            <PrimaryButton
              title="Next"
              onPress={this.validate}
            />
          </View>
        </View>
      </Screen>
    );
  }

  private validate = () => {
    const errors: StateErrors = {};
    const { navigation, onSave } = this.props;
    const { first_name, last_name, email, phone, password } = this.state;

    if (validator.isEmpty(first_name)) {
      errors.first_name = "Please enter your first name";
    }

    if (validator.isEmpty(last_name)) {
      errors.last_name = "Please enter your last name";
    }

    if (!validator.isEmail(email)) {
      errors.email = "Please use a valid email address";
    }

    if (!validator.isMobilePhone(phone, "en-US")) {
      errors.phone = "Please enter your mobile phone number";
    }

    if (validator.isEmpty(password)) {
      errors.password = "Please enter a password";
    } else if (password && password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    if (Object.keys(errors).length) {
      this.setState({ errors });
      return;
    }
    onSave({ first_name, last_name, email, phone, password });
    navigation.navigate("Register2");
  }

  private onChangeText = (key: string) => {
    const { errors } = this.state;
    return (text: string) => {
      this.setState({
        [key]: text,
        errors: {
          ...errors,
          [key]: undefined
        }
      });
    }
  }
}

export default connect(mapState, mapDispatch)(Register1);

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flex: 6,
    flexDirection: "column",
    padding: 20
  },
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

});