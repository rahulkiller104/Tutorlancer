import { LOGIN, SIGNUP,SET_TOKEN } from "../action/auth";

const initailValue = {
    data:null,
    accessToken:null,
    refreshToken:null
  };


  export default (state = initailValue, action) => {
    console.log(action.data, 'CANDIDATE');
    switch (action.type) {
      case LOGIN:
        return {
          ...state,
          data : action.data,
        }

       case SET_TOKEN:
        return{
         ...state,
         accessToken:action.data.accessToken,
         refreshToken:action.data.refreshToken
         }


      default:
        return state;
    }
  };