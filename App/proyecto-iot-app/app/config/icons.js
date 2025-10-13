import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const home = ({ size = 24, color = '#6B7280', ...props }) => (
  <MaterialCommunityIcons 
    name="home-variant" 
    size={size} 
    color={color} 
    {...props} 
  />
);

export const alert = ({ size = 24, color = '#6B7280', ...props }) => (
  <MaterialCommunityIcons 
    name="bell-outline" 
    size={size} 
    color={color} 
    {...props} 
  />
);

export const more = ({ size = 24, color = '#6B7280', ...props }) => (
  <MaterialCommunityIcons 
    name="dots-horizontal" 
    size={size} 
    color={color} 
    {...props} 
  />
);
