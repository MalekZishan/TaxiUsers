import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {memo, useState} from 'react';
import NewCard from '../card/NewCard';
import {apiWithToken} from '../../../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../../../constants/API.Constants';
import {NewBookingResponse} from '../../../../../Models/Booking/booking.modal';
import {RefreshControl} from 'react-native-gesture-handler';
import Colors from '../../../../../constants/Colors';
import {useFocusEffect} from '@react-navigation/native';
import {medium} from '../../../../../components/CustomFont/MyFont';
import {moderateScale, MT} from '../../../../../constants/Utils';
import {t} from 'i18next';
import {MaterialIndicator} from 'react-native-indicators';

const New = () => {
  const [newBooking, setNewBooking] = useState<NewBookingResponse[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [last_id, setLast_id] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      fetchNewBooking({last_id});
    }, []),
  );

  const fetchNewBooking = ({last_id}: {last_id: any}) => {
    const data = {
      last_id: last_id,
    };
    setIsLoading(true);
    apiWithToken(ENDPOINTS.NewBookingList, 'POST', data, true, true)
      .then(res => {
        setHasMore(res?.pagination?.has_next);
        setLast_id(res?.pagination?.next_id);
        setNewBooking(prev => {
          if (last_id == 0) {
            return [...res?.data];
          } else {
            return [...(prev || []), ...res?.data];
          }
        });
      })
      .catch(() => {
        setHasMore(false);
      })
      .finally(() => {
        setIsRefreshing(false);
        setIsLoading(false);
      });
  };

  const handleNext = () => {
    if (hasMore && !isLoading && newBooking?.length > 0) {
      fetchNewBooking({last_id: last_id});
    }
  };

  return (
    <>
      <FlatList
        data={newBooking}
        ListEmptyComponent={() => {
          return (
            <>
              {!isLoading && (
                <Text
                  style={[
                    medium(20),
                    {alignSelf: 'center', marginTop: moderateScale(200)},
                  ]}>
                  {t('No Booking Found')}
                </Text>
              )}
            </>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            tintColor={Colors.blue}
            onRefresh={() => {
              setIsRefreshing(true);
              fetchNewBooking({last_id: 0});
            }}
          />
        }
        onEndReached={handleNext}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => {
          return (
            <>
              {isLoading && (
                <View style={MT(20)}>
                  <MaterialIndicator
                    size={50}
                    color={Colors.blue}
                    trackWidth={1}
                  />
                </View>
              )}
            </>
          );
        }}
        renderItem={({item, index}) => {
          return <NewCard {...item} />;
        }}
      />
    </>
  );
};

export default memo(New);

const styles = StyleSheet.create({});
