import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '67654163832-gtul3bna8hrgj7431kgi7c5gdlsg91hk.apps.googleusercontent.com',
  offlineAccess: true, // enables refresh token
});

export const signInWithGoogle = async (): Promise<string> => {
  try {
    await GoogleSignin.hasPlayServices();
    
    // Sign in and get user info
    const userInfo = await GoogleSignin.signIn();

    // Extract the idToken
    const idToken = userInfo.idToken;

    if (!idToken) throw new Error('No ID token returned from Google Sign-In');

    // Return token for backend
    return idToken;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled login');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign in in progress');
    } else {
      console.error('Google Sign-In error:', error);
    }
    throw error;
  }
};
