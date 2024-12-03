import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import Images from '../../constants/Images';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import {moderateScale} from '../../constants/Utils';

type Props = {
  img?: ImageSourcePropType;
  defaultSource?: any;
  size?: number;
  styles?: ViewStyle | ImageStyle | TextStyle;
  lable?: string;
  Onpress?: () => void;
  lStyle?: ViewStyle | ImageStyle | TextStyle;
  blurRadius?: number;
};

const AvatarImg: React.FC<Props> = ({img, defaultSource, Onpress}) => {
  return (
    <Pressable
      onPress={Onpress}
      style={{
        width: 147,
        height: 147,
        marginTop: 20,
        alignSelf: 'center',
      }}>
      {defaultSource ? (
        <Image
          source={{
            uri: defaultSource,
          }}
          resizeMode="cover"
          style={{
            width: 147,
            height: 147,
            borderRadius: 147,
            backgroundColor: '#ccc',
          }}
        />
      ) : (
        <Image
          source={Images.default}
          resizeMode="cover"
          style={{
            width: 147,
            height: 147,
            backgroundColor: '#ccc',

            borderRadius: 147,
          }}
        />
      )}
      {Onpress ? (
        <>
          <Image
            resizeMode="contain"
            source={Images.Camera}
            style={{
              width: 38,
              height: 38,
              position: 'absolute',
              right: 4,
              bottom: 10,
            }}
          />
          <Text
            style={{
              fontFamily: Fonts.regular,
              color: Colors.gray,
              marginTop: 13,
              textAlign: 'center',
              fontSize: moderateScale(13),
            }}>
            Upload profile pic or Company Logo
          </Text>
        </>
      ) : (
        <></>
      )}
    </Pressable>
  );
};

export default memo(AvatarImg);

const styles = StyleSheet.create({});
