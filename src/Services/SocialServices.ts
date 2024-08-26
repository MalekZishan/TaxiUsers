import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { navigate } from './NavigationService';
import { store } from '../Store/Store';
import ProgressDialog from '../components/Modals/ProgressDIalog';
import appleAuth from '@invertase/react-native-apple-authentication';

export const googleLogin = async () => {
ProgressDialog.show()
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('🚀 ~ googleLogin ~ userInfo:', userInfo);
    
    
  } catch (error: any) {
    console.log('🚀 ~ googleLogin ~ error:', error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
ProgressDialog.hide();

      return error;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log(error);
ProgressDialog.hide();

      return error;
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log(error);
ProgressDialog.hide();

      return error;
      // play services not available or outdated
    } else {
      console.log(error, 'error');
ProgressDialog.hide();

      return error;
      // some other error happened
    }
  }
};
export const onAppleButtonPress = async () => {
  // performs login request
  const appleAuthRequestResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });
  console.log(appleAuthRequestResponse);
  ProgressDialog.show();
  // console.log('🚀 ~ googleLogin ~ userInfo:', userInfo);
  

}