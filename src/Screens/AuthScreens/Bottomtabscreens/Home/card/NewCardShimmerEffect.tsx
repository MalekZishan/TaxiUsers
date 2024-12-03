import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {moderateScale} from '../../../../../constants/Utils';
import Fonts from '../../../../../constants/Fonts';
import Colors from '../../../../../constants/Colors';
import Images from '../../../../../constants/Images';
import AuthButton from '../../../../../components/Button/AuthButton';
import Drivercard from './Drivercard';
import {ShimmerEffect} from '../../../../../../ShimmerEffect';
import LinearGradient from 'react-native-linear-gradient';

const NewCardShimmerEffect = (data: any) => {
  // const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient as any);

  return (
    <></>
    // <View>
    //   <View style={styles.container}>
    //     <ShimmerPlaceholder />
    //     <ShimmerPlaceholder visible={true}>
    //       <Text>Wow, awesome here.</Text>
    //     </ShimmerPlaceholder>
    //     <View style={styles.header}>
    //       <ShimmerEffect style={styles.dateText}></ShimmerEffect>
    //       <ShimmerEffect style={styles.priceText}></ShimmerEffect>
    //     </View>
    //     <ShimmerEffect
    //       style={{
    //         marginTop: 10,
    //         ...styles.priceText,
    //       }}></ShimmerEffect>

    //     <View style={styles.locationContainer}>
    //       <ShimmerEffect
    //         style={{
    //           height: 50,
    //           borderRadius: 10,
    //         }}
    //       />
    //     </View>
    //     <View style={styles.detailsContainer}>
    //       <ShimmerEffect style={styles.detailsBlock}></ShimmerEffect>
    //       <ShimmerEffect
    //         style={{
    //           ...styles.detailsBlock,
    //           ...styles.detailsBlockMargin,
    //         }}></ShimmerEffect>
    //     </View>
    //     <ShimmerEffect style={styles.bookingForContainer}></ShimmerEffect>

    //     {!data?.data?.isDrirver && (
    //       <ShimmerEffect
    //         style={{
    //           borderWidth: 1,
    //           borderColor: '#E1E1E1',
    //           marginTop: 10,
    //           borderRadius: moderateScale(60),
    //           width: '100%',
    //           height: moderateScale(45),
    //           flex: 1,
    //           paddingHorizontal: 15,
    //           alignItems: 'center',
    //           flexDirection: 'row',
    //         }}></ShimmerEffect>
    //     )}
    //   </View>
    //   <View style={styles.separator} />
    // </View>
  );
};

export default memo(NewCardShimmerEffect);

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: moderateScale(13),
    width: 100,
    height: 20,
  },
  priceText: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(19),
    height: 20,
    width: 100,
    color: Colors.black,
  },
  bookingIdText: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    lineHeight: moderateScale(19),
    fontSize: moderateScale(13),
  },
  bookingIdValueText: {
    color: Colors.gray,
  },
  locationContainer: {
    marginTop: moderateScale(25),
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
  },
  radioIcon: {
    width: moderateScale(17),
    height: moderateScale(17),
    borderRadius: 10,
  },
  lineImage: {
    width: moderateScale(1),
    height: moderateScale(36),
    flex: 1,
  },
  locationIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    top: -3,
  },
  addressContainer: {},
  addressBlock: {
    marginStart: 10,
    top: -7,
  },
  addressBlockTo: {
    marginTop: moderateScale(10),
    marginStart: 10,
    width: '100%',
    top: 5,
    flex: 1,
  },
  labelText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: moderateScale(12),
    width: '100%',
    height: 10,
  },
  addressText: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: moderateScale(14),
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: moderateScale(25),
  },
  detailsBlock: {
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 6,
    flex: 1,
    padding: 15,
    flexDirection: 'row',
  },
  detailsBlockMargin: {
    marginStart: 15,
  },
  detailIcon: {
    width: 24,
    height: 24,
  },
  detailTextContainer: {
    marginStart: 10,
  },
  detailLabelText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: moderateScale(12),
  },
  detailValueText: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: moderateScale(14),
    marginTop: 2,
  },
  bookingForContainer: {
    height: moderateScale(60),
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 6,
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
  },
  bookingForTextContainer: {
    flex: 1,
    marginStart: 10,
  },
  bookingForDetails: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingRight: 15,
  },
  bookingForName: {
    fontFamily: Fonts.medium,
    color: Colors.black,
    fontSize: moderateScale(14),
    marginTop: 2,
  },
  divider: {
    width: 1,
    backgroundColor: '#D8D8D8',
    height: 17,
  },
  bookingForContact: {
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(12),
    color: '#FFB902',
  },
  authButton: {
    backgroundColor: '#EAF1FF',
  },
  authButtonText: {
    color: Colors.blue,
    fontSize: moderateScale(15),
  },
  separator: {
    height: 2,
    marginTop: 20,
    backgroundColor: '#EFEFEF',
  },
});
