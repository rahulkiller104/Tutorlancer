import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View ,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { Dimensions , KeyboardAvoidingView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';

import * as authAction from '../Redux/action/auth'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const Login = ({ navigation}) => {

  const [email ,setEmail] = useState('');
  const [password ,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [data ,setData] = useState(null);

  const dispatch = useDispatch();

  const onLogin = () =>{
  console.log('LOGIN-->',email.toLowerCase(),password)
  setLoading(true);
  axios.post('https://device6chatapi.el.r.appspot.com/api/auth/tutorLogin',{
    email:email.toLowerCase(),
    password:password
  })
  .then(data => {
    setData(data.data);
    // console.log(data.data);
    dispatch(authAction.login(data.data))
  }
  
    )
  .catch(err => console.log(err))
  .finally(e=>setLoading(false));


  }

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <ScrollView>
    <View style={{justifyContent:'center',marginHorizontal:'2%',backgroundColor:'white',paddingBottom:windowHeight * 0.02}} >
      <Image source={{uri:'https://thetutorlancer.com/static/media/login.3717c358e790aef2d5bb.png'}} style={{width:windowHeight*.5,height:windowHeight*.5 , resizeMode:'contain'}} />
      {/* <Button onPress={()=>props.navigation.navigate('Signup')}  title="Go to signUp"/> */}
     
     <View style={styles.loginBox}>
      <Text style={styles.header}>Sign In</Text> 
     </View>
     <View style={styles.inputBox}>
      <View>
        <Text style={{padding:10}}>Email Adress</Text>
        <TextInput 
          placeholder='enter your email'
          keyboardType='email-address'
          style={styles.input} 
          value={email}
          onChangeText = {text => setEmail(text)}
          />
      </View>
      <View>
        <Text style={{padding:10}}>Password</Text>
        <TextInput 
        placeholder='enter your password' 
        secureTextEntry={true}  
        style={styles.input} 
        value={password}
        onChangeText = {text => setPassword(text)}
        />
      </View>

      <View style={{flexDirection:'row' , justifyContent:'space-between',alignItems:'center',margin:'5%'}}>
       <TouchableOpacity  onPress={onLogin} style={styles.button}>
        <Text style={styles.buttonText}>{loading ?<ActivityIndicator  color="white"/> : "Sign In"}</Text>
       </TouchableOpacity>
       <TouchableOpacity  onPress={()=>navigation.navigate('Forgotpassword')}>
        <Text style={styles.forgot}>Forgot Password?</Text>
       </TouchableOpacity>
      </View>

   <View style={{flexDirection:'row',marginHorizontal:'5%'}}>
      <Text style={{color:'#677294'}}>Don't have a account? </Text>
     <TouchableOpacity onPress={()=> navigation.navigate('Signup')}>
      <Text style={styles.forgot}>Sign Up</Text>
     </TouchableOpacity>
      </View>
      
    </View>
    </View>
   
    </ScrollView>
    // {/* // </KeyboardAvoidingView> */}
  )
}

export default Login

const styles = StyleSheet.create({
  header:{
    fontWeight:'500',
    fontSize:20,
  },
  loginBox:{
   margin:'5%'
  },
  input: {
    paddingHorizontal:windowWidth * 0.05,
    paddingVertical:windowHeight * 0.015,
    backgroundColor:'#E8F0FE',
    borderRadius: 5,
    textAlignVertical: "top",
    marginTop: '1%',
    fontSize:15
  },
  inputBox:{
    marginHorizontal:windowWidth * 0.02,
    marginVertical:windowHeight * 0.01
  },
  button:{
    backgroundColor:'#5E2CED',
    width:120,
    height:50,
    borderRadius:5,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:'5%'

  },
  buttonText:{
    color:'white',
    fontWeight:'500'
  },
  forgot:{
    color:'#007BFF'
  }

})