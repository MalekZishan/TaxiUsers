import {useEffect} from 'react';
import {apiWithToken} from '../../ApiService/core/ApiRequest';
import {ENDPOINTS} from '../../constants/API.Constants';
import {store} from '../../Store/Store';
import {setNotificationCount} from '../../Store/Data/Auth/AuthSlice';

export const UseNotificationCount = () => {
  useEffect(() => {
    fetchNotificationCount();
  }, []);
  const fetchNotificationCount = () => {
    apiWithToken(ENDPOINTS.Notification, 'GET', '', true).then(res => {
      store.dispatch(setNotificationCount(res.data));
    });
  };
};
