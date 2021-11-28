import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import ErrorBoundary from './errorBoundaries/ErrorBoundary';
import authReducer from './store/reducers/auth';

const store = createStore(authReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor="#fff" />
      <Provider store={store}>
        <NavigationContainer>
          <ErrorBoundary>
            <MainNavigator />
          </ErrorBoundary>
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default App;
