import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import Postcard from '../card/Postcard';
import Colors from '../../../../../constants/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {apiWithToken} from '../../../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../../../constants/API.Constants';
import {PastBoookingResponse} from '../../../../../Models/Booking/booking.modal';
import {medium} from '../../../../../components/CustomFont/MyFont';
import {moderateScale} from '../../../../../constants/Utils';

const Post = () => {
  const [oldBooking, setOldBooking] = useState<PastBoookingResponse[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      fetchNewBooking();
    }, []),
  );

  const fetchNewBooking = () => {
    const data = {
      last_id: 0,
    };
    apiWithToken(ENDPOINTS.PastBookingList, 'POST', data, true, true)
      .then(res => {
        console.log('🚀 ~ fetchNewBooking ~ res:', res);
        setOldBooking(res.data);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  return (
    <>
      <FlatList
        data={oldBooking}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            tintColor={Colors.blue}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchNewBooking();
            }}
          />
        }
        ListEmptyComponent={() => {
          return (
            <>
              <Text
                style={[
                  medium(20),
                  {alignSelf: 'center', marginTop: moderateScale(200)},
                ]}>
                No Booking Found
              </Text>
            </>
          );
        }}
        renderItem={({item, index}) => {
          return <Postcard {...item} />;
        }}
      />
      {/* {data.map((item, index) => {
       return Loadig ? (
         <NewCardShimmerEffect key={index} />
       ) : (
         <NewCard key={index} data={item} />
       );
     })} */}
    </>
  );
};

export default memo(Post);

const styles = StyleSheet.create({});
