import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Stack} from './RootNavigator';
import {ScreenTypes} from '../Models/Navigation/NavigationModels';
import Login from '../Screens/UnAuthScreens/Login/Login';
import ForgotPassword from '../Screens/UnAuthScreens/ForgotPassword/ForgotPassword';
import OnBoardScreen from '../Screens/UnAuthScreens/OnBoardScreen/OnBoardScreen';
import Register from '../Screens/UnAuthScreens/Register/Register';
import {userDataSelector} from '../Store/Data/Auth/AuthSlice';
import {useAppSelector} from '../Hooks/ReduxHooks';
import EmailVerification from '../Screens/UnAuthScreens/Register/EmailVerification';
import ForgotEmailVerfication from '../Screens/UnAuthScreens/ForgotPassword/ForgotEmailVerfication';
import NewPassword from '../Screens/UnAuthScreens/ForgotPassword/NewPassword';

const UnAuthNavigator = () => {
  const {isIntroDone} = useAppSelector(userDataSelector);

  const Screens: ScreenTypes = [
    {
      name: 'Login',
      title: 'Login',
      Component: Login,
      options: {headerShown: false},
    },
    {
      name: 'EmailVerification',
      title: 'EmailVerification',
      Component: EmailVerification,
      options: {headerShown: false},
    },
    {
      name: 'Register',
      title: 'Register',
      Component: Register,
      options: {headerShown: false},
    },
    {
      name: 'ForgotPassword',
      title: 'ForgotPassword',
      Component: ForgotPassword,
      options: {headerShown: false},
    },
    {
      name: 'OnBoardScreen',
      title: 'OnBoardScreen',
      Component: OnBoardScreen,
      options: {headerShown: false},
    },
    {
      name: 'NewPassword',
      title: 'NewPassword',
      Component: NewPassword,
      options: {headerShown: false},
    },
    {
      name: 'ForgotEmailVerfication',
      title: 'ForgotEmailVerfication',
      Component: ForgotEmailVerfication,
      options: {headerShown: false},
    },
  ];

  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator
        initialRouteName={isIntroDone ? 'Login' : 'OnBoardScreen'}
        screenOptions={({}) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitleAlign: 'center',
        })}>
        {Screens.map(screen => {
          return (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.Component}
              options={({}) => {
                return {
                  ...screen.options,
                };
              }}
            />
          );
        })}
      </Stack.Navigator>
    </>
  );
};

export default UnAuthNavigator;

const styles = StyleSheet.create({});
