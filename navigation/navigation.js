import * as React from 'react';
import { Button, View ,Image, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {useSelector} from 'react-redux';

import Dashboard from '../Screen/dashboard';
import SessionRequest from '../Screen/SessionRequest';
import Payment from '../Screen/Payment'
import History from '../Screen/History'
import Setting from '../Screen/Setting';
import UpcommingSession from '../Screen/UpcommingSession'
import { SimpleLineIcons,AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../Screen/login';
import Signup from '../Screen/signup';
import Forgotpassword from '../Screen/forgotpassword';
import Profile from '../Screen/Profile';


  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();


  const StackNavigation = () =>{

    return (
      <Stack.Navigator     
      screenOptions={{
        // title: 'My home',
        headerLeft: () => <></>,
        headerTitle: (props) => ( // App Logo
        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',padding:'5%'}}>
          {/* {console.log(props)} */}
        
          <Image
          style={{ width: 60, height: 50 }}
          source={require('../assets/download.png')}
           resizeMode='contain'
        />
        <Text style={{color:'#0056B3',fontSize:20}}>tutorlancer</Text>
        </View>
        
      ),
        headerStyle: {
          backgroundColor: 'white',
          shadowColor: '#171717',
          shadowOffset: {width: -2, height: 4},
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation:5
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>



      <Stack.Screen name="Login"   component={Login}  />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
    </Stack.Navigator>

    )
  }
  
  const DrawerNavigation =()=> {
    return (
      
        <Drawer.Navigator initialRouteName="Dashboard">
          <Drawer.Screen name="Dashboard" component={Dashboard} options={{
            title:"Dashboard",
            drawerIcon:({focused,size}) => (
              <SimpleLineIcons name="home" size={20} color="black" />
            )
          }} />
          
          <Drawer.Screen name="SessionRequest" component={SessionRequest}  options={{
            title:"SessionRequest",
            drawerIcon:({focused,size}) => (
             <AntDesign name="menuunfold" size={20} color="black" /> 
            )
          }}  />
          <Drawer.Screen name="History" component={History} options={{
            title:"History",
            drawerIcon:({focused,size}) => (
              <MaterialIcons name="history" size={22} color="black" />
            )
          }}  />

          <Drawer.Screen name='UpcommingSession' component={UpcommingSession}
          options={{
            title:"UpcommingSession",
            drawerIcon:({focused,size}) => (
              <FontAwesome5 name="chalkboard-teacher" size={20} color="black" />
            )
          }}
          
          />
          <Drawer.Screen name="Payment" component={Payment} />
         
          <Drawer.Screen name='Setting' component={Setting} />
          <Drawer.Screen name='Profile' component={Profile} />
        </Drawer.Navigator>
      
    );
  }

  const MainNavigation = () =>{

   const data = useSelector(state => state.auth.data);
   if(data)
   console.log('MAIN-->',data.accessToken)
    return  data && data.accessToken?<DrawerNavigation /> :<StackNavigation/>;
  }

  export default MainNavigation;