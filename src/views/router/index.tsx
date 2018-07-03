import {
  createStackNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';

import {
  Onboarding,
  Login,
  Welcome
} from '../screens';

const AuthenticationNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Login: {
    screen: Login
  }
}, {
    initialRouteName: 'Welcome',
    headerMode: 'none'
  });

const OnboardingNavigator = createStackNavigator({
  Onboarding: {
    screen: Onboarding
  },
  Authenticate: {
    screen: AuthenticationNavigator
  }
}, { headerMode: 'none' });



const MainNavigator = createStackNavigator({
  onboarding: OnboardingNavigator
}, {
    initialRouteName: 'onboarding',
    headerMode: 'none'
  });

export default MainNavigator;
