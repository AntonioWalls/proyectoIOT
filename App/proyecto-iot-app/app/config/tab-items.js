
import HomeScreen from '~/views/configuration/ConfigurationScreen';
import ConfigurationScreen from '~/views/configuration/ConfigurationScreen';

import { home, alert, more } from '~/config/icons';

export const TAB_ITEMS = [
  {
    name: "HomeTab",
    component: HomeScreen,
    label: "Inicio",
    renderIcon: home 
  },
  {
    name: "ProfileTab",
    component: ConfigurationScreen,
    label: "Más",
    renderIcon: more
  },
];