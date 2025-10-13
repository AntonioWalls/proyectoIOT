import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, TouchableOpacity } from 'react-native';

const ACTIVE_COLOR = '#10B981';
const INACTIVE_COLOR = '#6B7280';
const ICON_ACTIVE_COLOR = '#FFFFFF';

const NavItem = ({ renderIcon, label, focused, onPress }) => {
  const animatedValue = useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0,
      duration: 300,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focused, animatedValue]);

  // --- Animaciones ---

  // La escala solo se aplicará al círculo de fondo
  const backgroundScale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // El color de fondo para el círculo
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(255, 255, 255, 0)', ACTIVE_COLOR],
  });

  // El color del texto
  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [INACTIVE_COLOR, ACTIVE_COLOR],
  });

  // Opacidad para el ícono inactivo (gris)
  const inactiveIconOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  // Opacidad para el ícono activo (blanco)
  const activeIconOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.container} activeOpacity={0.8}>
      {/* Contenedor principal para el ícono y su fondo */}
      <View style={styles.iconContainer}>
        {/* 1. Círculo de fondo que escala (detrás de los íconos) */}
        <Animated.View
          style={[
            styles.backgroundCircle,
            {
              transform: [{ scale: backgroundScale }],
              backgroundColor: backgroundColor,
            },
          ]}
        />

        {/* 2. Íconos que cambian de opacidad (siempre visibles en su contenedor) */}
        <Animated.View style={{ opacity: inactiveIconOpacity }}>
          {renderIcon({ color: INACTIVE_COLOR })}
        </Animated.View>

        <Animated.View style={[styles.activeIcon, { opacity: activeIconOpacity }]}>
          {renderIcon({ color: ICON_ACTIVE_COLOR })}
        </Animated.View>
      </View>

      {/* Etiqueta de texto */}
      <Animated.Text style={[styles.label, { color: textColor }]}>
        {label}
      </Animated.Text>
    </TouchableOpacity>
  );
};

// --- Estilos actualizados ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  // Contenedor que ocupa el espacio y centra los íconos
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  // Círculo de fondo con posición absoluta para estar detrás
  backgroundCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    position: 'absolute',
  },
  // Ícono activo superpuesto
  activeIcon: {
    position: 'absolute',
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default NavItem;