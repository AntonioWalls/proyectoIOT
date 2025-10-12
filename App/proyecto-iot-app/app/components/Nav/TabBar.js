import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import NavItem from './navItem/NavItem';

const CustomTabBar = ({ state, descriptors, navigation }) => {

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const renderIcon = options.tabBarIcon;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <NavItem
            key={route.key}
            renderIcon={renderIcon}
            label={label}
            focused={isFocused}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 70,
    alignItems: 'center',
    justifyContent: 'space-around',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 10,
      },
    }),
  },
});


export default CustomTabBar;