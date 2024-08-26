import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  ImageStyle,
  ViewStyle,
  TextInputProps,
  ImageSourcePropType,
} from 'react-native';
import {
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteProps,
  GooglePlacesAutocompleteRef,
} from 'react-native-google-places-autocomplete';
import {moderateScale, moderateScaleVertical} from '../../constants/Utils';
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import YupError from '../Text/YupError';

export interface MyAutoPlacesProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  onLatLongChange?: (lat: number | string, long: number | string) => void;
  lImg?: ImageSourcePropType;
  rText?: string;
  onrPress?: () => void;
  rImg?: ImageSourcePropType;
  TextInputProps?: TextInputProps;
  lImageStyle?: ImageStyle;
  error?: boolean | string;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  onRImgPress?: () => void;
  googlePlacesProps?: Omit<GooglePlacesAutocompleteProps, 'placeholder'>;
  setOnChangeDefault?: boolean;
  hideLabel?: boolean;
  float?: boolean;
}

const MyAutoPlaces: React.FC<MyAutoPlacesProps> = ({
  placeholder,
  onChangeText,
  lImg,
  TextInputProps,
  lImageStyle,
  style,
  containerStyle,
  googlePlacesProps,
  error,
  onLatLongChange,
  setOnChangeDefault,
  float,
}) => {
  const [autoPlace, setAutoPlace] = useState('');
  const ref = useRef<GooglePlacesAutocompleteRef>(null);

  useEffect(() => {
    ref.current?.setAddressText(TextInputProps?.defaultValue || '');
  }, []);

  useEffect(() => {
    if (setOnChangeDefault) {
      onChangeText(autoPlace);
    }
    if (onLatLongChange) {
      onLatLongChange('', '');
    }
  }, [autoPlace]);

  const query = useRef({
    key: 'AIzaSyBcsdjbcFxHda59ARD_5OlnUEl5NqO9oJA',
    ...(googlePlacesProps?.query ?? {}),
  }).current;

  return (
    <Pressable onPress={TextInputProps?.onPressIn}>
      <View
        style={[
          {
            marginHorizontal: moderateScale(15),
            marginVertical: moderateScaleVertical(10),
            elevation: 10,
          },
          style,
        ]}>
        <View
          style={[
            {
              borderWidth: 1,
              padding: moderateScale(10),
              borderRadius: 8,
              borderColor: '#EBEBEB',
              flexDirection: 'row',
              height: 45,
              elevation: 10,
              alignItems: 'center',
              backgroundColor: '#fff',
              zIndex: 999,
            },
            containerStyle,
          ]}>
          {lImg && (
            <Image
              source={lImg}
              resizeMode={'contain'}
              style={{
                width: moderateScale(20),
                height: moderateScale(20),
                marginRight: 10,
                ...lImageStyle,
              }}
            />
          )}

          <GooglePlacesAutocomplete
            ref={ref}
            placeholder={placeholder}
            keyboardShouldPersistTaps="always"
            enableHighAccuracyLocation
            styles={{
              listView: float
                ? {
                    position: 'absolute',
                    zIndex: 99,
                    elevation: 3,
                    top: 40,
                    width: '100%',
                    borderWidth: 1,
                    borderColor: '#EBEBEB',
                  }
                : {},
              predefinedPlacesDescription: {
                color: 'black',
              },
              description: {
                fontWeight: 'bold',
                color: 'black',
              },
            }}
            textInputProps={{
              placeholderTextColor: '#848484',
              style: [
                {
                  ...styles.textInputStyle,
                },
                TextInputProps?.style,
              ],
              onChangeText: setAutoPlace,
              ...TextInputProps,
            }}
            fetchDetails
            onPress={(data, details = null) => {
              setAutoPlace(data.description);
              onChangeText(data.description);
              if (details && onLatLongChange) {
                onLatLongChange(
                  details.geometry.location.lat,
                  details.geometry.location.lng,
                );
              }
            }}
            enablePoweredByContainer={false}
            {...googlePlacesProps}
            query={query}
          />
        </View>

        {error && <YupError err={error as string} />}
      </View>
    </Pressable>
  );
};

export default memo(MyAutoPlaces);

const styles = StyleSheet.create({
  textInputStyle: {
    fontFamily: Fonts.regular,
    flex: 1,
    color: Colors.black,
    padding: 0,
    fontSize: moderateScale(15),
    includeFontPadding: false,
  },
});
