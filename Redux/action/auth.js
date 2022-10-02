export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const login = data => {
    // console.log(data);
  return  {
      type: LOGIN,
      data : data
    }
  
};