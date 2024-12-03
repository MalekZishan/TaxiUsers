import {firebase} from '@react-native-firebase/firestore';
import {store} from '../Store/Store';

export const userCollection = () => {
  return firebase.firestore().collection('Users');
};
export const myCollection = () =>
  userCollection().doc(String(store.getState().userData.data?.id));

export const userByID = (id: string | any) => {
  return firebase.firestore().collection('Users').doc(id);
};
