import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  NavigationScreenProp,
  NavigationRoute
} from 'react-navigation';

import {
  Login,
  ProfileView,
  ProfileEdit,
  ProfileNotifications,
  ProfileFilters,
  UpcomingAppointments,
  PastAppointments,

  ChatList
} from '../screens';

import TabIcon from '../components/tabs/secondary-tab-icon';
import theme from '../../assets/styles/theme';

// import SecondaryTabIcon from '../components/tab/secondary-tab-icon';

function hideTabsForNestedRoutes({ navigation }: { navigation: NavigationScreenProp<NavigationRoute> }) {
  if (navigation.state.index === 1) {
    return {
      tabBarVisible: false,
    };
  }
  return {
    tabBarVisible: true,
  };
}

// Manages Profile Stack
const ProfileNavigator = createStackNavigator({
  ProfileView: {
    screen: ProfileView
  },
  ProfileEdit: {
    screen: ProfileEdit,
    navigationOptions: {
      title: 'Profile'
    }
  },
  ProfileNotifications: {
    screen: ProfileNotifications,
    navigationOptions: {
      title: 'Notifications'
    }
  },
  ProfileFilters: {
    screen: ProfileFilters,
    navigationOptions: {
      title: 'Filters'
    }
  }
}, {
    // headerMode: 'none'
    navigationOptions: {
      headerTintColor: theme.colors.textColor,
      headerStyle: {
        backgroundColor: '#FFF',
        borderBottomWidth: 0,
        borderBottomColor: '#FFF'
      }
    }
  });

const UserNavigator = createMaterialTopTabNavigator({
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: hideTabsForNestedRoutes
  },
  Past: {
    screen: PastAppointments,
    navigationOptions: hideTabsForNestedRoutes
  },
  Upcoming: {
    screen: UpcomingAppointments,
    navigationOptions: hideTabsForNestedRoutes
  }
}, {
    swipeEnabled: false,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
        paddingTop: Platform.select({ ios: 20, android: 0 }),
        backgroundColor: '#FFF'
      },
      indicatorStyle: {
        backgroundColor: theme.colors.primary,
      },
      activeTintColor: theme.colors.primary,
      inactiveTintColor: 'gray',
    },
  })

export default UserNavigator;