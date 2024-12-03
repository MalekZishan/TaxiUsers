import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {bold, MR, semiBold, SQUARE} from '../CustomFont/MyFont';
import FlexDirRow from '../Layouts/FlexDirRow';
import {moderateScale} from '../../constants/Utils';
import Colors from '../../constants/Colors';
import Images from '../../constants/Images';
import {navigate} from '../../Services/NavigationService';
import {NewBookingResponse} from '../../Models/Booking/booking.modal';
import {chatCollectionByRoomID} from '../../Firebase/chatServices';
import {useAppSelector} from '../../Hooks/ReduxHooks';
import {userDataSelector} from '../../Store/Data/Auth/AuthSlice';

type Props = {
  bookingData: NewBookingResponse;
};

const NewMessageCard = ({bookingData}: Props) => {
  const roomId = String(bookingData.id);
  const senderId = String(bookingData.id);
  const receiverId = String(useAppSelector(userDataSelector).data?.id);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const collection = chatCollectionByRoomID(roomId);
    collection
      .where('isRead', '==', false)
      .where('senderId', '==', senderId)
      .where('receiverId', '==', receiverId)
      .onSnapshot(snap => {
        setCount(snap.size);
      });
  }, []);
  const onView = () => {
    navigate('Chat', bookingData);
  };
  return (
    <>
      <View
        style={{
          backgroundColor: 'white',
          width: '90%',
          alignSelf: 'center',
          borderRadius: 100,
          padding: moderateScale(10),
          paddingHorizontal: moderateScale(15),
          elevation: 3,
          shadowColor: 'black',
          shadowOpacity: 0.2,
          marginTop: moderateScale(20),
          shadowRadius: 3,
          display: count > 0 ? 'flex' : 'none',
        }}>
        <FlexDirRow style={{justifyContent: 'space-between'}}>
          <Text style={semiBold(12)}>{count} New Message</Text>
          <FlexDirRow style={{alignItems: 'center'}}>
            <Text style={[bold(12, Colors.blue), MR(10)]} onPress={onView}>
              View
            </Text>
            <Pressable onPress={() => setCount(0)}>
              <Image
                source={Images.close}
                tintColor={'#7B7E86'}
                style={SQUARE(24)}
              />
            </Pressable>
          </FlexDirRow>
        </FlexDirRow>
      </View>
    </>
  );
};

export default NewMessageCard;

const styles = StyleSheet.create({});
