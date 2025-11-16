import { Platform } from 'react-native';

let appleAuth: any;

if (Platform.OS === 'ios') {
  try {
    appleAuth = require('@invertase/react-native-apple-authentication').default;
  } catch (e) {
    console.warn('Apple Authentication not available');
  }
}

export const signInWithApple = async () => {
  if (!appleAuth) {
    throw new Error('Apple Sign-In is only available on iOS devices');
  }

  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    const { identityToken, user } = appleAuthRequestResponse;

    if (!identityToken) throw new Error('Apple Sign-In failed - no token returned');

    return { identityToken, user };
  } catch (error) {
    console.error('Apple Sign-In error:', error);
    throw error;
  }
};