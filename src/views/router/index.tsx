import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createTabNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import {
  Onboarding,
  Login,
  Welcome,
  Register1,
  Register2,
  Register3,
  Register4,

  ChatList,
  ProposalView,
  ActivityMap
} from '../screens';
import Icon from 'react-native-vector-icons/FontAwesome';

import UserNavigator from './user-navigator';
import theme from '../../assets/styles/theme';

const RegistrationNavigator = createStackNavigator({
  Welcome: {
    screen: Welcome
  },
  Login: {
    screen: Login,
    navigationOptions: {
      title: 'LOGIN',
      ...theme.NavBar.transparent
    }
  },
  Register1: {
    screen: Register1,
    navigationOptions: {
      title: 'CREATE ACCOUNT',
      ...theme.NavBar.transparent
    }
  },
  Register2: {
    screen: Register2,
    navigationOptions: {
      title: 'CREATE ACCOUNT',
      ...theme.NavBar.transparent
    }
  },
  Register3: {
    screen: Register3,
    navigationOptions: {
      title: 'CREATE ACCOUNT',
      ...theme.NavBar.transparent
    }
  },
  Register4: {
    screen: Register4,
    navigationOptions: {
      title: 'PICK WONDERS',
      ...theme.NavBar.transparent
    }
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
  Activity: {
    screen: ActivityMap
  },
  Proposal: {
    screen: ProposalView
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
  User: {
    screen: UserNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="user" size={18} color={tintColor} />
    }
  },
  Home: {
    screen: HomeNavigator,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="home" size={18} color={tintColor} />
    }
  },
  Chat: {
    screen: ChatNavigator, navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="comments" size={18} color={tintColor} />
    }
  },
}, {
    swipeEnabled: false,
    tabBarOptions: {
      allowFontScaling: false,
      showLabel: false,
      showIcon: true,
      style: {
        elevation: 0,
        paddingTop: Platform.select({ ios: 20, android: 0 }),
        backgroundColor: theme.colors.white,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.secondary
      },
      indicatorStyle: {
        backgroundColor: theme.colors.white
      },
      activeTintColor: theme.colors.primaryLight,
      inactiveTintColor: theme.colors.textColor,
    },
    initialRouteName: 'Home'
  });

const MainNavigator = createStackNavigator({
  onboarding: OnboardingNavigator,
  Main: AuthenticatedNavigator
}, {
    initialRouteName: 'onboarding',
    headerMode: 'none'
  });

export default MainNavigator;
