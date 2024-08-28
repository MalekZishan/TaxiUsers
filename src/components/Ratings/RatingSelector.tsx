import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Styles, WIDTH, SQUARE, moderateScale} from '../../constants/Utils';
import Images from '../../constants/Images';

type RatingSelectorProps = {
  onPress: (rating: number) => void;
  selectedRating: number;
};
const RatingSelector = ({onPress, selectedRating}: RatingSelectorProps) => {
  const rating = ['', '', '', '', ''];

  return (
    <View
      style={{
        flexDirection: 'row',
        ...Styles.centerDiv,
        marginVertical: WIDTH / 20,
      }}>
      {rating.map((val, index) => {
        return (
          <Pressable onPress={() => onPress(index)} key={index}>
            <Image
              source={
                index <= selectedRating
                  ? Images.filledstar
                  : Images.unfilledstar
              }
              style={{
                margin: 5,
                height: moderateScale(39),
                width: moderateScale(39),
              }}
              resizeMode={'contain'}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default RatingSelector;

const styles = StyleSheet.create({});
