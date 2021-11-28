import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  button: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
  },
});

export default ErrorScreen;
