const ADM = {
  name: process.env.API_USER_ADM_NAME,
  email: process.env.API_USER_ADM_LOGIN,
  password: process.env.API_USER_ADM_SENHA,
};

const USER = {
  name: process.env.API_USER_NAME,
  email: process.env.API_USER_LOGIN,
  password: process.env.API_USER_SENHA,
};

export default {
  ADM,
  USER,
};
