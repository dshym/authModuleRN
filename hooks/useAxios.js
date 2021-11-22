import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import * as authActions from '../store/actions/auth';

const baseURL = 'https://site.ualegion.com/api/v1/';

const useAxios = () => {
  const expirationDate = useSelector(state => state.expirationDate);
  const userData = useSelector(state => state.userData);
  const dispatch = useDispatch();

  const axiosInstance = axios.create({
    baseURL,
    headers: {Authorization: 'Bearer'},
  });

  axiosInstance.interceptors.request.use(async req => {
    if (expirationDate) {
      if (expirationDate.getTime() < new Date().getTime()) {
        if (userData) {
          dispatch(authActions.login(userData.email, userData.password));
        }
      }
    }
    return req;
  });
  return axiosInstance;
};

export default useAxios;
