import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TabNavigator from './TabNavigator';
import { STACK_ROUTES } from './routes';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, 
      }}
    >
      <Stack.Screen
        name="MainTabs"
        component={TabNavigator}
      />

      {STACK_ROUTES.map((route) => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
        />
      ))}
    </Stack.Navigator>
  );
};

export default RootNavigator;