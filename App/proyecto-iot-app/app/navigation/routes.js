import HomeScreen from '~/views/home/HomeScreen';
import ConfigurationScreen from '~/views/configuration/ConfigurationScreen';
import { home, more } from '~/config/icons';

export const TAB_ROUTES = [
  {
    name: 'home',
    component: HomeScreen,
    label: 'Inicio',
    renderIcon: home,
  },
  {
    name: 'configuration',
    component: ConfigurationScreen,
    label: 'Más',
    renderIcon: more,
  },
];

export const STACK_ROUTES = [
  {
    name: 'ejemplo',
    component: HomeScreen,
  },
];