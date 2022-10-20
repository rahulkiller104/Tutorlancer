import { Dimensions, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UpcommingSessionItem = props => {
   
    const onTaskFile = () =>{
        const URL = 'https://drive.google.com/drive/folders/13KOClyWDb6TmrYri14fU2sfXU4tp-1J3';
        Linking.openURL(URL)
    }

    console.log("SESSION-DATA--->",props.data);
  return (
    <View style={styles.itemBox} key={props.data.sessionId}>

      <View style ={styles.header}>
        <View>
            <Text style={styles.headBox}>Session ID</Text>
            <Text style={{fontWeight:'bold',textAlign:'center'}}>{props.data.sessionId}</Text>
        </View>
        <View>
            <Text style={styles.headBox}>Status</Text>
            <Text style={{color:'green',textAlign:'center'}}>{props.data.work_status}</Text>
        </View>
      </View>

      <View style={styles.sub}>
        <View>
           <Text style={{color:"blue",fontSize:22,textAlign:'center'}}>{props.data.type}</Text>
           <Text style={{fontWeight:'500',fontSize:18,marginVertical:'5%',textAlign:'center',marginVertical:'10%'}}>Testing purpose</Text>
           <Text style={{textAlign:'center'}}>Deadline:{props.data.deadline}</Text>
        </View>
        
      </View>

      <View style={{borderBottomColor:'#D3D3D3' , borderBottomWidth:1,marginVertical:'5%'}}></View>

      <View style={{flexDirection:'row' ,justifyContent:'space-between'}}>
        <View style={{flexDirection:'row'}}>
            <Text style={{color:'rgb(80, 72, 229)'}}>Amount : </Text>
            <Text>{props.data.currency}</Text>
        </View>
        <TouchableOpacity onPress={onTaskFile} style={styles.bottomBox}>
            <Text style={{color:'rgb(80, 72, 229)'}}>Task File</Text>
        </TouchableOpacity>
      </View>






    </View>
  )
}

export default UpcommingSessionItem

const styles = StyleSheet.create({
 
    itemBox:{
      padding:windowWidth * 0.05,
      borderWidth:1,
      borderColor:'#D3D3D3',
      borderRadius:5,
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation:5,
      width:'100%',
      marginBottom:'5%',
      backgroundColor:'white',
      padding:20
    },
    header:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    headBox:{
        textAlign:'center'
    },
    sub:{
        flexDirection:'row' ,
        justifyContent:'center',
        marginTop:'2%'
    },
    bottomBox:{
         paddingHorizontal:10 ,
         paddingVertical:5,
         borderColor:'rgb(80, 72, 229)' ,
         borderWidth:1,
         borderRadius:5

        }
    

})