import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createTabNavigator,
} from 'react-navigation';

import {
  Onboarding,
  Login,
  Welcome,
  Register1,
  Register2,
  Register3,
  Register4,

  ChatList
} from '../screens';

import UserNavigator from './user-navigator';
import theme from '../../assets/styles/theme';

const RegistrationNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Login: {
    screen: Login
  },
  Register1: {
    screen: Register1
  },
  Register2: {
    screen: Register2
  },
  Register3: {
    screen: Register3
  },
  Register4: {
    screen: Register4
  }
}, {
    initialRouteName: 'Welcome'
  });

// Manages Onboarding and Registration
const OnboardingNavigator = createStackNavigator({
  Onboarding: {
    screen: Onboarding
  },
  Register: {
    screen: RegistrationNavigator
  }
}, { headerMode: 'none' });


// Manages the Matches and Scheduling flow
const HomeNavigator = createStackNavigator({
  ChatList: {
    screen: ChatList
  }
}, {
    headerMode: 'none'
  });

const ChatNavigator = createStackNavigator({
  ChatList: {
    screen: ChatList
  }
}, {
    headerMode: 'none'
  });

const AuthenticatedNavigator = createMaterialTopTabNavigator({
  Profile: UserNavigator,
  Home: HomeNavigator,
  Chat: ChatNavigator,
}, {
    swipeEnabled: false,
    tabBarOptions: {
      style: {
        backgroundColor: '#FFF',
        borderBottomWidth: 0,
        borderBottomColor: '#FFF'
      },
      indicatorStyle: {
        backgroundColor: '#FFF'
      },
      activeTintColor: theme.colors.primary,
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Profile'
  });

const MainNavigator = createStackNavigator({
  onboarding: OnboardingNavigator,
  Main: AuthenticatedNavigator
}, {
    initialRouteName: 'Main',
    headerMode: 'none'
  });

export default MainNavigator;
