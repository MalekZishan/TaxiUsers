import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {moderateScale} from '../../../../../constants/Utils';
import Fonts from '../../../../../constants/Fonts';
import Colors from '../../../../../constants/Colors';
import Images from '../../../../../constants/Images';
import AuthButton from '../../../../../components/Button/AuthButton';
import Drivercard from './Drivercard';
import {NewBookingResponse} from '../../../../../Models/Booking/booking.modal';
import {navigate} from '../../../../../Services/NavigationService';
import {useTranslation} from 'react-i18next';

interface NewCardProps extends NewBookingResponse {}
const NewCard = (data: NewCardProps) => {
  const {t} = useTranslation();
  const onGetDirection = () => {
    navigate('DriverLocation', {...data});
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.dateText}>{data?.date_created}</Text>
          <Text style={styles.priceText}>$ {data?.price}</Text>
        </View>
        <Text style={styles.bookingIdText}>
          {t('Booking ID:')}{' '}
          <Text style={styles.bookingIdValueText}>{data?.id}</Text>
        </Text>
        <View style={styles.locationContainer}>
          <View style={styles.locationRow}>
            <View style={styles.iconContainer}>
              <Image
                resizeMode="contain"
                source={Images.radio}
                style={styles.radioIcon}
              />
              <Image source={Images.Line} style={styles.lineImage} />
              <Image
                source={Images.Location}
                resizeMode="contain"
                style={styles.locationIcon}
              />
            </View>
            <View style={[styles.addressContainer, {flex: 1}]}>
              <View style={styles.addressBlock}>
                <Text style={styles.labelText}>{t('From')}</Text>
                <Text style={[styles.addressText, {width: '100%', flex: 1}]}>
                  {data?.pick_up_adds}
                </Text>
              </View>
              <View style={styles.addressBlockTo}>
                <Text style={styles.labelText}>{t('To')}</Text>
                <Text style={[styles.addressText, {width: '100%'}]}>
                  {data?.drop_of_adds}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Pressable style={styles.detailsBlock}>
            <Image source={Images.Person} style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabelText}>{t('Persons')}</Text>
              <Text style={styles.detailValueText}>
                {data?.total_passenger}
              </Text>
            </View>
          </Pressable>
          <Pressable style={[styles.detailsBlock, styles.detailsBlockMargin]}>
            <Image source={Images.car} style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabelText}>{t('Car Type')}</Text>
              <Text style={styles.detailValueText}>{data?.car_type}</Text>
            </View>
          </Pressable>
        </View>
        <Pressable style={styles.bookingForContainer}>
          <Image source={Images.userblue} style={styles.detailIcon} />
          <View style={styles.bookingForTextContainer}>
            <Text style={styles.detailLabelText}>{t('Booking For')}</Text>
            <View style={styles.bookingForDetails}>
              <Text style={styles.bookingForName} numberOfLines={1}>
                {data?.full_name}
              </Text>
              <View style={styles.divider} />
              <Text style={styles.bookingForContact}>
                {t('Mo:')} {data?.phone_number}
              </Text>
            </View>
          </View>
        </Pressable>

        {data?.driver_id == null && (
          <AuthButton
            title={t('Driver details assigned soon')}
            mt={20}
            textStyle={styles.authButtonText}
            Mystyle={styles.authButton}
          />
        )}
      </View>
      {data?.driver_detail ? (
        <Drivercard
          {...data?.driver_detail}
          onGetDirection={onGetDirection}
          onMessage={() => {
            navigate('Chat', data);
          }}
        />
      ) : (
        <></>
      )}
      <View style={styles.separator} />
    </View>
  );
};

export default memo(NewCard);

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
  },
  priceText: {
    fontFamily: Fonts.bold,
    fontSize: moderateScale(19),
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
    top: 5,
  },
  labelText: {
    fontFamily: Fonts.regular,
    color: Colors.gray,
    fontSize: moderateScale(12),
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
