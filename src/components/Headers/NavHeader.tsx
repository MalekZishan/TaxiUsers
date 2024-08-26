import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useGetStatusBarHeight} from '../../Hooks/dimentionHook';
import {moderateScaleVertical} from '../../constants/Utils';
import BackNavigationHeader, {
  BackNavigationHeaderProps,
} from '../Button/BackNavigationHeader';
import Colors from '../../constants/Colors';

interface Props extends BackNavigationHeaderProps {
  ExtraComponent?: () => React.ReactNode;
  backgroundColor?: string;
}

const NavHeader = ({
  ExtraComponent,

  ...props
}: Props) => {
  const paddingTop = useGetStatusBarHeight();
  return (
    <View
      style={{
        paddingVertical: moderateScaleVertical(7),
        paddingTop,
      }}>
      {/* <View style={{ paddingVertical: moderateScaleVertical(10), paddingTop, backgroundColor: Colors.primary, }}> */}
      <BackNavigationHeader {...props} />
      {ExtraComponent && (
        <View>
          <ExtraComponent />
        </View>
      )}
    </View>
  );
};

export default NavHeader;

const styles = StyleSheet.create({});
