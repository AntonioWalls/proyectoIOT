import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';

const ACTIVE_COLOR = '#10B981'; 
const INACTIVE_COLOR = '#6B7280'; 

const NavItem = ({ renderIcon, label, focused, onPress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0,
      duration: 250, 
      easing: Easing.inOut(Easing.ease), 
      useNativeDriver: true, 
    }).start();
  }, [focused, animatedValue]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10], 
  });

  const textColor = focused ? ACTIVE_COLOR : INACTIVE_COLOR;
  const iconColor = focused ? ACTIVE_COLOR : INACTIVE_COLOR;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7} 
    >
      <Animated.View style={{ transform: [{ translateY }] }}>
        {renderIcon({ color: iconColor })}
      </Animated.View>
      <Text style={[styles.label, { color: textColor }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default NavItem;