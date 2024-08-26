import Toast from 'react-native-simple-toast';
import axios from 'axios';
// import ProgressDialog from '../Components/Common/Loader/ProgressDIalog';
import ProgressDialog from '../../components/Modals/ProgressDIalog';
import {store} from '../../Store/Store';
import {CheckNet} from '../../Services/Validations';
import {logOut} from '../../Store/Data/Auth/AuthSlice';
import {Api} from '../../Apis/Services/BaseApiService';
import {API_BASE_URL} from '../../Apis/Services/BaseUrl';
import Colors from '../../constants/Colors';

export const METHODS = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const apiWithToken = async (
  endpoint: string,
  method: keyof typeof METHODS,
  data: any,
  hideLoader = false,
  isRaw = true,
  customToken = '',
  imgs = {name: '', data: []},
  customHeader = {},
  showToast = true,
  signal?: AbortSignal,
) => {
  return new Promise(
    async (resolve: (arg0: any) => void, reject: () => any) => {
      if (await CheckNet()) return reject();
      else {
        const token = store.getState().userData.token;

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
          if (imgs.data.length != 0) {
            imgs.data.forEach((element: {uri: string}, index) => {
              console.log(element.uri, 'sd');
              param.append(imgs.name, {
                uri: element.uri,
                type: 'image/jpg',
                name: 'image.jpg',
                filename: `image-${index}.jpg`,
              });
            });
          }
          !hideLoader && ProgressDialog.show();
          console.log(data);
          const response = await axios({
            url: API_BASE_URL + endpoint,
            method,
            data: param,
            signal,
            headers: {
              'Content-Type': isRaw
                ? 'application/json'
                : 'multipart/form-data',
              Authorization: token,
            },
          });

          if (
            response?.data?.status != 1 &&
            response?.data?.status != undefined &&
            response?.data?.status == 0
          ) {
            ErrorHandling(response, reject, showToast);
          } else {
            setTimeout(() => {
              showToast &&
                Toast.show(response?.data?.message ?? '', Toast.SHORT, {
                  backgroundColor: Colors.green,
                  textColor: '#fff',
                  tapToDismissEnabled: true,
                });
            }, 500);
            resolve(response?.data);
          }
          ProgressDialog.hide();
        } catch (error: any) {
          if (error?.response?.data?.code == 401) {
            store.dispatch(logOut());
          }
          ProgressDialog.hide();
          ErrorHandling(error?.response, reject, showToast);
        }
      }
    },
  );
};
const ErrorHandling = (error: any, reject: any, showToast = true) => {
  setTimeout(() => {
    // console.log(error?.data?.message);
    showToast &&
      Toast.show(error?.data?.message ?? 'Something went wrong!', Toast.SHORT, {
        backgroundColor: Colors.green,
        textColor: '#fff',
        tapToDismissEnabled: true,
      });
  }, 500);
  reject(error);
};

export const getApi = (endpoint: any, BASEURL = API_BASE_URL) => {
  return new Promise(async (resolve, reject) => {
    const token = store.getState().userData.token;
    try {
      if (await CheckNet()) return reject();
      await axios({
        url: BASEURL + endpoint,
        method: METHODS.GET,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }).then(response => {
        if (response.data?.status != 1 && response.data?.status != undefined) {
          ErrorHandling(response, reject);
        } else {
          resolve(response.data);
        }
      });
    } catch (error: any) {
      // ErrorHandling(error?.response, reject);
    }
  });
};
export const postApi = (endpoint: any, BASEURL = API_BASE_URL) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (await CheckNet()) return reject();
      await axios({
        url: BASEURL + endpoint,
        method: METHODS.POST,
      }).then(response => {
        if (response.data?.status != 1 && response.data?.status != undefined) {
          ErrorHandling(response, reject);
        } else {
          resolve(response.data);
        }
      });
    } catch (error: any) {
      ErrorHandling(error?.response, reject);
    }
  });
};

export const apiWithoutToast = async (
  endpoint: string,
  method: string,
  data: any,
  hideLoader = false,
  isRaw = false,
  imgs = {name: '', data: []},
) => {
  return new Promise(
    async (resolve: (arg0: any) => void, reject: () => any) => {
      if (await CheckNet()) return reject();
      else {
        const token = Api.getToken();
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
          if (imgs.data.length != 0) {
            imgs.data.forEach((element: {uri: string}, index) => {
              param.append(imgs.name, {
                uri: element.uri,
                type: 'image/jpeg',
                name: 'image.jpg',
              });
            });
          }
          !hideLoader && ProgressDialog.show();
          const response = await axios({
            url: API_BASE_URL + endpoint,
            method,
            data: param,
            headers: {
              'Content-Type': isRaw
                ? 'application/json'
                : 'multipart/form-data',
              Authorization: token,
            },
          });
          if (
            response?.data?.status != 1 &&
            response?.data?.status != undefined &&
            response?.data?.status != 0
          ) {
            ErrorHandling(response, reject);
          } else {
            resolve(response?.data);
          }
          ProgressDialog.hide();
        } catch (error: any) {
          ProgressDialog.hide();
          ErrorHandling(error?.response, reject);
        }
      }
    },
  );
};
