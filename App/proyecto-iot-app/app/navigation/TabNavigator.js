import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { TAB_ITEMS } from '~/config/tab-items';
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
      {TAB_ITEMS.map((item) => (
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