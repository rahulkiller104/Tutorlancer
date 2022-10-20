import { ScrollView, StyleSheet, Text, View ,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import DashBoardCard from '../components/Dashboard.js/DashboardCardItem'
import TableItem from '../components/Dashboard.js/TableItem'
import axios from 'axios'
import { useSelector } from 'react-redux'

const Dashboard = (props) => {
  
  const [sessionData , setSessionData ] = useState();
    const [loading,setLoading] = useState(false);
  const id = useSelector(state => state.auth.data.saveTutor.tutor_id);

  useEffect(()=>{
    console.log("ID",id)
  axios.post('https://annular-arena-331607.el.r.appspot.com/d6/api/allSessions/fetchTutorSession',
  {
    tutor_id:id
  }
  )
  .then(data =>{
    // console.log("SESSION-DATA--->",data.data.sessionData);
    setSessionData(data.data.allSessions);
  })
  .catch(err => console.log(err))
  },[])

  return (
    <View style={styles.dashboard}>
      <Header props={props} />
     <ScrollView showsVerticalScrollIndicator={false}>
      <DashBoardCard firstText="RATING" secondText="NA" icon="star" backgroundColor="red" />
      <DashBoardCard firstText="PENDING SESSION" secondText="0" icon="book-multiple" backgroundColor="green" />
      <DashBoardCard firstText="TOTAL SESSION" secondText="15" icon="chart-bar" backgroundColor="orange" />
      <DashBoardCard firstText="WALLET AMOUNT" secondText="0" icon="wallet" backgroundColor="blue" />

      <View style={styles.table}>
      <Text style={styles.headSession}>Latest Session</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View>
           <TableItem  head={true}/>
             {/* {sessionData && }
              */}
               {!sessionData ? <ActivityIndicator style={{height:100,marginRight:'20%'}} size={26} />:sessionData.map(data =><TableItem data ={data} />)}
         </View>
        </ScrollView>
      
      </View>
      </ScrollView>

     
      
  

    </View>
  )
}

export default Dashboard

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