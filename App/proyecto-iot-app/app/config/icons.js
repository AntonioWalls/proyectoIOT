import React from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';

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

export const checkCircle = ({ size = 14, color = '#10B981', ...props }) => (
  <Feather 
    name="check-circle" 
    size={size} 
    color={color} 
    {...props} 
  />
);

export const alertCircle = ({ size = 14, color = '#EF4444', ...props }) => (
  <Feather 
    name="alert-circle" 
    size={size} 
    color={color} 
    {...props} 
  />
);

export const thermometer = ({ size = 32, color = '#374151', ...props }) => (
  <MaterialCommunityIcons 
    name="thermometer" 
    size={size} 
    color={color} 
    {...props} 
  />
);

export const waterPercent = ({ size = 32, color = '#374151', ...props }) => (
  <MaterialCommunityIcons 
    name="water-percent" 
    size={size} 
    color={color} 
    {...props} 
  />
);

export const airFilter = ({ size = 32, color = '#374151', ...props }) => (
  <MaterialCommunityIcons 
    name="air-filter" 
    size={size} 
    color={color} 
    {...props} 
  />
);

export const flash = ({ size = 32, color = '#374151', ...props }) => (
  <MaterialCommunityIcons 
    name="flash" 
    size={size} 
    color={color} 
    {...props} 
  />
);
