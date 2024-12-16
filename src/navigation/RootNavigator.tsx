import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamsList} from '../Models/Navigation/NavigationModels';
import {navigationRef} from '../Services/NavigationService';
import UnAuthNavigator from './UnAuthNavigator';
import AuthNavigator from './AuthNavigator';
import Splash from '../Screens/UnAuthScreens/Spash/Spash';
import {userDataSelector} from '../Store/Data/Auth/AuthSlice';
import {useAppSelector} from '../Hooks/ReduxHooks';
import LoadingIndicator from '../comman/LoadingIndicator';
import i18next from 'i18next';

type Props = {};

export const Stack = createStackNavigator<RootStackParamsList>();

const RootNavigator = (props: Props) => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);
  const {isUserAuthenticated} = useAppSelector(userDataSelector);
  const {lng} = useAppSelector(userDataSelector);
  useEffect(() => {
    i18next.changeLanguage(lng);
  }, []);

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
          <LoadingIndicator
            onRef={(ref: any) => {
              if (ref) {
                LoadingIndicator.dialogInstance = ref;
              }
            }}
          />
          {isUserAuthenticated ? <AuthNavigator /> : <UnAuthNavigator />}
        </NavigationContainer>
      ) : (
        <Splash />
      )}
    </>
  );
};

export default RootNavigator;

const styles = StyleSheet.create({});
