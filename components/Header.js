import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 




const Header = (props) => {
  return (
    <View style={[styles.card, styles.shadowProp,styles.main]}>

    <TouchableOpacity onPress={()=>props.props.navigation.openDrawer()
} style={[styles.icon,styles.hamer]}>
    <Feather name="menu" size={24} color="black" />
    </TouchableOpacity>

    <View style ={styles.user}>
    
    <View style={styles.name}>
        <Text style={styles.nameUser}>Hi, shivanshu</Text>
    </View>

    <TouchableOpacity style={styles.icon}>
    <FontAwesome5 name="book-reader" size={24} color="black" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.icon}>
    <Ionicons name="notifications" size={24} color="black" />
    </TouchableOpacity>
    
    <TouchableOpacity style={styles.icon}>
    <FontAwesome name="user-circle" size={24} color="black" />
    </TouchableOpacity>
    
    </View>
    
    </View>
  )
}

export default Header

const styles = StyleSheet.create({

    main:{
        flexDirection:'row',
        marginTop:'10%',
        justifyContent:'space-between'
    },
  
    card: {
      backgroundColor: 'white',
      borderRadius: 0,
      paddingVertical: 20,
      paddingHorizontal: 10,
      width: '100%',
      marginVertical: 10,
    },
    shadowProp: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation:5
    },

    name:{
        borderWidth:1,
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:25,
        borderColor: '#9499a1',
        marginHorizontal:'3%'

    },
    nameUser:{
        opacity:.7
    },

    icon:{
      marginLeft:20
    },
    user:{
        flexDirection:'row',
        justifyContent:'flex-end',
        flex:1
    },
    hamer:{
       marginLeft:'10%'
    }
   
  });
  