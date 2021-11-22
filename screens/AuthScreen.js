import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity, //as alternative we can use Pressable
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {firebaseConfig} from '../firebaseConfig';

import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

import Divider from '../components/Divider';
import AuthForm from '../components/AuthForm';

//use useWindowDimensions hook or addListener, for handling landscape mode
//not implemented due to task specifications (was not required)
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

GoogleSignin.configure({
  webClientId: firebaseConfig.webClientId,
});

const AuthScreen = () => {
  const dispatch = useDispatch();

  const onAuthStateChanged = async user => {
    if (user) {
      const userData = {
        email: user.email,
        password: '',
      };
      try {
        const idTokenResult = await auth().currentUser.getIdTokenResult();
        const expirationDate = new Date(idTokenResult.expirationTime);
        dispatch(
          authActions.authenticate(
            idTokenResult.token,
            expirationDate,
            userData,
          ),
        );
      } catch (error) {
        throw new Error('Failed to fetch token');
      }
    }
  };

  const signinWithGoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      throw new Error('Failed to sign in with Google');
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.screen}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={-SCREEN_HEIGHT / 4}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Увійдіть</Text>
            <Text style={styles.title}>щоб продовжити</Text>
          </View>
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.facebookButton}>
              <Text style={styles.facebookText}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={signinWithGoogle}>
              <Text style={styles.googleText}>Google</Text>
            </TouchableOpacity>
          </View>
          <Divider>або</Divider>
          <AuthForm />
        </KeyboardAvoidingView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: 'black',
    fontSize: SCREEN_WIDTH / 12,
    fontWeight: '700',
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: SCREEN_HEIGHT < 600 ? 20 : 50,
  },
  facebookButton: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
  },
  facebookText: {
    color: 'white',
  },
  googleButton: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d4d4d4',
    padding: 10,
    borderRadius: 5,
  },
  googleText: {
    color: '#595959',
  },
});

export default AuthScreen;
