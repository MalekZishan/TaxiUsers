import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import NavigationBackBtn from './NavigationBackBtn';
import FlexDirRow from '../Layouts/FlexDirRow';
import {
  moderateScale,
  Styles,
  SQUARE,
  moderateScaleVertical,
} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Animated, {FadeInDown} from 'react-native-reanimated';
import Fonts from '../../constants/Fonts';
import Images from '../../constants/Images';
import {navigate} from '../../Services/NavigationService';
import {useAppSelector} from '../../Hooks/ReduxHooks';
import {userDataSelector} from '../../Store/Data/Auth/AuthSlice';

export type BackNavigationHeaderProps = {
  title?: string;
  rImg?: ImageSourcePropType;
  rImgChat?: boolean;
  onrPress?: () => void;
  leftImgColor?: string;
  CenterImg?: boolean;
  onLeftPress?: () => void;
  lImg?: ImageSourcePropType;
  notificationCount?: number;
  hideBackBtn?: boolean;
  titlelcr?: string;
  righttitle?: string;
  onTitlePress?: () => void;
};

const BackNavigationHeader: React.FC<BackNavigationHeaderProps> = ({
  title,
  rImg,
  onrPress,
  leftImgColor = Colors.black,
  onLeftPress,
  lImg,
  CenterImg,
  hideBackBtn,
  righttitle,
  onTitlePress,
  rImgChat,
  titlelcr = Colors.black,
}) => {
  const {notificationCount} = useAppSelector(userDataSelector);
  return (
    <FlexDirRow
      style={{
        alignItems: 'center',
        paddingVertical: title
          ? moderateScaleVertical(8)
          : moderateScaleVertical(13),
      }}>
      <Animated.View
        entering={FadeInDown}
        style={{position: 'absolute', zIndex: 10}}>
        {!hideBackBtn && (
          <NavigationBackBtn imgColor={leftImgColor} {...{onLeftPress, lImg}} />
        )}
      </Animated.View>

      <Animated.Text
        entering={FadeInDown.delay(50)}
        style={{
          flex: 1,
          textAlign: 'center',
          ...Styles.normalFontStyle,
          color: titlelcr,
        }}>
        {title}
      </Animated.Text>

      {rImg && (
        <Pressable
          onPress={onrPress}
          style={{
            marginRight: moderateScale(15),
            position: 'absolute',
            right: 0,
          }}>
          {notificationCount ? (
            <View
              style={{
                position: 'absolute',
                right: moderateScale(-10),
                top: moderateScale(-15),
                backgroundColor: Colors.blue,
                borderRadius: 100,
                height: moderateScale(24),
                width: moderateScale(24),
                zIndex: 99,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  Styles.normalFontStyle,
                  {color: 'white', fontSize: moderateScale(12)},
                ]}>
                {notificationCount}
              </Text>
            </View>
          ) : null}
          <Image
            source={rImg}
            style={{
              ...SQUARE(moderateScale(24)),
              alignSelf: 'flex-end',
            }}
            resizeMode="contain"
          />
        </Pressable>
      )}
    </FlexDirRow>
  );
};

export default BackNavigationHeader;

const styles = StyleSheet.create({});
