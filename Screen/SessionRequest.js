import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import TableItem from '../components/Dashboard.js/TableItem'
import axios from 'axios'
import { useSelector } from 'react-redux'

const SessionRequest = (props) => {

  const [sessionData , setSessionData ] = useState();
  const id = useSelector(state => state.auth.data.saveTutor.tutor_id);

  useEffect(()=>{
    console.log("ID",id)
  axios.post('https://annular-arena-331607.el.r.appspot.com/d6/api/allSessions/fetchTutorSession',
  {
    tutor_id:id
  }
  )
  .then(data =>{
    console.log("SESSION-DATA--->",data.data.allSessions);
    setSessionData(data.data.allSessions);
  })
  .catch(err => console.log(err))
  },[])
  return (
    <View style={styles.dashboard}>
      <Header props={props} />
     <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.table}>
      <Text style={styles.headSession}>Latest Session</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View>
           <TableItem  head={true}/>
           {sessionData && sessionData.map(data =>  <TableItem session ={true} data={data}/>)}
         </View>
        </ScrollView>
      
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
  table:{
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:5,
    width:'100%',
    marginBottom:'5%',
    backgroundColor:'white',
    padding:10

  },
  headSession:{
    fontWeight:'400',
    fontSize:16,
    padding:10
  }

})
export default SessionRequest;

