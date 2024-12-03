import Toast from 'react-native-simple-toast';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import {store} from '../../Store/Store';
import {logOut} from '../../Store/Data/Auth/AuthSlice';
// import {BASE_URL, IMG_URL} from '@env';
import LoadingIndicator from '../../comman/LoadingIndicator';
import {API_BASE_URL, IMAGE_URL} from '../../Apis/Services/BaseUrl';

export const imgSrc = (imgsrc?: string) => {
  return `${IMAGE_URL}/${imgsrc}`;
};

export const METHODS = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};
export type ImageFormData = {
  name: string;
  data?: {uri?: string; type?: string}[];
}[];
export const apiWithToken = async (
  endpoint: string,
  method: keyof typeof METHODS,
  data: any,
  hideLoader = false,
  isRaw = true,
  customToken = '',
  imgs = [{name: '', data: []}] as ImageFormData,
  showMessage = false,
) => {
  return new Promise(
    async (resolve: (arg0: any) => void, reject: (arg0: any) => any) => {
      console.log(
        API_BASE_URL + endpoint,
        '\n------------------------params-----------------------------------',
      );
      if (await CheckNet()) return reject(false);
      else {
        const token = customToken || store?.getState()?.userData?.token;
        try {
          let param = new FormData();
          if (!isRaw) {
            for (const key in data) {
              if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                param.append(key, element);
              }
            }
          } else {
            param = data as FormData;
          }
          {
            imgs.map((item, index) => {
              if (item?.data?.length != 0) {
                item?.data?.forEach(
                  (element: {uri?: string; type?: string}, index) => {
                    param.append(item.name, {
                      uri: element.uri,
                      type: element?.type ? element?.type : 'image/jpeg',
                      name: element?.type
                        ? element.type.replace('/', '.')
                        : 'image.jpg',
                    });
                  },
                );
              }
            });
          }
          !hideLoader && LoadingIndicator.show();
          let requestData: any = {
            url: API_BASE_URL + endpoint,
            method,
            headers: {
              'Content-Type': isRaw
                ? 'application/json'
                : 'multipart/form-data',
              Authentication: token,
            },
          };
          if (param) {
            requestData.data = param;
          }

          console.log(JSON.stringify(requestData.data || requestData.params));
          console.log('-----------------------------------------------');
          console.log(requestData.headers);
          const response: any = await axios(requestData);
          if (
            response?.data?.status != 1 &&
            response?.data?.status != undefined &&
            response?.data?.status == 0
          ) {
            ErrorHandling(response, reject);
          } else {
            if (showMessage) {
              setTimeout(() => {
                Toast.show(response?.data?.message ?? '', Toast.SHORT);
              }, 500);
            }
            console.log('------------------ Response -------------------');
            console.log(
              endpoint + '\n Response',
              JSON.stringify(response.data.data || response.data),
            );
            console.log('---------------------------------------------');
            resolve(response?.data);
          }
          LoadingIndicator.hide();
        } catch (error: any) {
          reject(error);
          console.log('<<<<<<<<<<------- ERROR ------->>>>>>>>>>>>>>>>');
          console.log(
            endpoint + '\n ERROR',
            error?.response ||
              error?.response?.message ||
              error?.message ||
              error,
          );
          console.log('---------------------------------------------');
          // console.log(`Api Fails ${BASE_URL+endpoint}\n`, error?.response?.message || error?.message || error);
          if (error?.response?.status == 401) {
            store.dispatch(logOut());
          }
          LoadingIndicator.hide();
          ErrorHandling(error?.response, reject);
        }
      }
    },
  );
};

const ErrorHandling = (error: any, reject: any, showToast?: boolean) => {
  if (error?.data?.message) {
    setTimeout(() => {
      if (showToast == false) {
      } else {
        Toast.show(
          error?.data?.message ?? 'Something went wrong!',
          Toast.SHORT,
        );
      }
    }, 500);
  }
  reject(error);
};

const CheckNet = async () => {
  const state = await NetInfo.fetch();
  if (state.isConnected) return false;
  else {
    Toast.show('Check Your Internet Connection', Toast.SHORT);
    return true;
  }
};
