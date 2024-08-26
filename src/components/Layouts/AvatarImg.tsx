import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, {memo} from 'react';
import Images from '../../constants/Images';

type Props = {
  img?: ImageSourcePropType;
  defaultSource?: any;
  size?: number;
  styles?: ViewStyle | ImageStyle | TextStyle;
  lable?: string;
  Onpress: () => void;
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
          source={defaultSource}
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
    </Pressable>
  );
};

export default memo(AvatarImg);

const styles = StyleSheet.create({});
