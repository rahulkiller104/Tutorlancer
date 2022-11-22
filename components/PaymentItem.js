import { StyleSheet, Text, View} from 'react-native'
import React from 'react'
import moment from "moment";

const PaymentItem=props => {



    
    if(props.headRecieved){
     
        return (
            <View style={styles.tableItem}>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Transaction Id</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Session Id</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Date & Time</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Description</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Amount</Text>
              <View style={[styles.itemText , {fontWeight:'bold'}]}><Text>Status</Text></View>
            </View>
          )
    }

    if(props.headTransferred){
     
        return (
            <View style={styles.tableItem}>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Transaction Id</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Payment mode</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Date & Time</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>TDS</Text>
              <Text style={[styles.itemText , {fontWeight:'bold'}]}>Amount</Text>
              <View style={[styles.itemText , {fontWeight:'bold'}]}><Text>Status</Text></View>
            </View>
          )
    }

    if(props.transferred){
      return (
        <View style={styles.tableItem} key={props && props.pout_id}>
           <View style={[styles.itemText,{flexDirection:'row',justifyContent:'space-around'}]}>
            <Text> {props?props.pout_id:""}</Text>
            </View>
          <Text style={styles.itemText}>{props?props.mode:""}</Text>
          <Text style={styles.itemText}>{props?moment(props.date).format(" MMM Do YYYY, h:mm a"):""}</Text>
          <Text style={styles.itemText}>{props?props.tds:""}</Text>
          <Text style={styles.itemText}>{props?props.amount?props.amount:'--':'--'}</Text>
          <View style={[styles.itemText]}><Text style={[{ color:props?props.status === "processed" ? 'green':'orange':"black"}]}>{props?props.status:""}</Text></View>
        </View>
      )
    }

  
        return (
            <View style={styles.tableItem} key={props.data && props.data.transaction_id}>
               <View style={[styles.itemText,{flexDirection:'row',justifyContent:'space-around'}]}>
                <Text> {props.data?props.data.transaction_id:""}</Text>
                </View>
              <Text style={styles.itemText}>{props.data?props.data.sessionId:""}</Text>
              <Text style={styles.itemText}>{props.data?moment(props.data.updatedAt).format(" MMM Do YYYY, h:mm a"):""}</Text>
              <Text style={styles.itemText}>{props.data.partialAmount / props.data.fullAmount * 100}% approved"</Text>
              <Text style={styles.itemText}>{props.data?props.data.partialAmount?props.data.partialAmount:'--':'--'}</Text>
              <View style={[styles.itemText]}><Text style={{ color:props.data?props.data.status === "full" ? 'green':'orange':"black" }}>{props.data?props.data.status:""}</Text></View>
            </View>
          )
        }



export default PaymentItem;

const styles = StyleSheet.create({
    tableItem:{
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomColor:'#D3D3D3',
        borderBottomWidth:1,
        paddingVertical:10,
        justifyContent:'center'
    },
    itemText:{
        margin:10,
        paddingHorizontal:10,
        paddingVertical:3,
        width:150,
        textAlign:'center'
    },
    status:{
        borderRadius:20,
        borderColor:'#D3D3D3',
        borderWidth:1,
    }
    ,
    checkbox: {
        alignSelf: "center",
      },
})