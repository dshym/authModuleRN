import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity, //as alternative we can use Pressable
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';

import {styles} from './AuthScreenStyles';

import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {WebClientId} from '@env';

import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

import Divider from '../components/Divider';
import AuthForm from '../components/AuthForm';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

GoogleSignin.configure({
  webClientId: WebClientId,
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
        Alert.alert(
          'Помилка при отриманні токену',
          `${JSON.stringify(error)}`,
          [{text: 'OK', onPress: () => {}}],
        );
        //throw new Error('Failed to fetch token');
      }
    }
  };

  const signinWithGoogle = async () => {
    try {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      Alert.alert('Помилка', `${JSON.stringify(error)}`, [
        {text: 'OK', onPress: () => {}},
      ]);
      //throw new Error('Failed to sign in with Google');
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

export default AuthScreen;
