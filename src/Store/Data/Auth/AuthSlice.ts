import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../Store';
import {firebase} from '@react-native-firebase/firestore';
import {act} from 'react-test-renderer';
import {UsersTypes} from '../../../Models/Auth/Auth.modal';

export type userType = UsersTypes & {
  chatsIds?: string[];
  lastTime: string;
  isTyping: boolean;
};

//? 1 for User and 2 for Driver
type userData = {
  data?: userType;
  token?: string;
  isUserAuthenticated?: boolean;
  notificationCount?: number;
  Issplash: boolean;
  fcmToken?: string;
  Location: {
    latitude: number;
    longitude: number;
  };
};
const initialState: userData = {
  data: undefined,
  token: '',
  Issplash: false,
  fcmToken: '',
  Location: {latitude: 0, longitude: 0},

  isUserAuthenticated: false,
  notificationCount: 0,
};

const UserSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<userData['data']>) => {
      if (action.payload) {
        const myCollection = firebase
          .firestore()
          .collection('Users')
          .doc(String(String(action.payload.userId)));
        const data = {
          ...action.payload,
        };

        myCollection.get().then((doc: {exists: any}) => {
          if (!doc.exists) {
            myCollection.set(data);
          }
        });
      }
      state.data = action.payload;
    },
    setUserToken: (state, action: PayloadAction<userData['token']>) => {
      state.token = action.payload;
    },
    setLocation: (state, action: PayloadAction<userData['Location']>) => {
      state.Location = action.payload;
    },
    setIsSplash: (state, action: PayloadAction<userData['Issplash']>) => {
      state.Issplash = action.payload;
    },
    setFcmToken: (state, action: PayloadAction<userData['fcmToken']>) => {
      state.fcmToken = action.payload;
    },

    logOut: state => {
      return (state = {...initialState});
    },
    UserisUserAuthenticated: (
      state,
      action: PayloadAction<userData['isUserAuthenticated']>,
    ) => {
      state.isUserAuthenticated = action.payload;
    },
  },
});

export default UserSlice.reducer;
export const userDataSelector = (state: RootState) => state.userData;
export const {
  setFcmToken,
  setUserData,
  setUserToken,
  setLocation,
  logOut,
  setIsSplash,
  UserisUserAuthenticated,
} = UserSlice.actions;
