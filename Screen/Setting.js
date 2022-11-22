import { Button, Image, ScrollView, StyleSheet, Pressable,Text, View ,ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import { Dimensions , KeyboardAvoidingView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';

import * as authAction from "../Redux/action/auth"

import Header from '../components/Header';
import Toast  from 'react-native-toast-message';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect } from 'react';
import { set } from 'react-native-reanimated';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;




const Setting = (props) => {

const [tutorData , setTutorData] = useState();

const dispatch = useDispatch();


 const [email,setEmail] = useState('');
 const [loading,setLoading] = useState(false);
 const [showRegular ,setshowRegular] = useState(true)

 const [date, setDate] = useState(new Date());
 const [mode, setMode] = useState('date');
 const [show, setShow] = useState(false);




 const [SunDay1 , setSunday1] = useState(false);
 const [MonDay1 , setMonday1] = useState(false);
 const [TueDay1 , setTueday1] = useState(false);
 const [WedDay1 , setWedday1] = useState(false);
 const [ThrusDay1 , setThrusday1] = useState(false);
 const [FriDay1 , setFriday1] = useState(false);
 const [SatDay1 , setSatday1] = useState(false);


 const [SunDay2 , setSunday2] = useState(false);
 const [MonDay2 , setMonday2] = useState(false);
 const [TueDay2 , setTueday2] = useState(false);
 const [WedDay2 , setWedday2] = useState(false);
 const [ThrusDay2 , setThrusday2] = useState(false);
 const [FriDay2 , setFriday2] = useState(false);
 const [SatDay2 , setSatday2] = useState(false);

 const [isSunDay , setIsSunday] = useState(false);
 const [isMonDay , setIsMonday] = useState(false);
 const [isTueDay , setIsTueday] = useState(false);
 const [isWedDay , setIsWedday] = useState(false);
 const [isThrusDay , setIsThrusday] = useState(false);
 const [isFriDay , setIsFriday] = useState(false);
 const [isSatDay , setIsSatday] = useState(false);


 const [SunDayStart , setSundayStart] = useState(new Date());
 const [MonDayStart , setMondayStart] = useState(new Date());
 const [TueDayStart , setTuedayStart] = useState(new Date());
 const [WedDayStart , setWeddayStart] = useState(new Date());
 const [ThrusDayStart , setThrusdayStart] = useState(new Date());
 const [FriDayStart , setFridayStart] = useState(new Date());
 const [SatDayStart , setSatdayStart] = useState(new Date());

 const [SunDayEnd , setSundayEnd] = useState(new Date());
 const [MonDayEnd , setMondayEnd] = useState(new Date());
 const [TueDayEnd , setTuedayEnd] = useState(new Date());
 const [WedDayEnd , setWeddayEnd] = useState(new Date());
 const [ThrusDayEnd , setThrusdayEnd] = useState(new Date());
 const [FriDayEnd , setFridayEnd] = useState(new Date());
 const [SatDayEnd , setSatdayEnd] = useState(new Date());

 const[day1 ,setday1] = useState(false);
 const[day2 ,setday2] = useState(false);
 const[dayStart , setdayStart] = useState(new Date());
 const[dayEnd , setdayEnd] = useState(new Date());

 const [password ,setPassword] = useState();
 const [confrimPassword , setConfrimPassword] = useState();


 const id = useSelector(state => state.auth.data.saveTutor.tutor_id);
 console.log("ID-->",id)

 useEffect(() => {
  axios.get( `https://dev6apis.el.r.appspot.com/api/tutorweb/getTutorDetails/${id}`)
  .then(res => {
    setTutorData(res.data);
    console.log("DATA-->",res.data.tutor_availability)

    const non_aval = res.data.tutor_availability.non_availability;
    const aval = res.data.tutor_availability.regular_availability
   
    setdayStart(non_aval.from ? new Date(non_aval.from) : new Date());
    setdayEnd(non_aval.to ? new Date(non_aval.to) : new Date());
    
    //sunday
    setIsSunday(aval.sunday.available);
    if(aval.sunday.available){
    setSundayStart(new Date(aval.sunday.from));
    setSundayEnd(new Date(aval.sunday.to))
    }

    //monday
    if(aval.monday.available){
    setIsMonday(aval.monday.available);
    setMondayStart(new Date(aval.monday.from));
    setMondayEnd(new Date(aval.monday.to));
    }

    //tuesDay
    if(aval.tuesday.available){
    setIsTueday(aval.tuesday.available);
    setTuedayStart(new Date(aval.tuesday.from));
    setTuedayEnd(new Date(aval.tuesday.to));
    }

    //wednesday
    if(aval.wednesday.available){
    setIsWedday(aval.wednesday.available);
    setWeddayStart(new Date(aval.wednesday.from));
    setWeddayEnd(new Date(aval.wednesday.to));
    }


    //thrusday
    if(aval.thursday.available){
    setIsThrusday(aval.thursday.available);
    setThrusdayStart(new Date(aval.thursday.from));
    setThrusdayEnd(new Date(aval.thursday.to));
    }

    //friday
    if(aval.friday.available){
    setIsFriday(aval.friday.available);
    setFridayStart(new Date(aval.friday.from));
    setFridayEnd(new Date(aval.friday.to));
    }

    //saturday
    if(aval.saturday.available){
      console.log("DATE-->",new Date(aval.sunday.from))
    setIsSatday((aval.saturday.available));
    setSatdayStart(new Date(aval.saturday.available));
    setSatdayEnd(new Date(aval.saturday.to))
  
    }

    
  

   

  });
 },[]);


 const onAvalibliltySubmit = async() =>{
  // data = {
  // sunday:{available : false ,startTime:dayjs(''), endTime:dayjs('')},
  // monday:{available : false ,startTime:dayjs(''), endTime:dayjs('')},
  // tuesday:{available : false ,startTime:dayjs(''), endTime:dayjs('')},
  // wednesday:{available : false ,startTime:dayjs(''), endTime:dayjs('')},
  // thursday:{available : false ,startTime:dayjs(''), endTime:dayjs('')},
  // friday:{available : false ,startTime:dayjs(''), endTime:dayjs('')},
  // saturday:{available : false ,startTime:dayjs(''), endTime:dayjs('')}
  // }

  const data ={

    sunday:{
      available : isSunDay,
      from:(SunDayStart) ,
      to:SunDayEnd
    },
    monday:{
      available : isMonDay,
      from:MonDayStart,
      to:MonDayEnd
    },
    tuesday:{
     available:isTueDay,
     from:TueDayStart,
     to:TueDayEnd
    },
    
    wednesday:{
      available:isWedDay,
      from:WedDayStart,
      to:WedDayEnd
    },

    thursday:{
      available:isThrusDay,
      from:ThrusDayStart,
      to:ThrusDayEnd
    },

    friday:{
      available:isFriDay,
      from:FriDayStart,
      to:FriDayEnd
    },
    saturday:{
      available:isSatDay,
      from:SatDayStart,
      to:SatDayEnd
    }

  }

  console.log("DATA-->",data);

  try{

    let non_aval = {
      to:dayStart,
      end:dayEnd
    };

    if(dayStart === dayEnd){
      non_aval.to = null;
      non_aval.end = null;
    }
    const updateAvailability_main = await axios.put("https://annular-arena-331607.el.r.appspot.com/d6/api/tutor/updateTutorAvailability",{
        tutor_id:id,
        regular_availability : data,
        non_availability : non_aval
    })
  
    const updateAvailability = await axios.put("https://dev6apis.el.r.appspot.com/api/tutorWeb/updateTutorAvailability",{
      tutor_id:id,
      regular_availability : data,
      non_availability : non_aval
  })
  Toast.show({
    type: 'success',
    text1: 'SuccessFully Updated',
    text2: "Availability Changed Successfully!"
  });
 

  }catch(err){
    Toast.show({
      type: 'error',
      text1: 'ERROR',
      text2: "Something is going wrong!"
    });
    console.log(err);
  }


 }
 

  const resetUserPassword = async () => {
    if (password === confrimPassword) {

      setLoading(true);
      try {
        const data = {
          tutorId: id,
          password: password,
        };
        console.log("RESET-DATA-->",data)
        const res = await axios.post(
          ` https://dev6apis.el.r.appspot.com/api/sessions/resetPassword`,
          data
        );
        
        console.log(res.data)
        if (res.data.success) {
           
          Toast.show({
            type: 'success',
            text1: 'Password Changed Successfully!',
            text2: "Login with new password."
          });
         
          dispatch(authAction.setTokens(null))

         setLoading(false)
          
        }
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: 'Something went wrong!',
          text2: "Please do it again"
        });
        setLoading(false);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Password Mismatch',
        text2: "Password and Confirm Password is not matching"
      });
    }
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === "ios" ? "padding" : "height"}
    //   style={styles.container}
    // >
    <React.Fragment>
    
    <Header props={props}  />
    <ScrollView>
     

      <View style={[{justifyContent:'center',margin:'3%',backgroundColor:'white',paddingBottom:windowHeight * 0.02},styles.shadowProp]} >
        <Text style={styles.head}>Availability</Text>
      <View style ={{borderBottomColor:'greys' , borderBottomWidth:1}}>
           <View style={{flexDirection:'row' ,justifyContent:'space-around' ,marginVertical:windowHeight*0.02}}>
              <Pressable onPress={() => setshowRegular(true)} >
                <View style={showRegular? styles.active : styles.inactive}>
                  <Text style={ showRegular? styles.activeText : styles.inactiveText}>Show Regular Availability
                   </Text>
                </View>
              </Pressable>
                
              <Pressable  onPress={() => setshowRegular(false)}>
                <View style={!showRegular? styles.active : styles.inactive}>
                  <Text style={ !showRegular? styles.activeText : styles.inactiveText}>Show Unavailability</Text>
                  </View>
              </Pressable>
            </View>
      </View>
     
   
     
     {showRegular ? <View>

       
         <View style={styles.time}>

         {SunDay1 && <DateTimePicker
               testID="dateTimePicker"
               value={(SunDayStart)}
               mode={'time'}
               is24Hour={true}
               onChange={(_ ,selectedDate)=>{
                setSundayStart(selectedDate);
                setSunday1(false);
              }}
              />}

            {SunDay2 && <DateTimePicker
               testID="dateTimePicker"
               value={(SunDayEnd)}
               mode={'time'}
               is24Hour={true}
              onChange={(_ ,selectedDate)=>{
                setSundayEnd(selectedDate);
                setSunday2(false);
              }}
              />}
         
           <View style={{flexDirection:'row' ,marginTop:'5%'}}>
              <Checkbox 
               value={isSunDay}
               onValueChange={()=>setIsSunday(prev => !prev)}
              color={isSunDay ? '#4630EB' : undefined}
              />
              <Text style={{width:120,fontSize:15,marginHorizontal:'2%',fontWeight:'500'}} >Sunday</Text>
           </View>
      
           {isSunDay && <View style ={{flexDirection:'row',alignItems:'center'}}>
           <TextInput
            style={{width:70,height:0 ,backgroundColor:'white',}}
            onPressIn={()=>setSunday1(true)}
            // right={<TextInput.Icon icon="clock" />}
            value={moment(SunDayStart).format("HH:mm")}
          />
          <Text style={{marginTop:'5%'}}> To </Text>
          
          <TextInput
            style={{width:70 ,backgroundColor:'white',}}
            onPressIn={()=>setSunday2(true)}
            // right={<TextInput.Icon icon="clock" />}
            value={moment(SunDayEnd).format("HH:mm")}
          />
          </View>}
         </View>

   <View style={styles.time}>

     {MonDay1 && <DateTimePicker
      testID="dateTimePicker"
      value={(MonDayStart)}
      mode={'time'}
      is24Hour={true}
     onChange={(_ ,selectedDate)=>{
       setMondayStart(selectedDate);
       setMonday1(false);
     }}
     />}

   {MonDay2 && <DateTimePicker
      testID="dateTimePicker"
      value={(MonDayEnd)}
      mode={'time'}
      is24Hour={true}
      onChange={(_ ,selectedDate)=>{
       setMondayEnd(selectedDate);
       setMonday2(false);
     }}
     />}

  <View style={{flexDirection:'row' ,marginTop:'5%'}}>
     <Checkbox 
      value={isMonDay}
      onValueChange={()=>setIsMonday(prev => !prev)}
     color={isMonDay ? '#4630EB' : undefined}
     />
     <Text style={{width:120,fontSize:15,marginHorizontal:'2%',fontWeight:'500'}} >Monday</Text>
  </View>
 
  {isMonDay && <View style ={{flexDirection:'row',alignItems:'center'}}>
  <TextInput
   style={{width:70,height:0 ,backgroundColor:'white',}}
   onPressIn={()=>setMonday1(true)}
   // right={<TextInput.Icon icon="clock" />}
   value={moment(MonDayStart).format("HH:mm")}
 />
 <Text style={{marginTop:'5%'}}> To </Text>
 
 <TextInput
   style={{width:70 ,backgroundColor:'white',}}
   onPressIn={()=>setMonday2(true)}
   // right={<TextInput.Icon icon="clock" />}
   value={moment(MonDayEnd).format("HH:mm")}
 />
  </View> }
  </View>


<View style={styles.time}>

{TueDay1 && <DateTimePicker
 testID="dateTimePicker"
 value={(TueDayStart)}
 mode={'time'}
 is24Hour={true}
onChange={(_ ,selectedDate)=>{
  setTuedayStart(selectedDate);
  setTueday1(false);
}}
/>}

{TueDay2 && <DateTimePicker
 testID="dateTimePicker"
 value={(TueDayEnd)}
 mode={'time'}
 is24Hour={true}
 onChange={(_ ,selectedDate)=>{
  setTuedayEnd(selectedDate);
  setTueday2(false);
}}
/>}

<View style={{flexDirection:'row' ,marginTop:'5%'}}>
<Checkbox 
 value={isTueDay}
 onValueChange={()=>setIsTueday(prev => !prev)}
color={isTueDay ? '#4630EB' : undefined}
/>
<Text style={{width:120,fontSize:15,marginHorizontal:'2%',fontWeight:'500'}} >TuesDay</Text>
</View>

{isTueDay && <View style ={{flexDirection:'row',alignItems:'center'}}>

<TextInput
style={{width:70,height:0 ,backgroundColor:'white',}}
onPressIn={()=>setTueday1(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(TueDayStart).format("HH:mm")}
/>
<Text style={{marginTop:'5%'}}> To </Text>

<TextInput
style={{width:70 ,backgroundColor:'white',}}
onPressIn={()=>setTueday2(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(TueDayEnd).format("HH:mm")}
/>

</View>}

</View>


<View style={styles.time}>

{WedDay1 && <DateTimePicker
 testID="dateTimePicker"
 value={(WedDayStart)}
 mode={'time'}
 is24Hour={true}
onChange={(_ ,selectedDate)=>{
  setWeddayStart(selectedDate);
  setWedday1(false);
}}
/>}

{WedDay2 && <DateTimePicker
 testID="dateTimePicker"
 value={(WedDayEnd)}
 mode={'time'}
 is24Hour={true}
 onChange={(_ ,selectedDate)=>{
  setWeddayEnd(selectedDate);
  setWedday2(false);
}}
/>}

<View style={{flexDirection:'row' ,marginTop:'5%'}}>
<Checkbox 
 value={isWedDay}
 onValueChange={()=>setIsWedday(prev => !prev)}
color={isWedDay ? '#4630EB' : undefined}
/>
<Text style={{width:120,fontSize:15,marginHorizontal:'2%',fontWeight:'500'}} >Wednesday</Text>
</View>

{isWedDay && <View style ={{flexDirection:'row',alignItems:'center'}}>
<TextInput
style={{width:70,height:0 ,backgroundColor:'white',}}
onPressIn={()=>setWedday1(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(WedDayStart).format("HH:mm")}
/>
<Text style={{marginTop:'5%'}}> To </Text>

<TextInput
style={{width:70 ,backgroundColor:'white',}}
onPressIn={()=>setWedday2(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(WedDayEnd).format("HH:mm")}
/>
</View>
}
</View>

<View style={styles.time}>

{ThrusDay1 && <DateTimePicker
 testID="dateTimePicker"
 value={(ThrusDayStart)}
 mode={'time'}
 is24Hour={true}
onChange={(_ ,selectedDate)=>{
  setThrusdayStart(selectedDate);
  setThrusday1(false);
}}
/>}

{ThrusDay2 && <DateTimePicker
 testID="dateTimePicker"
 value={(ThrusDayEnd)}
 mode={'time'}
 is24Hour={true}
 onChange={(_ ,selectedDate)=>{
  setThrusdayEnd(selectedDate);
  setThrusday2(false);
}}
/>}

<View style={{flexDirection:'row' ,marginTop:'5%'}}>
<Checkbox 
 value={isThrusDay}
 onValueChange={()=>setIsThrusday(prev => !prev)}
color={isThrusDay ? '#4630EB' : undefined}
/>
<Text style={{width:120,fontSize:15,marginHorizontal:'2%',fontWeight:'500'}} >ThrusDay</Text>
</View>

{isThrusDay && <View style ={{flexDirection:'row',alignItems:'center'}}>
<TextInput
style={{width:70,height:0 ,backgroundColor:'white',}}
onPressIn={()=>setThrusday1(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(ThrusDayStart).format("HH:mm")}
/>
<Text style={{marginTop:'5%'}}> To </Text>


<TextInput
style={{width:70 ,backgroundColor:'white',}}
onPressIn={()=>setThrusday1(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(ThrusDayEnd).format("HH:mm")}
/>
</View>
}
</View>

<View style={styles.time}>

{FriDay1 && <DateTimePicker
 testID="dateTimePicker"
 value={(FriDayStart)}
 mode={'time'}
 is24Hour={true}
onChange={(_ ,selectedDate)=>{
  setFridayStart(selectedDate);
  setFriday1(false);
}}
/>}

{FriDay2 && <DateTimePicker
 testID="dateTimePicker"
 value={(FriDayEnd)}
 mode={'time'}
 is24Hour={true}
 onChange={(_ ,selectedDate)=>{
  setFridayEnd(selectedDate);
  setFriday2(false);
}}
/>}

<View style={{flexDirection:'row' ,marginTop:'5%'}}>
<Checkbox 
 value={isFriDay}
 onValueChange={()=>setIsFriday(prev => !prev)}
color={isFriDay ? '#4630EB' : undefined}
/>
<Text style={{width:120,fontSize:15,marginHorizontal:'2%',fontWeight:'500'}} >Friday</Text>
</View>

{isFriDay && <View style ={{flexDirection:'row',alignItems:'center'}}>

<TextInput
style={{width:70,height:0 ,backgroundColor:'white',}}
onPressIn={()=>setFriday1(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(FriDayStart).format("HH:mm")}
/>
<Text style={{marginTop:'5%'}}> To </Text>

<TextInput
style={{width:70 ,backgroundColor:'white',}}
onPressIn={()=>setFriday2(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(FriDayEnd).format("HH:mm")}
/>
</View>
}
</View>


<View style={styles.time}>

{SatDay1 && <DateTimePicker
 testID="dateTimePicker"
 value={(SatDayStart)}
 mode={'time'}
 is24Hour={true}
onChange={(_ ,selectedDate)=>{
  setSatdayStart(selectedDate);
  setSatday1(false);
}}
/>}

{SatDay2 && <DateTimePicker
 testID="dateTimePicker"
 value={(SatDayEnd)}
 mode={'time'}
 is24Hour={true}
 onChange={(_ ,selectedDate)=>{
  setSatdayEnd(selectedDate);
  setSatday2(false);
}}
/>}

<View style={{flexDirection:'row' ,marginTop:'5%'}}>
<Checkbox 
 value={isSatDay}
 onValueChange={()=>setIsSatday(prev => !prev)}
color={isSatDay ? '#4630EB' : undefined}
/>
<Text style={{width:100,fontSize:15,marginHorizontal:'5%',fontWeight:'500'}} >Saturday</Text>
</View>

{isSatDay && <View style ={{flexDirection:'row',alignItems:'center'}}>
<TextInput
style={{width:70,height:0 ,backgroundColor:'white',}}
onPressIn={()=>setSatday1(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(SatDayStart).format("HH:mm")}
/>
<Text style={{marginTop:'5%'}}> To </Text>

<TextInput
style={{width:70 ,backgroundColor:'white',}}
onPressIn={()=>setSatday2(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(SatDayEnd).format("HH:mm")}
/>
</View>}
</View>


<TouchableOpacity onPress={onAvalibliltySubmit}  style={[styles.active , {marginHorizontal:'5%' ,alignItems:'center'}]} >
<Text style={{fontSize:15,color:'white'}}>Submit</Text>
</TouchableOpacity>

</View> 

:

<View>


<Text style={{fontSize:15,margin:10}}>Non Availability : </Text>

<View >

{day1 && <DateTimePicker
 testID="dateTimePicker"
 value={(dayStart)}
 mode={'date'}
 is24Hour={true}
 onChange={(_ ,selectedDate)=>{
  setdayStart(selectedDate);
  setday1(false);
}}
/>}




{day2 && <DateTimePicker
 testID="dateTimePicker"
 value={(dayEnd)}
 mode={'date'}
 is24Hour={true}
onChange={(_ ,selectedDate)=>{
  setdayEnd(selectedDate);
  setday2(false);
}}
/>}


</View>

<View style ={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly'}}>
<Text>From</Text>
<TextInput
style={{width:125,height:0 ,backgroundColor:'white',}}
onPressIn={()=>setday1(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(dayStart).format("DD/MM/YYYY")}
/>
<Text style={{marginTop:'5%'}}> To </Text>

<TextInput
style={{width:125 ,backgroundColor:'white',}}
onPressIn={()=>setday2(true)}
// right={<TextInput.Icon icon="clock" />}
value={moment(dayEnd).format("DD/MM/YYYY")}
/>
</View>
<View>



</View>

</View>



}
  


      </View>
    <View style={[{justifyContent:'center',margin:'2%',backgroundColor:'white',paddingBottom:windowHeight * 0.02},styles.shadowProp]} >
    
     <View style={styles.loginBox}>
      <Text style={styles.header}>Setting</Text> 
     </View>
     <View style={styles.inputBox}>
      <View>
        <Text style={{padding:10}}>Update Password</Text>
        <TextInput  value={password} onChangeText={val=>setPassword(val)} placeholder='Password' keyboardType='email-address' style={styles.input} />
        <TextInput value={confrimPassword} onChangeText={val=>setConfrimPassword(val)}  placeholder='Confrim Password' keyboardType='email-address' style={styles.input} />
      </View>
      
      <View style={{flexDirection:'row' , justifyContent:'space-between',alignItems:'center',margin:'1%'}}>
       <TouchableOpacity disabled={loading} onPress={resetUserPassword} style={styles.button}>
        {loading ?<ActivityIndicator size={20}  color="white"/> : <Text style={styles.buttonText}>Update</Text>}
       </TouchableOpacity>
      </View>

      
    </View>
    </View>

     
   
    </ScrollView>
    </React.Fragment>
    // {/* // </KeyboardAvoidingView> */}
  )
}

export default Setting

const styles = StyleSheet.create({
  header:{
    fontWeight:'500',
    fontSize:20,
  },
  loginBox:{
   margin:'5%'
  },
  input: {
    // paddingHorizontal:windowWidth * 0.05,
    // paddingVertical:windowHeight * 0.015,
    backgroundColor:'white',
    borderRadius: 5,
    textAlignVertical: "top",
    marginTop: '5%',
    fontSize:12
  },
  inputBox:{
    marginHorizontal:windowWidth * 0.02,
    marginVertical:windowHeight * 0.01
  },
  button:{
    backgroundColor:'#5E2CED',
    width:200,
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
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:5,
    borderRadius:20
  }
  ,
  active:{
   color:'#5048E5' ,
   backgroundColor:'#5048E5' ,
   fontSize:12 , 
   borderWidth:1 ,
   borderColor:'#5048E5' ,
   paddingHorizontal:15 ,
   paddingVertical:8,
   marginVertical:'5%' ,
   borderRadius:10
 },
 
  inactive:{
   color:'#5048E5' ,
  fontSize:12,
   borderWidth:1 
  , borderColor:'#5048E5' ,
  paddingHorizontal:15 ,
  paddingVertical:8 ,
  marginVertical:'5%' ,
  borderRadius:10
 },
 
  activeText:{fontSize:10,color:'white'} ,
  inactiveText:{fontSize:10,color:'#5048E5'},
  head:{
    marginTop:'5%',
    marginLeft:'5%',
    fontSize:18
  },
  time:{
    flexDirection:'row',
    justifyContent:'flex-start',
    marginHorizontal:windowWidth * 0.02,
    marginVertical:windowHeight * 0.01
  }
})