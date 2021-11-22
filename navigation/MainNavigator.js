import React from 'react';
import {TouchableOpacity, Dimensions} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useSelector} from 'react-redux';

import AuthScreen from '../screens/AuthScreen';
import LogoutScreen from '../screens/LogoutScreen';
import ErrorScreen from '../screens/ErrorScreen';
import Icon from 'react-native-vector-icons/AntDesign';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const state = useSelector(state => state);

  return (
    <Stack.Navigator>
      {state.token == null ? (
        <>
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{
              headerLeft: () => (
                <TouchableOpacity>
                  <Icon
                    name="arrowleft"
                    size={SCREEN_HEIGHT < 600 ? 20 : 30}
                    color="#17c1ff"
                  />
                </TouchableOpacity>
              ),
              title: '',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name="Error"
            component={ErrorScreen}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <Stack.Screen
          name="Logout"
          component={LogoutScreen}
          options={{headerShown: false}}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
