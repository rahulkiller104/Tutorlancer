import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
// import HistoryItem from '../components/Dashboard.js/HistoryItem'
import HistoryItem from '../components/HistoryItem'


const History = (props) => {
  return (
    <View style={styles.dashboard}>
      <Header props={props} />
     <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.table}>
      <Text style={styles.headSession}>History</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View>
           <HistoryItem  head={true}/>
           <HistoryItem session ={true}/>
           <HistoryItem session ={true}/>
           <HistoryItem session ={true}/>
           <HistoryItem session ={true}/>
           <HistoryItem session ={true}/>
           <HistoryItem session ={true}/>
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
    fontSize:20,
    padding:10
  }

})
export default History;

