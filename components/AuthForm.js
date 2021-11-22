import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';
import {validateEmail} from '../utils/validateEmail';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (!validateEmail(email)) {
      Alert.alert(
        'Неправильна поштова скринька',
        'Формат поштової скриньки: example@example.com',
        [{text: 'OK', onPress: () => setEmail('')}],
      );
      return;
    }
    if (password.trim().length < 5) {
      Alert.alert('Короткий пароль', 'Мінімальна довжина паролю 5 знаків', [
        {text: 'OK', onPress: () => setPassword('')},
      ]);
      return;
    }
    dispatch(authActions.login(email, password));
  };

  if (error) {
    Alert.alert('Помилка', `${error.message}`, [
      {text: 'OK', onPress: () => dispatch(authActions.setError(null))},
    ]);
  }

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Поштова скринька"
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Пароль"
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.forgotPasswordContainer}>
        <Text style={styles.forgotPasswordText}>Забули пароль?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={submitHandler}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.submitText}>Увійти</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 0,
  },
  input: {
    width: '90%',
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
    marginTop: SCREEN_HEIGHT < 600 ? 10 : 20,
  },
  forgotPasswordContainer: {
    flex: 1,
    margin: SCREEN_HEIGHT < 600 ? 10 : 20,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#17c1ff',
    fontWeight: '700',
  },
  submitButton: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#17c1ff',
    padding: 15,
    borderRadius: 30,
    margin: SCREEN_HEIGHT < 600 ? 10 : 30,
  },
  submitText: {
    color: 'white',
    fontWeight: '700',
  },
});

export default AuthForm;
