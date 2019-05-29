import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ClassifyScreen from '../screens/ClassifyScreen';
import SearchScreen from '../screens/SearchScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ClassifyStack = createStackNavigator({
  Classify: ClassifyScreen,
});

ClassifyStack.navigationOptions = {
  tabBarLabel: 'Classify',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={"realNews"}
    />
  ),
};

const SearchStack = createStackNavigator({
  Search: SearchScreen,
});

SearchStack.navigationOptions = {
  tabBarLabel: 'Search',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={'md-search'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ClassifyStack,
  SearchStack,
});
