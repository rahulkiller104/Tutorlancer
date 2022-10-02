import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import TableItem from '../components/Dashboard.js/TableItem'

const SessionRequest = (props) => {
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
           <TableItem session ={true}/>
           <TableItem session ={true}/>
           <TableItem session ={true}/>
           <TableItem session ={true}/>
           <TableItem session ={true}/>
           <TableItem session ={true}/>
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

