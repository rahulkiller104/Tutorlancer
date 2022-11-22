export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const SET_TOKEN = "SET_TOKEN"

export const login = data => {
    // console.log(data);
  return  {
      type: LOGIN,
      data : data
    }
  
};

export const setTokens = data =>{
  console.log('TOKEN-DATA-->' ,{
    accessToken:data.accessToken,
    refreshToken:data.refreshToken
  })
  return {
    type:SET_TOKEN,
    data:{
      accessToken:data.accessToken,
      refreshToken:data.refreshToken
    }
  }
}