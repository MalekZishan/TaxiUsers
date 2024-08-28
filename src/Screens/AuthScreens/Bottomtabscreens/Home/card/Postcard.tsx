import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import {moderateScale} from '../../../../../constants/Utils';
import Fonts from '../../../../../constants/Fonts';
import Colors from '../../../../../constants/Colors';
import Images from '../../../../../constants/Images';
import AuthButton from '../../../../../components/Button/AuthButton';
import Drivercard from './Drivercard';
import RatingModal from '../../../../../components/Modals/RatingModal';

const Postcard = (data: any) => {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <RatingModal {...{visible, setVisible}} />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.dateText}>22 Aug 2024</Text>
              <Text style={styles.priceText}>$ 178</Text>
            </View>
            <View style={[styles.headerRow, styles.headerRowMargin]}>
              <Text style={styles.carTypeText}>Sedan Car</Text>
              <Text style={styles.paymentText}>
                Payment: <Text style={styles.paymentMethodText}>Cash</Text>
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.locationContainer}>
            <View style={styles.locationRow}>
              <View style={styles.iconContainer}>
                <View style={styles.startDot} />
                <Image source={Images.Line2} style={styles.lineImage} />
                <View style={styles.endDot} />
              </View>
              <View style={styles.addressContainer}>
                <View style={styles.addressBlock}>
                  <Text style={styles.labelText}>From</Text>
                  <Text style={styles.addressText}>
                    8502 Preston Rd, Maine 98380
                  </Text>
                </View>
                <View style={styles.addressBlockTo}>
                  <Text style={styles.labelText}>To</Text>
                  <Text style={styles.addressText} lineBreakMode="clip">
                    Mesa, New Jersey 45463
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Pressable style={styles.detailsBlock}>
            <Image source={Images.Person} style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabelText}>Persons</Text>
              <Text style={styles.detailValueText}>4</Text>
            </View>
          </Pressable>
          <Pressable style={[styles.detailsBlock, styles.detailsBlockMargin]}>
            <Image source={Images.car} style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabelText}>Car Type</Text>
              <Text style={styles.detailValueText}>Sedan</Text>
            </View>
          </Pressable>
        </View>
        <Pressable style={styles.bookingForContainer}>
          <Image source={Images.userblue} style={styles.detailIcon} />
          <View style={styles.bookingForTextContainer}>
            <Text style={styles.detailLabelText}>Booking For</Text>
            <View style={styles.bookingForDetails}>
              <Text style={styles.bookingForName}>Leslie Alexander</Text>
              <View style={styles.divider} />
              <Text style={styles.bookingForContact}>Mo: +1 98980 98980</Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.separatorLine} />
        <View style={styles.driverInfoContainer}>
          <Image source={Images.pic} style={styles.driverImage} />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>Annette Black</Text>
            <Image source={Images.call} style={styles.callIcon} />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <AuthButton
            textStyle={styles.authButtonText}
            onPress={() => {
              setVisible(true);
            }}
            title={'Rate Now'}
            Mystyle={styles.authButton}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(Postcard);

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(20),
    paddingBottom: 20,
    borderRadius: 10,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#F7F7F7',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerRowMargin: {
    marginTop: 7,
  },
  dateText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: moderateScale(13),
  },
  priceText: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(19),
    color: Colors.black,
  },
  carTypeText: {
    fontFamily: Fonts.regular,
    fontSize: moderateScale(14),
    color: Colors.black,
  },
  paymentText: {
    fontFamily: Fonts.medium,
    color: Colors.black,
    fontSize: moderateScale(13),
  },
  paymentMethodText: {
    fontFamily: Fonts.regular,
    color: Colors.blue,
    fontSize: moderateScale(13),
  },
  content: {
    paddingHorizontal: 15,
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
  startDot: {
    width: 10,
    height: 10,
    backgroundColor: Colors.black,
    borderRadius: 10,
  },
  lineImage: {
    width: moderateScale(1),
    height: moderateScale(36),
    flex: 0.6,
  },
  endDot: {
    width: 10,
    height: 10,
    backgroundColor: Colors.black,
    borderRadius: 1,
  },
  addressContainer: {},
  addressBlock: {
    marginStart: 10,
    top: -7,
  },
  addressBlockTo: {
    marginTop: moderateScale(10),
    marginStart: 10,
    top: 5,
  },
  labelText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: moderateScale(12),
    marginBottom: 7,
  },
  addressText: {
    fontFamily: Fonts.regular,
    color: Colors.black,
    fontSize: moderateScale(14),
    flex: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(25),
  },
  detailsBlock: {
    height: moderateScale(60),
    borderRadius: 6,
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
    borderRadius: 6,
    flex: 1,
    paddingHorizontal: 10,
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
  separatorLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    paddingTop: 10,
    paddingBottom: 10,
  },
  driverInfoContainer: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(15),
    alignItems: 'center',
    marginTop: 30,
  },
  driverImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  driverDetails: {
    flexDirection: 'row',
    marginStart: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  driverName: {
    color: Colors.black,
    fontSize: moderateScale(16),
    fontFamily: Fonts.semiBold,
  },
  callIcon: {
    width: 34,
    height: 34,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    marginTop: 15,
  },
  authButton: {
    backgroundColor: '#EAF1FF',
  },
  authButtonText: {
    color: Colors.blue,
  },
});
