import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const useGetStatusBarHeight = () => {
  const insets = useSafeAreaInsets();

  return insets.top;
};

export const useBottomBarHeight = () => {
  const insets = useSafeAreaInsets();
  return Platform.OS == 'ios' ? insets.bottom : insets.bottom + 10;
};
