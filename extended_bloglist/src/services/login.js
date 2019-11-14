import axios from 'axios';

const LOGIN_URI = '/api/login'

const doLogin = (username, password) => {
  return new Promise((resolve, reject) => {
    axios.post(LOGIN_URI, { username, password })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      })
    })
};

const LoginService = {
  doLogin
}
export default LoginService;
