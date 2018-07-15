import React from 'react';
import {
  createStackNavigator,
  createMaterialTopTabNavigator,
  createTabNavigator,
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

// Manages Profile Stack
const ProfileNavigator = createStackNavigator({
  ProfileView: {
    screen: ProfileView
  },
  ProfileEdit: {
    screen: ProfileEdit
  },
  ProfileNotifications: {
    screen: ProfileNotifications
  },
  ProfileFilters: {
    screen: ProfileFilters
  }
}, {
    headerMode: 'none'
  });

const UserNavigator = createMaterialTopTabNavigator({
  Profile: ProfileNavigator,
  Past: {
    screen: PastAppointments
  },
  Upcoming: {
    screen: UpcomingAppointments
  }
}, {
    swipeEnabled: false,
    tabBarPosition: 'top',
    tabBarOptions: {
      style: {
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