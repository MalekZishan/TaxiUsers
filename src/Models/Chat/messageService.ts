import {UsersTypes} from '../Auth/Auth.modal';

export type messageType = {
  senderId: string;
  receiverId: string;
  createdAt: number;
  isRead: boolean;
  msgId: string;
  message: string;
};
export interface ChatDetailType {
  roomId: string;
  chatsIds?: string[];
  lastTime?: string;
  fullname: string;
  image: string;
}
export type userType = UsersTypes & {
  chatsIds?: string[];
  lastTime?: string;
};
export type MessageListProps = {
  setData: React.Dispatch<React.SetStateAction<userType[]>>;
  index: number;
  item: userType;
};
