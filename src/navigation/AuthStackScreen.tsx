import {ScreenTypes} from '../Models/Navigation/NavigationModels';
import BookingRequirement from '../Screens/AuthScreens/Bottomtabscreens/Home/Screens/BookingRequirement';
import ChangePassword from '../Screens/AuthScreens/Bottomtabscreens/Profile/componets/ChangePassword';
import EditProfile from '../Screens/AuthScreens/Bottomtabscreens/Profile/componets/EditProfile';
import Setting from '../Screens/AuthScreens/Bottomtabscreens/Profile/componets/Setting';
import Wallet from '../Screens/AuthScreens/Bottomtabscreens/Profile/componets/Wallet';

import BottomTabs from './BottomTabs';

export const Screens: ScreenTypes = [
  {
    name: 'BottomTabs',
    title: 'BottomTabs',
    Component: BottomTabs,
    options: {headerShown: false},
  },
  {
    name: 'BookingRequirement',
    title: 'BookingRequirement',
    Component: BookingRequirement,
    options: {headerShown: false},
  },
  {
    name: 'EditProfile',
    title: 'EditProfile',
    Component: EditProfile,
    options: {headerShown: false},
  },
  {
    name: 'Setting',
    title: 'Setting',
    Component: Setting,
    options: {headerShown: false},
  },
  {
    name: 'ChangePassword',
    title: 'ChangePassword',
    Component: ChangePassword,
    options: {headerShown: false},
  },
  {
    name: 'Wallet',
    title: 'Wallet',
    Component: Wallet,
    options: {headerShown: false},
  },
];
