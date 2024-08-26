import {ScreenTypes} from '../Models/Navigation/NavigationModels';

import BottomTabs from './BottomTabs';

export const Screens: ScreenTypes = [
  {
    name: 'BottomTabs',
    title: 'BottomTabs',
    Component: BottomTabs,
    options: {headerShown: false},
  },
];
