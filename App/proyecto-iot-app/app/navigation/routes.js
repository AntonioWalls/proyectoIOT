import HomeScreen from '~/views/home/HomeScreen';
import SettingsScreen from '~/views/settings/SettingsScreen';
import NotificationsScreen from '~/views/notifications/NotificationsScreen';
import PondDetailScreen from '~/views/detail/PondDetailScreen';
import HistoryScreen from '~/views/history/HistoryScreen';
import { home, more, alert } from '~/config/icons';

export const TAB_ROUTES = [
  {
    name: 'home',
    component: HomeScreen,
    label: 'Inicio',
    renderIcon: home,
  },
  {
    name: 'alert',
    component: NotificationsScreen,
    label: 'Notificaciones',
    renderIcon: alert,
  },
  {
    name: 'configuration',
    component: SettingsScreen,
    label: 'Más',
    renderIcon: more,
  },
];

export const STACK_ROUTES = [
  {
    name: 'detail',
    component: PondDetailScreen,
  },
  {
    name: 'history',
    component: HistoryScreen,
  },
];