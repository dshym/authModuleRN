import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';
import {validateEmail} from '../utils/validateEmail';

import {styles} from './AuthFormStyles';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const secondInputRef = useRef();

  const dispatch = useDispatch();

  const submitHandler = () => {
    if (!validateEmail(email)) {
      setBadEmail(true);
      // Alert.alert(
      //   'Неправильна поштова скринька',
      //   'Формат поштової скриньки: example@example.com',
      //   [{text: 'OK', onPress: () => setEmail('')}],
      // );
      return;
    }
    if (password.trim().length < 5) {
      // Alert.alert('Короткий пароль', 'Мінімальна довжина паролю 5 знаків', [
      //   {text: 'OK', onPress: () => setPassword('')},
      // ]);
      setBadPassword(true);
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
        style={[styles.input, badEmail ? styles.inpurError : null]}
        value={email}
        placeholder="Поштова скринька"
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        caretHidden={false}
        returnKeyType="next"
        blurOnSubmit={false}
        onFocus={() => setBadEmail(false)}
        onSubmitEditing={() => {
          secondInputRef.current.focus();
        }}
      />
      <TextInput
        style={[styles.input, badPassword ? styles.inpurError : null]}
        value={password}
        placeholder="Пароль"
        onChangeText={text => setPassword(text)}
        onFocus={() => setBadPassword(false)}
        caretHidden={false}
        ref={secondInputRef}
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

export default AuthForm;
