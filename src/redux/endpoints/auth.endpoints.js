import { API_HOST, getHttpPostOptions } from './index';

const getLoginEndpoint = () => `${ API_HOST }/getLogin.php`;
export const getLoginRequest = ({ user }) => [
  getLoginEndpoint(),
  getHttpPostOptions(user)
];
