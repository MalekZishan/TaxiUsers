import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';
import {CardStyleInterpolators} from '@react-navigation/stack';
import BottomTabs from './BottomTabs';
import {Stack} from './RootNavigator';

import {Screens} from './AuthStackScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../Store/Store';

const AuthNavigator = () => {
  return (
    <>
      <StatusBar translucent backgroundColor={'transparent'} />
      <Stack.Navigator
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

export default AuthNavigator;

const styles = StyleSheet.create({});
