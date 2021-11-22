import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';

const LogoutScreen = () => {
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => dispatch(authActions.logout())}>
        <Text style={styles.text}>Вихід</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  button: {
    width: '40%',
    alignItems: 'center',
    backgroundColor: 'tomato',
    padding: 10,
    borderRadius: 20,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
});

export default LogoutScreen;
