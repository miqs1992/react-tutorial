import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-14bff.firebaseio.com/'
});

export default instance;