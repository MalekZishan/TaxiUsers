import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useSelector} from 'react-redux';

import ProgressDialog from '../components/Modals/ProgressDIalog';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamsList} from '../Models/Navigation/NavigationModels';
import {navigationRef} from '../Services/NavigationService';
import UnAuthNavigator from './UnAuthNavigator';
import AuthNavigator from './AuthNavigator';
import Splash from '../Screens/UnAuthScreens/Spash/Spash';
import {userDataSelector} from '../Store/Data/Auth/AuthSlice';
import {useAppSelector} from '../Hooks/ReduxHooks';

type Props = {};

export const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigator = (props: Props) => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const {isUserAuthenticated} = useAppSelector(userDataSelector);

  //// * --> splash screen changing <--- ////
  useEffect(() => {
    const change_screen = setTimeout(() => {
      setIsSplashComplete(true);
    }, 3100);
    return () => clearTimeout(change_screen);
  }, []);

  return (
    <>
      {isSplashComplete ? (
        <NavigationContainer ref={navigationRef}>
          <ProgressDialog
            onRef={(c: any) => {
              if (c) ProgressDialog.dialogInstance = c;
            }}
          />
          {true ? <AuthNavigator /> : <UnAuthNavigator />}
        </NavigationContainer>
      ) : (
        <Splash />
      )}
    </>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
