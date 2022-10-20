import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'



const Profile = (props) => {

   const tags = [
    'Geotechnical Engineering',
   'Geology',
   'Soil Meachnics',
   'Analog Circuit',
   'Network Analysis'
   ]
  return (
    <View style={styles.dashboard}>
      <Header props={props} />

      <ScrollView>

      <View><Text style={{fontSize:22}}>Account</Text></View>

      <View style={[styles.card,styles.shadowProp ,{alignItems:'center'}]}>
          <View>
            <Image  source={require('../assets/profile.webp')} resizeMode='contain' style={styles.profImage} />
          </View>

          <View>
            <Text style={{fontWeight:'600', marginVertical:'1%'}}>Shivam</Text>
          </View>

          <View>
            <Text style={{marginVertical:"2%"}}>rahulkumar10433@gmail.com</Text>
          </View>

          <View style={styles.line}></View>
          
          <TouchableOpacity>
            <Text style={{color:'#5048E5', fontWeight:'500'}}>UPLOAD PICTURE</Text>
          </TouchableOpacity>
      </View>

      <View style={[styles.card,styles.shadowProp]}>
        <View style={{flexDirection:'row' , flexWrap:'wrap'}}>
        <Text style={{fontWeight:'600'}}>Add Tag : </Text>
        {tags.map(tag => (
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
      mode="outlined"
      label="Full Name"
      placeholder="Enter Your Name" 
    />
     <TextInput
      mode="outlined"
      label="Email Adress"
      placeholder="Enter Your Email" 
    />
     <TextInput
      mode="outlined"
      label="Facebook Username"
      placeholder="Facebook Username" 
    />
     <TextInput
      mode="outlined"
      label="University"
      placeholder="Enter Your University Name" 
    />
     <TextInput
      mode="outlined"
      label="Writer"
      placeholder="Writer Name" 
    />
     <TextInput
      mode="outlined"
      label="Department"
      placeholder="Department Name" 
    />

         <TouchableOpacity style={{alignItems:'center'}}>
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

