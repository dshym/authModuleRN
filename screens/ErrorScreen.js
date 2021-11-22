import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const ErrorScreen = ({error}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <Text>{JSON.stringify(error)}</Text>
      <TouchableOpacity
        style={styles.screen}
        onPress={() => navigation.navigate('Auth')}>
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
