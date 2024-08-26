import {
  Image,
  ImageSourcePropType,
  Platform,
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
import FlexDirRow from '../Layouts/FlexDirRow';
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
    <View style={{}}>
      <Pressable
        style={[styles.container, {}]}
        onPress={() => {
          onpress ? onpress() : navigation.navigate(screenName as any);
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: moderateScale(50),
            height: moderateScale(50),
            borderRadius: 12,
            backgroundColor: '#F0F0F0',
          }}>
          <Image
            source={icon}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </View>
        <FlexDirRow
          style={{
            flex: 1,
            marginLeft: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: 5,
          }}>
          <Text
            style={{
              fontFamily: Fonts.THICCCBOMedium,
              color: Colors.black,
              fontSize: 16,
              // top: Platform.OS == 'android' ? 1 : 3,
            }}>
            {title}
          </Text>
          <Image
            source={Images.Right_Arrow}
            resizeMode="contain"
            style={{
              width: 6,
              height: 10,
            }}
          />
        </FlexDirRow>
      </Pressable>
      <View
        style={{
          width: '100%',
          borderBottomWidth: 1,
          borderBottomColor: '#F0F0F0',
        }}
      />
    </View>
  );
};

export default SettingList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: 20,

    padding: 10,
    alignItems: 'center',
  },
  text: {
    // ...Styles.normalFontStyle,
    color: 'black',
  },
});
