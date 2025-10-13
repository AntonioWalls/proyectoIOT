import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TAB_ROUTES } from './routes'; 
import TabBar from '~/components/Nav/TabBar';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="home"
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      {TAB_ROUTES.map((item) => (
        <Tab.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            tabBarLabel: item.label,
            tabBarIcon: item.renderIcon, 
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabNavigator;