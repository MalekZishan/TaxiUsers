import {FlatList, StyleSheet, Text} from 'react-native';
import React, {memo, useEffect, useState} from 'react';
import NewCard from '../card/NewCard';
import {apiWithToken} from '../../../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../../../constants/API.Constants';
import {NewBookingResponse} from '../../../../../Models/Booking/booking.modal';
import {RefreshControl} from 'react-native-gesture-handler';
import Colors from '../../../../../constants/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {medium} from '../../../../../components/CustomFont/MyFont';
import {moderateScale} from '../../../../../constants/Utils';

const New = () => {
  const [newBooking, setNewBooking] = useState<NewBookingResponse[]>([]);
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
    apiWithToken(ENDPOINTS.NewBookingList, 'POST', data, true, true)
      .then(res => {
        setNewBooking(res.data);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  return (
    <>
      <FlatList
        data={newBooking}
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
        renderItem={({item, index}) => {
          return <NewCard {...item} />;
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

export default memo(New);

const styles = StyleSheet.create({});
