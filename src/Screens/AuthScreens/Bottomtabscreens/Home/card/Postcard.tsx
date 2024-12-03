import {Image, Linking, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import {moderateScale, SQUARE} from '../../../../../constants/Utils';
import Fonts from '../../../../../constants/Fonts';
import Colors from '../../../../../constants/Colors';
import Images from '../../../../../constants/Images';
import AuthButton from '../../../../../components/Button/AuthButton';
import RatingModal from '../../../../../components/Modals/RatingModal';
import {PastBoookingResponse} from '../../../../../Models/Booking/booking.modal';
import {CarData} from '../Screens/BookingRequirement';
import {imgSrc} from '../../../../../ApiService/core/ApiRequest';
import {
  medium,
  ML,
  MR,
  semiBold,
} from '../../../../../components/CustomFont/MyFont';
import FlexDirRow from '../../../../../components/Layouts/FlexDirRow';

interface PastCardProps extends PastBoookingResponse {}

const Postcard = (data: PastCardProps) => {
  const [visible, setVisible] = useState(false);
  const [isRated, setIsRated] = useState(data?.user_rate);

  const onSubmitRating = ({rate}: {rate: number}) => {
    setVisible(false);
    setIsRated(rate);
  };
  return (
    <View style={{padding: 10}}>
      <RatingModal
        data={data}
        visible={visible}
        setVisible={setVisible}
        callback={onSubmitRating}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <View style={styles.headerRow}>
              <Text style={styles.dateText}>{data?.date_created}</Text>
              <Text style={styles.priceText}>$ {data?.price}</Text>
            </View>
            <View style={[styles.headerRow, styles.headerRowMargin]}>
              <Text style={styles.carTypeText}>
                {
                  CarData?.filter(i => i?.value == parseInt(data?.car_type))[0]
                    .label
                }
              </Text>
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
                  <Text style={styles.addressText}>{data?.pick_up_adds}</Text>
                </View>
                <View style={styles.addressBlockTo}>
                  <Text style={styles.labelText}>To</Text>
                  <Text style={styles.addressText} lineBreakMode="clip">
                    {data?.drop_of_adds}
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
              <Text style={styles.detailValueText}>
                {data?.total_passenger}
              </Text>
            </View>
          </Pressable>
          <Pressable style={[styles.detailsBlock, styles.detailsBlockMargin]}>
            <Image source={Images.car} style={styles.detailIcon} />
            <View style={styles.detailTextContainer}>
              <Text style={styles.detailLabelText}>Car Type</Text>
              <Text style={styles.detailValueText}>
                {
                  CarData?.filter(i => i?.value == parseInt(data?.car_type))[0]
                    .label
                }
              </Text>
            </View>
          </Pressable>
        </View>
        <Pressable style={styles.bookingForContainer}>
          <Image source={Images.userblue} style={styles.detailIcon} />
          <View style={styles.bookingForTextContainer}>
            <Text style={styles.detailLabelText}>Booking For</Text>
            <View style={styles.bookingForDetails}>
              <Text style={styles.bookingForName}>{data?.full_name}</Text>
              <View style={styles.divider} />
              <Text style={styles.bookingForContact}>
                Mo: {data?.phone_number}
              </Text>
            </View>
          </View>
        </Pressable>
        <View style={styles.separatorLine} />
        <View style={styles.driverInfoContainer}>
          <Image
            source={{uri: imgSrc(data?.driver_detail?.profile_pic)}}
            style={styles.driverImage}
          />
          <View style={styles.driverDetails}>
            <Text style={styles.driverName}>
              {data?.driver_detail?.full_name}
            </Text>
            <Pressable
              onPress={() => {
                Linking.openURL(`tel:${data?.driver_detail?.phone_number}`);
              }}>
              <Image source={Images.call} style={styles.callIcon} />
            </Pressable>
          </View>
        </View>
        {data?.payment_status == '4' && isRated == null ? (
          <View style={styles.buttonContainer}>
            <AuthButton
              textStyle={styles.authButtonText}
              onPress={() => setVisible(true)}
              title={'Rate Now'}
              Mystyle={styles.authButton}
            />
          </View>
        ) : isRated != null ? (
          <>
            <View
              style={[
                {
                  borderTopWidth: 1,
                  marginTop: moderateScale(24),
                  borderColor: '#E5E5E5',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingTop: moderateScale(15),
                },
              ]}>
              <FlexDirRow>
                <Text style={medium(13, '#7B7B7B')}>You Rated</Text>
                <Image
                  source={Images.filledstar}
                  tintColor={Colors.yellow}
                  style={[SQUARE(16), MR(5), ML(15)]}
                />
                <Text style={semiBold(13)}>{data?.user_rate?.toFixed(1)}</Text>
              </FlexDirRow>
            </View>
          </>
        ) : (
          <></>
        )}
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
