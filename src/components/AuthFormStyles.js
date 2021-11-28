import {StyleSheet, Dimensions} from 'react-native';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

export const styles = StyleSheet.create({
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
  inpurError: {
    borderBottomColor: '#ff9891',
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
