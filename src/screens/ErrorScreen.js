import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {styles} from './ErrorScreenStyles';

import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const ErrorScreen = ({error}) => {
  const dispatch = useDispatch();

  const exitHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <View style={styles.screen}>
      <Text>An error accured: {JSON.stringify(error)}</Text>
      <TouchableOpacity style={styles.screen} onPress={exitHandler}>
        <Text>Перейти до авторизації</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;
