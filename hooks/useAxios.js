import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';
import auth from '@react-native-firebase/auth';

const baseURL = 'https://site.ualegion.com/api/v1/';

const useAxios = () => {
  const {expirationDate, userData, token} = useSelector(state => state);

  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: 'Bearer'},
  });

  axiosInstance.interceptors.request.use(async req => {
    if (expirationDate) {
      console.log('interceptor');

      if (expirationDate.getTime() < new Date().getTime()) {
        //additionally we can add redux state to handle auth method
        if (userData.password && userData.email) {
          dispatch(authActions.login(userData.email, userData.password));
        } else {
          console.log('google auth');

          try {
            //due to firebase documentation: Returns the current token if it has not expired.
            //Otherwise, this will refresh the token and return a new one.
            const token = await auth().currentUser.getIdToken(true);
            dispatch(authActions.refreshToken(token));
          } catch (error) {
            throw new Error('Falied to refresh token');
          }
        }
      }
    }
    return req;
  });
  return axiosInstance;
};

export default useAxios;
