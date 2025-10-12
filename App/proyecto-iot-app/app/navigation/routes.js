import HomeScreen from '~/views/home/HomeScreen';
import ConfigurationScreen from '~/views/configuration/ConfigurationScreen';
import { home, more } from '~/config/icons';

export const BOTTOM_TAB_ROUTES = [
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