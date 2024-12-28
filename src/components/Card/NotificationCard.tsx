import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale, Styles} from '../../constants/Utils';
import {CIRCLE, medium, MR, MT, semiBold} from '../CustomFont/MyFont';
import Colors from '../../constants/Colors';
import Flex1 from '../Layouts/Flex1';
import moment from 'moment';
import {NotificationList} from '../../Screens/AuthScreens/Bottomtabscreens/Notification/Notification';
import Images from '../../constants/Images';

type Props = {
  item: NotificationList;
};

const NotificationCard = ({item}: Props) => {
  return (
    <>
      <View style={[styles.mainCont, styles.shadowCard]}>
        <View
          style={[
            CIRCLE(48),
            {backgroundColor: Colors.blue},
            MR(14),
            Styles.centerDiv,
          ]}>
          <Image
            source={Images.notificationBell}
            style={[CIRCLE(24)]}
            tintColor={'white'}
          />
        </View>
        <Flex1>
          <Text style={[semiBold(14, Colors.black)]}>{item?.title}</Text>
          <Text style={[medium(13, Colors.detailText), MT(4)]}>
            {item?.message}
          </Text>
          <Text style={[medium(10, Colors.detailText), MT(9)]}>
            {moment(item?.timestamps).format('DD MMM YYYY, h:mm A')}
          </Text>
        </Flex1>
      </View>
    </>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  mainCont: {
    borderRadius: moderateScale(6),
    borderColor: '#353535',
    width: '90%',
    alignSelf: 'center',
    marginVertical: moderateScale(5),
    padding: moderateScale(14),
    flexDirection: 'row',
  },
  shadowCard: {
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: moderateScale(15),
    paddingHorizontal: moderateScale(17),
    paddingVertical: moderateScale(12),
    backgroundColor: 'white',
  },
});
