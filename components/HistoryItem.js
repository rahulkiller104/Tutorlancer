import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import Checkbox from 'expo-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler'

const HistoryItem=props => {
    
    if(props.head){
     
        return (
            <View style={styles.tableItem}>
              <Text style={styles.itemText}>Session Id</Text>
              <Text style={styles.itemText}>Type</Text>
              <Text style={styles.itemText}>Subject</Text>
              <Text style={styles.itemText}>Date</Text>
              <Text style={styles.itemText}>Amount</Text>
              <View style={styles.itemText}><Text>Status</Text></View>
            </View>
          )
    }

  
        return (
            <View style={styles.tableItem}>
              <View style={[styles.itemText,{flexDirection:'row',justifyContent:'space-around'}]}>
              <Checkbox
               value={true}
              />
                <Text> 1200104101</Text>
                </View>
              <Text style={styles.itemText}>Assignment</Text>
              <Text style={styles.itemText}>testing purpose</Text>
              <Text style={styles.itemText}>Sep 21, 2022</Text>
              <Text style={styles.itemText}>Rs 1000</Text>
              <View style={[styles.itemText,styles.status]}><Text style={{color:'green'}}>COMPLETED</Text></View>
            </View>
          )
        }



export default HistoryItem;

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
    }
    ,
    checkbox: {
        alignSelf: "center",
      },
})