import { LOGIN, SIGNUP } from "../action/auth";

const initailValue = {
    data:null
  };


  export default (state = initailValue, action) => {
    // console.log(action.data, 'CANDIDATE');
    switch (action.type) {
      case LOGIN:
        return {
          data : action.data
        }

      default:
        return state;
    }
  };