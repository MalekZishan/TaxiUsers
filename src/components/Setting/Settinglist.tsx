import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {moderateScale, SQUARE, Styles} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Flex1 from '../Layouts/Flex1';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';

export interface SettingsListProps {
  title: string;
  icon: ImageSourcePropType;
  screenName?: string;
  onpress?: () => void;
}

const SettingList: React.FC<SettingsListProps> = ({
  icon,
  title,
  screenName,
  onpress,
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Pressable
      style={[styles.container, {}]}
      onPress={() => {
        onpress ? onpress() : navigation.navigate(screenName as any);
      }}>
      <View
        style={{
          width: moderateScale(42),
          backgroundColor: Colors.blue,
          height: moderateScale(42),
          top: -4,
          alignItems: 'center',
          borderRadius: moderateScale(41),
          justifyContent: 'center',
        }}>
        <Image source={icon} style={{...SQUARE(22)}} tintColor={'white'} />
      </View>
      <Flex1
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#E6EAE9',
          flex: 1,
          marginLeft: 25,
          paddingBottom: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: Fonts.medium,
              color: Colors.black,
              fontSize: moderateScale(15),
            }}>
            {title}
          </Text>
          <Image
            source={Images.arrow_right1}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </View>
      </Flex1>
    </Pressable>
  );
};

export default SettingList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    marginVertical: 7.5,
    alignItems: 'center',
    marginLeft: 10,
  },
  text: {
    ...Styles.normalFontStyle,
    color: 'black',
  },
});
