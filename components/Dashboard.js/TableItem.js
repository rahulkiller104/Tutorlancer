import { Linking, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TableItem =props => {
    
    console.log('TABLE()',props.data?props.data.work_status:"")
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
              <Text style={styles.itemText}> {props.data?props.data.deadline:""} </Text>
              <TouchableOpacity onPress={()=>Linking.openURL(props.data && props.data.quesFolderLink) } style={[styles.itemText,styles.status]}><Text style={{color:'black'}}>Show Interest</Text></TouchableOpacity>
            </View>
          )
    }

  return (
    <View style={styles.tableItem} key= {props.data?props.data.sessionId:""}>
    <Text style={styles.itemText}> {props.data?props.data.sessionId:""} </Text>
    <Text style={styles.itemText}> {props.data?props.data.type:""} </Text>
    <Text style={styles.itemText}> {props.data?props.data.subject:""} </Text>
    <Text style={styles.itemText}> {props.data?props.data.deadline:""} </Text>
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
        paddingVertical:10
    },
    itemText:{
        margin:10,
        paddingHorizontal:10,
        paddingVertical:3
    },
    status:{
        borderRadius:20,
        borderColor:'#D3D3D3',
        borderWidth:1
    },
  
    
})