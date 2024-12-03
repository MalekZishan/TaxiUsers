import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {requestNotifications} from 'react-native-permissions';

const notificationService = async () => {
  const authStatus = await messaging().requestPermission();
  const permision = requestNotifications(['alert', 'badge', 'sound']);
  getFCMToken();
};
export const generateToken = async () => {
  // await messaging().registerDeviceForRemoteMessages();
  let token = await messaging().getToken();
  if (token) {
    return token;
  } else return '';
};
const getFCMToken = async () => {
  const DisplayNotification = async (notification: any) => {
    const channel = await notifee.createChannel({
      id: '1',
      name: 'All',
    });
    const data = {
      ...notification,
      ...((notification.android.channelId = channel) as any),
    };

    notifee.displayNotification(data);
  };
  const notifi1 = messaging().onMessage(async remoteMessage => {
    DisplayNotification(remoteMessage.notification);
  });
  const notifi2 = messaging().onNotificationOpenedApp(remoteMessage => {
    DisplayNotification(remoteMessage.notification);
  });
  const notifi3 = messaging().setBackgroundMessageHandler(
    async remoteMessage => {
      DisplayNotification(remoteMessage.notification);
    },
  );
};

export const TOKEN = 'token';
export const FCMToken = (state = '', action: {type: any; payload: any}) => {
  switch (action.type) {
    case TOKEN:
      return action.payload;
    default:
      return state;
  }
};

export default notificationService;
