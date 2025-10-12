import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BOTTOM_TAB_ROUTES } from './routes'; 
import TabBar from '~/components/Nav/TabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {BOTTOM_TAB_ROUTES.map((route) => (
        <Tab.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{
            tabBarLabel: route.label,
            tabBarIcon: route.renderIcon,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;