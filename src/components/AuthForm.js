import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {Formik} from 'formik';

import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';
import {validateEmail} from '../utils/validateEmail';

import {styles} from './AuthFormStyles';

const AuthForm = () => {
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const loading = useSelector(state => state.loading);
  const error = useSelector(state => state.error);

  const secondInputRef = useRef();

  const dispatch = useDispatch();

  const submitHandler = ({email, password}) => {
    if (!validateEmail(email)) {
      setBadEmail(true);
      return;
    }
    if (password.trim().length < 5) {
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
    <Formik
      initialValues={{email: '', password: ''}}
      onSubmit={values => {
        submitHandler(values);
      }}>
      {({handleChange, handleSubmit, values}) => (
        <View style={styles.formContainer}>
          <TextInput
            style={[styles.input, badEmail ? styles.inpurError : null]}
            value={values.email}
            placeholder="Поштова скринька"
            onChangeText={handleChange('email')}
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
            value={values.password}
            placeholder="Пароль"
            onChangeText={handleChange('password')}
            onFocus={() => setBadPassword(false)}
            caretHidden={false}
            ref={secondInputRef}
          />
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Забули пароль?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.submitText}>Увійти</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default AuthForm;
