import {RouteProp} from '@react-navigation/native';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import {ImageSourcePropType} from 'react-native';

import {BottomTabNavigationOptions} from '@react-navigation/bottom-tabs';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type UnUnAuthStackParamsList = {
  Login: undefined;
  ForgotPassword: undefined;
  Verify: {
    data: FirebaseAuthTypes.ConfirmationResult;
  };
  OnBoardScreen: undefined;
  ConfirmationSocial: undefined;
  Register: undefined;
  SignUp: undefined;
  ClientRegister: undefined;
  PublicProfile: undefined;
  PersonalInformation: undefined;
};

export type AuthStack = {
  BottomTabs: undefined;
  ChargePayment: undefined;
  CheckProgress: undefined;
  OrderDetails: undefined;
  AppoinmentDetails: undefined;
  EditProfile: undefined;
  AddBike: undefined;
  Setting: undefined;
  TremCon: undefined;
  Privacypolicy: undefined;
  PaymentMethod: undefined;
  Notification: undefined;
  RentalsAppoinment2: undefined;
  MyBike: undefined;
  CheckoutRantals: undefined;
  RentalsAppoinment1: undefined;
  Rentalsdetails: undefined;
  AppointmentsServices1: undefined;
  AppointmentsServices2: undefined;
  AppointmentsServices3: undefined;
  AppointmentsAvailability: undefined;
  AppointmentDetails: undefined;
  AppointmentsAddProblem: undefined;
  AppointmentCheckout: undefined;
  ChoseAddress: undefined;
  ShopDetails: undefined;
  AssignVan: undefined;
  SeeallShop: undefined;
  ViewShopCart: undefined;
  CheckoutShopping: undefined;
  ProductDetails: undefined;
  AdminChat: undefined;
};

export type BottomTabStackParamsList = {
  Home: undefined;
  Orders: undefined;
  Events: undefined;
  Profile: undefined;
};

export type RootStackParamsList = UnUnAuthStackParamsList & AuthStack;

export type ScreenTypes = {
  name: keyof RootStackParamsList;
  title: keyof RootStackParamsList;
  Component: React.FC<any>;
  options: StackNavigationOptions;
}[];

export type BottomTabsScreenTypes = {
  name: keyof BottomTabStackParamsList;
  title?: keyof BottomTabStackParamsList;
  Component: React.FC<any>;
  options?: BottomTabNavigationOptions;
  icons: ImageSourcePropType[];
}[];

export interface NavigationProps<
  T extends keyof RootStackParamsList | keyof BottomTabStackParamsList,
> {
  navigation: StackNavigationProp<
    RootStackParamsList & BottomTabStackParamsList,
    T
  >;
  route: RouteProp<RootStackParamsList & BottomTabStackParamsList, T>;
}
