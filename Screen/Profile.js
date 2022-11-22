import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector ,useDispatch } from 'react-redux';

import * as authAction from '../Redux/action/auth'
// import { CallingCodePicker } from "@digieggs/rn-country-code-picker";
import axios from 'axios';;
import Toast from 'react-native-toast-message';


const Profile = (props) => {

  //  const tags = [
  //   'Geotechnical Engineering',
  //  'Geology',
  //  'Soil Meachnics',
  //  'Analog Circuit',
  //  'Network Analysis'
  //  ]
  const dispatch = useDispatch();
   const [name , setName] = useState();
   const [email , setEmail] = useState();
   const [fbUserName , setFbUserName] = useState(null);
   const [whatsapp , setWhatsapp] = useState();
   const [university , setUniversity] = useState();
   const [country , setCountry] = useState();
   const [city , setCity] = useState();
   const [writer , setWriter] = useState();
   const [department , setDepartment] = useState();
   const [profImage ,setProfImage] = useState();
   const [data , setData] = useState();
   const [numberIsValid , setNumberIsValid] = useState(false);

   const id = useSelector(state => state.auth.data.saveTutor.tutor_id);
   const refresh_token = useSelector(state => state.auth.refreshToken);
   const accessToken = useSelector(state => state.auth.accessToken)
  //  console.log("TOKEN" ,refresh_token)
  const userData = useSelector(state => state.auth.data.saveTutor)
  //  console.log("DATA" , userData)

   const whatsappValidator = async() =>{

       const whatsFunc = await axios.post("https://dev6apis.el.r.appspot.com/api/conversations/contactValidation",{wa_id:whatsapp})
        if (whatsFunc.data.contacts.length && whatsFunc.data.contacts[0].status==="valid"){
        console.log('valid hai bhai')
        setNumberIsValid(prev => true) //if contact number is valid
        }
        else{
          console.log('valid ni hai bhai')
          setNumberIsValid(prev =>false) // if contact no. is not valid
        }
   }

   useEffect(() => {
    axios.get(`https://dev6apis.el.r.appspot.com/api/tutorweb/getTutorDetails/${id}`)
    .then(res => {
      setData(res.data);
      setName(res.data.name);
      setEmail(res.data.email)
      setWhatsapp(res.data.wa_id)
      // console.log("DATA",res.data)

    });
   },[]);



   
   
  const onSubmit = async() =>{
     
   await whatsappValidator()  // validate whatsapp number
   
   
    if(whatsapp.length != 10 && numberIsValid){
      console.log()
      Alert.alert('WhatsApp is Invalid');
      return;
    }
     

    let postData = {
      tutor_id: id,
      name: name,
      email: email,
      dateOfBirth: "12/03/2000",
      dept: department,
      university: university,
      socialmedia: fbUserName,
      countryCode: '+91',
      watsNumber: whatsapp,
      country: country,
      city: city,
      writer: writer.length != 0
    }

     console.log(postData);
 
    if (accessToken && !refresh_token) {
      const response = await axios.post(`https://dev6apis.el.r.appspot.com/api/sessions/private/updateTutorAccount`, postData, {
        headers: { "x-auth-token": accessToken },
      });
      console.log('RES1-->',response)
    } else if ( refresh_token) {
      let payload = {
        token: refresh_token,
      };

      let responseData;
      try {
        responseData = await axios.post(
          `https://dev6apis.el.r.appspot.com/api/auth/refresh`,
          payload
        );

        console.log("RES2",responseData.data);
        if (accessToken) {
          dispatch(authAction.setTokens(responseData.data))
        }
      } catch (err) {
        console.log(err);
      }
   
      try{
        console.log("NEW TOKEN" , responseData.data.accessToken)
        const res = await axios.post(`https://dev6apis.el.r.appspot.com/api/sessions/private/updateTutorAccount`, postData, {
        headers: { "x-auth-token": responseData.data.accessToken},
      });
      console.log("RESPONSE" ,res.data)

      }catch(err){
        console.log("ERROR",err)
      }
  

    } else {
    const res = await axios.post(`https://dev6apis.el.r.appspot.com/api/sessions/private/updateTutorAccount`, postData, {
        headers: {},
      });
    }
  
    

    }

   
    // console.log(postData);
    // console.log("REFRESH-TOKEN--> ",refresh_token);

  



  // const response = await  axios.post(
  //     ` https://dev6apis.el.r.appspot.com/api/sessions/private/updateTutorAccount`,
  //     postData,
  //     {
  //       headers: {},
  //     }
  //   );
    
    // console.log(response.data);
  

  return (
    <View style={styles.dashboard}>
      <Header props={props} />

      <ScrollView showsVerticalScrollIndicator={false}>

      <View><Text style={{fontSize:22}}>Account</Text></View>

      <View style={[styles.card,styles.shadowProp ,{alignItems:'center'}]}>
          <View>
            <Image  source={require('../assets/profile.webp')} resizeMode='contain' style={styles.profImage} />
          </View>

          <View>
            <Text style={{fontWeight:'600', marginVertical:'1%'}}>{name}</Text>
          </View>

          <View>
            <Text style={{marginVertical:"2%"}}>{email}</Text>
          </View>

          <View style={styles.line}></View>
          
          <TouchableOpacity>
            <Text style={{color:'#5048E5', fontWeight:'500'}}>UPLOAD PICTURE</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles.card,styles.shadowProp]}>
        <View style={{flexDirection:'row' , flexWrap:'wrap'}}>
        <Text style={{fontWeight:'600'}}>Add Tag : </Text>
        {data && data.tags.map(tag => (
          <View key={tag} style={styles.tag}> 
            <Text style={{color:'white',fontSize:12}} >{tag}</Text>
          </View>
        ))}
        </View>
       
      </View>

      <View style={[styles.card,styles.shadowProp]}>

      <Text style={{fontSize:18}}>Profile:</Text>
      <Text>This Information can be edited</Text>
      <View style={styles.line}></View>
      
      <TextInput 
      style={{marginBottom:'2%'}}
      mode="outlined"
      label="Full Name"
      placeholder="Enter Your Name" 
      value={name}
      onChangeText={input => setName(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Email Adress"
      placeholder="Enter Your Email" 
      value={email}
      editable={false}
      onChangeText={input => setEmail(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Facebook Username"
      placeholder="Facebook Username" 
      value={fbUserName}
      onChangeText={input => setFbUserName(input)}
    />
     {/* <CallingCodePicker onValueChange={() => {}} /> */}
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Whatsapp Number"
      placeholder="Whatsapp Number" 
      keyboardType="number-pad"
      editable={false}
      value={whatsapp}
      onChangeText={input => {
        setWhatsapp(input) ;
         setNumberIsValid(false)
        }}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="University"
      placeholder="Enter Your University Name" 
      value={university}
      onChangeText={input => setUniversity(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Country"
      placeholder="Country Name" 
      value={country}
      onChangeText={input => setCountry(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="City"
      placeholder="City Name" 
      value={city}
      onChangeText={input => setCity(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Writer"
      placeholder="Writer Name" 
      value={writer}
      onChangeText={input => setWriter(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Department"
      placeholder="Department Name" 
      value={department}
      onChangeText={input => setDepartment(input)}
    />

         <TouchableOpacity style={{alignItems:'center'}} onPress={onSubmit} >
            <Text style={{color:'#5048E5', fontWeight:'500',marginTop:'10%'}}>SAVE DETAILS</Text>
          </TouchableOpacity>

      </View>

      </ScrollView>
  
    </View>
  )
}


const styles = StyleSheet.create({

  dashboard:{
    flex:1,
    marginHorizontal:'3%'
  },
  profImage:{
    width:80,
    height:80,
    borderRadius:40,
  },
   
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 10,
    borderRadius:10,
    // alignItems:'center'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:5
  },
  line:{width:'100%' ,marginVertical:'5%',borderBottomColor:'grey', borderBottomWidth:1},
  tag:{
    padding:'2%',
    backgroundColor:'#5048E5',
    borderRadius:12,
    marginHorizontal:'2%',
    marginVertical:'1%'
  }
 

})
export default Profile;

