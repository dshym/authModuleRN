import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {styles} from './LogoutScreenStyles';

import auth from '@react-native-firebase/auth';

import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const LogoutScreen = () => {
  const dispatch = useDispatch();

  const signOut = async () => {
    if (auth().currentUser) {
      try {
        await auth().signOut();
      } catch (error) {
        throw new Error('Failed to signOut');
      }
    }
    dispatch(authActions.logout());
  };

  return (
    <View style={styles.screen}>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.text}>Вихід</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutScreen;
