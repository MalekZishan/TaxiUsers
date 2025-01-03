import {
  Image,
  ImageSourcePropType,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DEVICE_TYPE, moderateScale, Styles} from '../constants/Utils';

import Colors from '../constants/Colors';

import Images from '../constants/Images';
import Fonts from '../constants/Fonts';
import {
  BottomTabStackParamsList,
  BottomTabsScreenTypes,
} from '../Models/Navigation/NavigationModels';

import {regular} from '../components/CustomFont/MyFont';

import Home from '../Screens/AuthScreens/Bottomtabscreens/Home/Home';
import Profile from '../Screens/AuthScreens/Bottomtabscreens/Profile/Profile';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {t} from 'i18next';

type Props = {};

const Tab = createBottomTabNavigator<BottomTabStackParamsList>();

const BottomTabs = (props: Props) => {
  const {t} = useTranslation();
  const Screens: BottomTabsScreenTypes = [
    {
      name: 'Home',
      title: 'Home',
      Component: Home,
      icons: [Images.Home_hActive, Images.Home_hActive],
    },

    {
      name: 'Profile',
      title: 'Profile',
      Component: Profile,
      icons: [Images.Home_Profile, Images.Home_Profile],
    },
  ];
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [isFocused]);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabel: '',
        // tabBarAllowFontScaling: false,
        tabBarStyle: {
          height: DEVICE_TYPE == 'ios' ? 90 : 70,
          padding: 15,
          display: isKeyboardVisible ? 'none' : 'flex',
          backgroundColor: '#ffff',
          justifyContent: 'space-between',
          elevation: 1,
          shadowOpacity: 0.2,
          shadowRadius: 2,
          shadowOffset: {
            height: 2,
            width: 1,
          },
        },
      }}
      detachInactiveScreens={false}>
      {Screens.map((item, index) => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.Component}
            options={{
              ...item?.options,
              tabBarIcon: ({color, size, focused}) => {
                return (
                  <BT_Button
                    name={item.name}
                    focused={focused}
                    img={item.icons[0]}
                    index={index}
                    activeImg={item.icons[1]}
                  />
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default memo(BottomTabs);

const styles = StyleSheet.create({});

type BT_ButtonProps = {
  name: string;
  focused: boolean;
  img: ImageSourcePropType;
  activeImg: ImageSourcePropType;
  index: number;
};

const BT_Button: React.FC<BT_ButtonProps> = ({
  focused,
  img,
  activeImg,
  index,
  name,
}) => {
  const size = 25;

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={[
          {
            width: 24,
            height: 24,
          },
        ]}
        tintColor={focused ? Colors.blue : '#A5AAB5'}
        source={focused ? activeImg : img}
      />
      <Text
        style={{
          fontFamily: Fonts.regular,
          fontSize: moderateScale(11),
          lineHeight: 13,
          marginTop: 4,
          color: focused ? Colors.blue : '#A5AAB5',
        }}>
        {name == 'Home' ? t('My Bookings') : t('My Profile')}
      </Text>
    </View>
  );
};
