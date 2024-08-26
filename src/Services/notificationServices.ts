import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import {PERMISSIONS} from 'react-native-permissions';
import {store} from '../Store/Store';
import {setFcmToken} from '../Store/Data/Auth/AuthSlice';
import {navigate} from './NavigationService';
import notifee, {
  AndroidCategory,
  AndroidImportance,
  AndroidStyle,
  EventType,
} from '@notifee/react-native';
import Colors from '../constants/Colors';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  if (enabled) {
    getFcmToken();
    NotificationGetPermissions();
  }
}

const getFcmToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  console.log('🚀 ~ getFcmToken ~ fcmToken:', fcmToken);

  store.dispatch(setFcmToken(fcmToken as string));

  if (!fcmToken) {
    try {
      const fcmToken = await messaging().getToken();
      console.log(fcmToken);
      if (fcmToken) {
        store.dispatch(setFcmToken(fcmToken as string));
      }
    } catch (error: any) {
      console.log(error, 'error in fcmToken');
    }
  }
};

export const notificationListener = async () => {};

// messaging().onTokenRefresh(fcmToken => {
//     console.log("New token refresh: ", fcmToken)

// })

export const NotificationGetPermissions = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  }
};
export const onDisplayNotification = async (data: any) => {
  // Request permissions (required for iOS)
  notifee.onBackgroundEvent(async ({type, detail}) => {
    console.log(
      '🚀 ~ notifee.onBackgroundEvent ~ detail:',
      detail?.pressAction?.id,
    );
    if (
      type === EventType.ACTION_PRESS &&
      detail?.pressAction?.id === 'reply'
    ) {
      // await updateChat(detail.notification.data.chatId, detail.input);
      await notifee.cancelNotification(String(detail?.notification?.id));
      await notifee.cancelAllNotifications();
    }
  });
  if (Platform.OS == 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: '111212',
    name: '21nd2121212',
    importance: AndroidImportance.HIGH,
    sound: 'sound',
  });

  // Display a notification
  await notifee.setNotificationCategories([
    {
      id: 'mess1212age',
      actions: [
        {
          id: 'reply1212',
          title: 'Rep1212ly',
          input: true,
        },
      ],
    },
  ]);
  await notifee.displayNotification({
    title: 'Test',

    body: 'This is test',
    ios: {
      foregroundPresentationOptions: {
        badge: true,
        sound: true,
        banner: true,
        list: true,
      },
    },
    android: {
      channelId,
      actions: [
        {
          title: 'Reply',

          pressAction: {
            id: 'reply',
          },
          input: {
            allowFreeFormInput: true, // set to false
            choices: ['Yes', 'No', 'Maybe'],
          }, // enable free text input
        },
      ],
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture:
          'https://plus.unsplash.com/premium_photo-1721858124916-c304fc371931?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    },
  });
};

export async function notificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log(remoteMessage, 'Check this');
    onDisplayNotification(remoteMessage);
    notifee
      .incrementBadgeCount()
      .then(() => notifee.getBadgeCount())
      .then(count => console.log('Badge count incremented by 1 to: ', count));
  });

  messaging().onNotificationOpenedApp((remoteMessage: any) => {
    console.log(remoteMessage);
    // console.log("Notification caused app to open from background state:", remoteMessage);
    if (remoteMessage.data.screen == 'Chat') {
      // Linking.openURL(remoteMessage.data.url)
      // navigate('Chat', {roomId: getRoomId(String(remoteMessage.data?.id))});
      // Alert.alert("Chat");
    }
    // notifee
    //    .incrementBadgeCount()
    //    .then(() => notifee.getBadgeCount())
    //    .then((count) => console.log("Badge count incremented by 1 to: ", count));
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then((remoteMessage: any) => {
      console.log(remoteMessage);

      if (remoteMessage) {
        // notifee
        //    .incrementBadgeCount()
        //    .then(() => notifee.getBadgeCount())
        //    .then((count) => console.log("Badge count incremented by 1 to: ", count));
        // console.log("Notification caused app to open from quit state:", remoteMessage.notification);
        if (remoteMessage.data.screen == 'Chat') {
          // Linking.openURL(remoteMessage.data.url)
        }
      }
    });

  return unsubscribe;
}
