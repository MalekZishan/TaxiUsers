import {firebase} from '@react-native-firebase/firestore';
import {store} from '../Store/Store';
import {messageType} from '../Models/Chat/messageService';

export const userCollection = () => {
  return firebase.firestore().collection('users');
};
export const myCollection = () =>
  userCollection().doc(String(store.getState().userData.data?.id));

export const userByID = (id: string | any) => {
  return firebase.firestore().collection('users').doc(id);
};

export const generateRoomId = (id: string) => {
  // const myId = store.getState().userData?.data?.id;
  // if (!myId) return '';
  // if (myId > id) {
  //   return `${myId}-${id}`;
  // } else {
  //   return `${id}-${myId}`;
  // }
  return String(id);
};

// export const getIdsFromRoomId = (roomId: string) => {
//   const myId = store.getState().userData?.data?._id;
//   if (!myId) return {oppId: '', myId: ''};
//   const ids = roomId?.split('-');
//   const oppId = ids?.filter(id => id != myId);
//   return {oppId: oppId[0], myId};
// };

export const chatCollectionByRoomID = (roomId: string) => {
  return firebase
    .firestore()
    .collection('Rooms')
    .doc(roomId)
    .collection('Chat');
};

export const onSend = (mess: messageType, roomId: string) => {
  chatCollectionByRoomID(roomId)
    .doc(mess.msgId)
    .set({...mess});
  // ids.forEach(id => {
  //   const oppId = ids.find(i => i != id);
  //   userByID(id)
  //     .get()
  //     .then(res => {
  //       const data = res.data()?.chatsIds as string[];
  //       const ids = data?.filter(i => i != oppId) || [];
  //       ids.unshift(oppId as string);
  //       userCollection()
  //         .doc(id)
  //         .update({
  //           chatsIds: ids,
  //         })
  //         .catch(er => {
  //           console.log(er);
  //         });
  //     })
  //     .catch(er => {
  //       console.log(er);
  //     });
  // });
};
