import axios from 'axios';
import {baseURL} from '@env';

const authAxiosInstance = axios.create({
  baseURL,
  headers: {Authorization: 'Bearer'},
});

export default authAxiosInstance;
