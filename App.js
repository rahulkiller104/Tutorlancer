import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from  './navigation/navigation'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import auth from './Redux/Reducer/auth'


const rootReducer = combineReducers({
  auth: auth
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  const Main = () =>{
    return (
      <NavigationContainer>
         <MainNavigation />
      </NavigationContainer>
    )
  }

  const App = () => {

    return (
       <Provider store={store} >
          <Main />
       </Provider>
       
      
    )
  }


  export default App;