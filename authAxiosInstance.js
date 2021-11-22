import axios from 'axios';

const baseURL = 'https://site.ualegion.com/api/v1/';

const authAxiosInstance = axios.create({
  baseURL,
  headers: {Authorization: 'Bearer'},
});

export default authAxiosInstance;
