import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import moment from "moment";
const TableItem =props => {
    
    // if(props.data == undefined)
    // console.log('TABLE()',props.data)


    let deviceNo;
    if(props.data){
      
      if(props.data.sessionId.length == 10){
        deviceNo = props.data.sessionId.slice(0,1);
      }else{
        deviceNo = props.data.sessionId.slice(0,2);
      }

    }
   

    // if(props.data.sessionId.length > 10){
    //   // deviceNo = props.data.sessionId.slice(0,2);
    // }




    if(props.head){
     
        return (
            <View style={styles.tableItem} key= {props.data?props.data.sessionId:""}>
              <Text style={styles.itemText}>Session Id</Text>
              <Text style={styles.itemText}>Type</Text>
              <Text style={styles.itemText}>Subject</Text>
              <Text style={styles.itemText}>Date</Text>
              <View style={styles.itemText}><Text>Status</Text></View>
            </View>
          )
    }

    if(props.session){
        return (
            <View style={styles.tableItem} key= {props.data?props.data.sessionId:""}>
              <Text style={styles.itemText}> {props.data?props.data.sessionId:""} </Text>
              <Text style={styles.itemText}> {props.data?props.data.type:""} </Text>
              <Text style={styles.itemText}> {props.data?props.data.subject:""} </Text>
              <Text style={styles.itemText}> {props.data?moment(props.data.deadline).format(" MMM Do YYYY, h:mm a"):""} </Text>

              
              {props.data.showedInterest && props.data.acceptRequest  ?
              <TouchableOpacity onPress={()=>Linking.openURL(props.data && `https://tutor-response.tutorpoint.in/d${deviceNo}/tutorForm/${sessionId}/${props.data.tutor_id}`) } style={[styles.itemText,styles.status]}><Text style={{color:'black'}}>Accept Session</Text></TouchableOpacity>
              :
              props.data.showedInterest ?
               <TouchableOpacity onPress={()=>Linking.openURL(props.data && `https://tutor-response.tutorpoint.in/d${deviceNo}/tutorForm/${sessionId}/${props.data.tutor_id}?accept_task=success`) } style={[styles.itemText,styles.status]}><Text style={{color:'black'}}>show Interest</Text></TouchableOpacity> : <Text>---- ----</Text>
              }
            </View>
          )
    }

  return (
    <View style={styles.tableItem} key= {props.data?props.data.sessionId:""}>
    <Text style={styles.itemText}> {props.data?props.data.sessionId:""} </Text>
    <Text style={styles.itemText}> {props.data?props.data.type:""} </Text>
    <Text style={styles.itemText}> {props.data?props.data.subject:""} </Text>
    <Text style={styles.itemText}> {props.data?moment(props.data.deadline).format(" MMM Do YYYY, h:mm a"):""} </Text>
      <View style={[styles.itemText,styles.status]}><Text style={{ color:props.data?props.data.work_status === "Completed" ? 'green':'orange':"black"}}>{props.data?props.data.work_status:""}</Text></View>
    </View>
  )
}

export default TableItem

const styles = StyleSheet.create({
  tableItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    borderBottomColor:'#D3D3D3',
    borderBottomWidth:1,
    paddingVertical:10,
    justifyContent:'center',
    textAlign:'center'
},
itemText:{
    margin:10,
    paddingHorizontal:10,
    paddingVertical:3,
    width:110,
    textAlign:'center',
    marginHorizontal:'auto'
},
    status:{
        borderRadius:20,
        borderColor:'#D3D3D3',
        // borderWidth:1
    },
  
    
})