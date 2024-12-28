import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Colors from '../../../../constants/Colors';
import NavHeader from '../../../../components/Headers/NavHeader';
import {t} from 'i18next';
import {apiWithToken} from '../../../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../../../constants/API.Constants';
import {medium} from '../../../../components/CustomFont/MyFont';
import {moderateScale, MT} from '../../../../constants/Utils';
import {MaterialIndicator} from 'react-native-indicators';
import NotificationCard from '../../../../components/Card/NotificationCard';
import {store} from '../../../../Store/Store';
import {setNotificationCount} from '../../../../Store/Data/Auth/AuthSlice';

type Props = {};

const Notification = (props: Props) => {
  const [notification, setNotification] = useState<NotificationList[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [last_id, setLast_id] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    fetchNotification({last_id});
  }, []);

  const fetchNotification = ({last_id}: {last_id: any}) => {
    const data = {
      last_id: last_id,
    };
    setIsLoading(true);
    apiWithToken(ENDPOINTS.Notification, 'POST', data, true)
      .then(res => {
        if (data?.last_id == 0) {
          readNotification();
        }
        setHasMore(res?.pagination?.has_next);
        setLast_id(res?.pagination?.next_id);
        setNotification(prev => {
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

  const readNotification = () => {
    apiWithToken(ENDPOINTS.Notification, 'PUT', '', true).then(res => {
      store.dispatch(setNotificationCount(0));
    });
  };

  const handleNext = () => {
    if (hasMore && !isLoading && notification?.length > 0) {
      fetchNotification({last_id: last_id});
    }
  };
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <NavHeader title={t('Notification')} />
        <FlatList
          data={notification}
          ListEmptyComponent={() => {
            return (
              <>
                {!isLoading && (
                  <Text
                    style={[
                      medium(20),
                      {alignSelf: 'center', marginTop: moderateScale(200)},
                    ]}>
                    {t('No Data Found')}
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
                fetchNotification({last_id: 0});
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
            return (
              <>
                <NotificationCard item={item} />
              </>
            );
          }}
        />
      </View>
    </>
  );
};

export default Notification;

const styles = StyleSheet.create({});

export type NotificationList = {
  bookie_id: number;
  booking_id: number;
  driver_id: number;
  id: number;
  is_read: boolean;
  message: string;
  notification_typ: '1' | '2';
  timestamps: string;
  title: string;
};
