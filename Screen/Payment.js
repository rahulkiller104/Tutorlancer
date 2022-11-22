import { Alert, Image, ScrollView, StyleSheet, Text, View ,Modal, Pressable, Dimensions ,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler'
import HistoryItem from '../components/HistoryItem'

import * as ImagePicker from 'expo-image-picker';
import * as authAction from '../Redux/action/auth'

import { useSelector ,useDispatch } from 'react-redux'
import axios from 'axios'
import PaymentItem from '../components/PaymentItem';

import Toast from 'react-native-toast-message';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Payment = (props) => {

   const dispatch = useDispatch();
   
   const [name , setName] = useState();
   const [Number , setNumber] = useState();
   const [IFSC , setIFSC] = useState();
   const [Upi , setUpi] = useState();
   const [Pan , setPan] = useState();
   const [AccountName , setAccountName] = useState();
   const [contactId ,setContactId] = useState('');
   const [amount , setAmount] = useState(0);
   const [wallet , setWallet ] = useState(null);
   const [upiFundId , setUpiFundId] = useState();
   const [bankFundId , setBankFundId] = useState();
   const [loading ,setLoading] = useState(false);
   const [passbookImage , setPassbookImage] = useState();
   const [panImage , setpanImage] = useState();
   
  
   const [modalVisible, setModalVisible] = useState(false);
   const [isUpi ,setIsupi] = useState(true);   

   const [transaction , setTransaction] = useState(null);
   const [recieved , setRecieved] = useState([]);
   const [isRecieved , setIsRecived] = useState(false);

   const [sessionData , setSessionData ] = useState();
   const id = useSelector(state => state.auth.data.saveTutor.tutor_id);
   let contact_id = useSelector(state => state.auth.data.saveTutor.contact_id);
   const tutorData = useSelector(state =>state.auth.data.saveTutor);
   const token = useSelector(state => state.auth.accessToken);
   const refresh_token = useSelector(state => state.auth.refreshToken);

   const [currToken ,setCurrToken] = useState(null);

   const [processingAmount , setProcessingAmount] = useState(0);


   console.log("TOKEN -->" ,refresh_token)



  useEffect(()=>{
    axios.get(`https://dev6apis.el.r.appspot.com/api/payments/fetchTutorWalletList/${id}`)
    .then(res =>{``
      // console.log(res.data);c
      setTransaction(prev => res.data);
      let process_amt = 0;

      for(const i of res.data){
        console.log(i.pout_info.status)
        if(i.pout_info.status === 'processing'){
          process_amt += i.amount / 100;
        }
      }
      setProcessingAmount(process_amt);
      

    })
    .catch(err =>{
      console.log(err);
    })
  },[modalVisible])

  useEffect(()=>{
   
    axios.post('https://annular-arena-331607.el.r.appspot.com/d6/api/allSessions/fetchTutorSession' ,{
    tutor_id:id})
    .then(res =>{
    let recData = [];
    
    for(let session of res.data.allSessions){
      if(session.wallet){
         for (let rec of session.wallet){
          let newRec ={...rec , sessionId:session.sessionId};
          recData.push(newRec);
         }
      }
    }

 
    setRecieved(recData);
    
    })

  },[])


   const updateTutorAccountFunc = async() =>{

      let tutorId1 = id;
      // const fetchProfile= {email:window.localStorage.getItem('email')})
     const resData = await axios
        .get(
          `https://dev6apis.el.r.appspot.com/api/tutorweb/getTutorDetails/${tutorId1}`
        )

      // console.log("TUTOR-PROFILE-->",resData.data.wallet)
      setWallet(resData.data.wallet);
      setNumber(resData.data.Bank.acc_no);
      setAccountName(resData.data.Bank.acc_name);
      setIFSC(resData.data.Bank.ifsc_code);
      setUpi(resData.data.Bank.upi_id)
      setName(resData.data.Bank.acc_name);
      setPan(resData.data.pan)
     
   }




   useEffect(()=>{
    updateTutorAccountFunc();
   },[modalVisible])



   useEffect(()=>{
  
   axios.post('https://annular-arena-331607.el.r.appspot.com/d6/api/allSessions/fetchTutorSession',
   {
     tutor_id:id
   }
   )
   .then(data =>{
     // console.log("SESSION-DATA--->",data.data.sessionData);
     setSessionData(data.data.sessionData.name);
   })
   .catch(err => console.log(err))
   },[])
  



   const createContactId = async() =>{
  
    if(contact_id.length > 0){
      console.log(contact_id);
      setContactId(contact_id);
      return;
    }
    const payload = {
      name: tutorData.name,
      email: tutorData.email,
      contact: tutorData.wa_id,
      type: "vendor",
      reference_id: tutorData.tutor_id
    }

    try{
      const response = await axios.post(
        `https://dev6apis.el.r.appspot.com/api/payments/contacts`,
        payload
      );
  
    setContactId(response.data.contact_id); 
    }catch(err){
      console.log("FAILED TO SET CONTACT ID")
    }
    
  
  }


     useEffect(()=>{
     createContactId();
     },[]);


     const pickImage = async (type) => {
     
      let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("Permission to access camera roll is required!");
        return;
      }

      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        if(type ==='pan'){
          setpanImage(result);
        }else{
          setPassbookImage(result);
        }
        
      }
    };
  
  
   
 const saveBankInfo = async() =>{
 
  console.log('SUCESS')

  if(!Number ){
    Toast.show({
      type: 'info',
      text1: 'Warning',
      text2: 'Please fill the details'
    });
    return;
  }
 

  let formdataPayment = new FormData();
  formdataPayment.append("accountNo", Number);
    formdataPayment.append("accountName", name);
    formdataPayment.append("ifsc", IFSC);
    formdataPayment.append("upi_id", Upi);
    formdataPayment.append("passbook", passbookImage);
    formdataPayment.append("pan", Pan);
    formdataPayment.append("panPic", panImage);
    // const watsNumber = props.values.watsNumber;
   
    try{

          // console.log("PAYMENT-DATA--->",formdataPayment)
          console.log("START");

      // const whatsFunc1 = await axios.post(
      //   `https://dev6apis.el.r.appspot.com/api/tutorweb/setTutorPaymentDetailsWeb/${
      //    id
      //   }`,
      //   formdataPayment
      // );
      // console.log(whatsFunc1.data);
  
    }catch(err){
      console.log(err);
    }
  



}
 


   
   const makePayment = async() =>{

  //check condtion;

  if(+amount <= 1){
    Toast.show({
      type: 'error',
      text1: 'Too Low',
      text2: 'Please enter amount greater than Rs. 2'
    });
    return;
  }

  if(+amount > 5000){
    Toast.show({
      type: 'error',
      text1: 'Too High',
      text2: 'Please enter amount lesser than Rs 5000'
    });
    return;
  }

  if(+amount > +wallet.approvedAmount - processingAmount){
    Toast.show({
      type: 'error',
      text1: 'Too High',
      text2: 'Please enter amount lesser than wallet amount'
    });
    return;
  }
  
  if(refresh_token){
  let payload = {
    token: refresh_token
  };

  try {
    const res = await axios.post(
      `https://dev6apis.el.r.appspot.com/api/auth/refresh`,
      payload
    );
    if (res.data.accessToken) {
      // tutor.accessToken = res.data.accessToken;
      // tutor.refreshToken = res.data.refreshToken;
      // localStorage.setItem("tutor", JSON.stringify(tutor));
      const data ={
        accessToken:res.data.accessToken,
        refreshToken:res.data.refreshToken
      }
      dispatch(authAction.setTokens(data));
      console.log("NEW-TOKEN-->",res.data)
      setCurrToken(res.data.accessToken);
    }
  } catch (err) {
    setCurrToken(token);
    console.log(err);
  }

 }else{
  setCurrToken(token);
 }





  setLoading(true);
   
     // --2-- Create fund bank account id

  try{
  const payloadBank = {
    contact_id: contactId,
    account_type: "bank_account",
    bank_account: {
      name: tutorData.name,
      ifsc: tutorData?.Bank?.ifsc_code,
      account_number: tutorData?.Bank?.acc_no,
    },
  };

  console.log("BANK PAYLOAD --> " , payloadBank)

  
  const responseBank = await axios.post(
    `https://dev6apis.el.r.appspot.com/api/payments/fund_accounts_bank/${
      tutorData.wa_id //whatsApp Number
    }`,
    payloadBank //payload
    ,
        {
          headers: { "x-auth-token":currToken},
        }
  );

  console.log("BANK-FUND" , responseBank.data.fund_bank_id);

  setBankFundId(responseBank.data.fund_bank_id);


}catch(err){
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'something is going wrong'
  });
  console.log("ERROR-->BANK FUND ID")
  setLoading(false);
}
  // // --3-- Create fund upi id
  const payloadUpi = {
    contact_id: contactId,
    account_type: "vpa",
    vpa: {
      address: tutorData?.Bank?.upi_id,
    },
  };


  try{
  // console.log("PayloadUpi",payloadUpi)
  const responseUpi = await axios.post(
    `https://dev6apis.el.r.appspot.com/api/payments/fund_accounts_upi/${
      tutorData.wa_id //WhatsApp number
    }`,
    payloadUpi //payload
    ,
        {
          headers: { "x-auth-token":currToken},
        }
  );

  console.log("UPI-FUND" , responseUpi.data.fund_upi_id);
  setUpiFundId(responseUpi.data.fund_upi_id);
 
}catch(err){
  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'something is going wrong'
  });
  console.log("ERROR-->UPI FUND ID")
}
  
  const payloadPayout_ = {
    account_number: "39934910083539801",
    fund_account_id:isUpi ? upiFundId : bankFundId,
    amount:
        tutorData?.pan
        ? amount * 100 - amount * 10
        : !tutorData?.pan
        ? amount * 100 - amount * 20
        : amount * 100,
    currency: "INR",
    mode: "UPI",
    purpose: "vendor bill",
    // queue_if_low_balance: true,
    reference_id: id,
    narration: "Tutor Fund Transfer",
    notes: {
      TDS:
       tutorData.pan
          ? amount * 0.1
          : !tutorData?.pan
          ? amount * 0.2
          : amount * 0,
      PAN: tutorData.pan ? tutorData?.pan : "",
      EMAIL: tutorData.email,
      // SESSION: sessionId,
    },
  };
  
  console.log("PAYMENT-->",payloadPayout_)

  let payoutRes_;
  try{
    console.log('PAYMENT START');
     payoutRes_ = await axios.post(
      `https://drifting-console-1.el.r.appspot.com/d6/api/transaction/payingToExpertsUpdated/${
        tutorData.wa_id //Whatsapp number
      }/${id}`, //tutor id
      payloadPayout_ //payload
      ,
        {
          headers: { "x-auth-token":currToken},
        }
    );
   
    setLoading(false);
    setModalVisible(false);
    
  Toast.show({
    type: 'success',
    text1: 'Payment Successfull',
    text2: `Amount ${amount} credited to your account!`
  });

    console.log("Payment Response -->",payoutRes_.data)
  
  }catch(err){
    setLoading(false)
    Toast.show({
    type: 'error',
    text1: 'Error',
    text2: 'something is going wrong'
  });
    setModalVisible(false);
    console.log("PAYMENT FAILED");
    console.log(err);
  }

  console.log("PAYMENT END");


   }


  
  
  return (
    <View style={styles.dashboard}>
        <Modal
        animationType="slide"
        onPressOut={() => setModalVisible(false)}
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable  style={{alignItems:'flex-end'}} onPress={() => setModalVisible(false)}><Text style={{color:'red',fontSize:18}}>Cancel</Text></Pressable>
            <Text style={styles.modalText}>Amount : <Text style={{color:'green'}}>Rs. {amount}</Text></Text>
            <View style={{flexDirection:'row' ,justifyContent:'space-between' ,marginVertical:windowHeight*0.02}}>
              <Pressable onPress={() => setIsupi(true)} >
                <View style={isUpi? styles.active : styles.inactive}>
                  <Text style={ isUpi? styles.activeText : styles.inactiveText}>UPI</Text>
                </View>
              </Pressable>
                
              <Pressable  onPress={() => setIsupi(false)}>
                <View style={!isUpi? styles.active : styles.inactive}>
                  <Text style={ !isUpi? styles.activeText : styles.inactiveText}>Bank Transfer</Text>
                  </View>
              </Pressable>
            </View>
            <Pressable
             disabled={loading}
              style={[styles.button, styles.buttonClose,{marginVertical:20}]}
              onPress={makePayment}
            >
             {loading?<ActivityIndicator  color="white"/> :<Text style={styles.textStyle}>PAY</Text>} 
            </Pressable>
          </View>
        </View>
      </Modal>

      <Header props={props} />

      <ScrollView showsVerticalScrollIndicator={false}>

      <View><Text style={{fontSize:22}}>Payments</Text></View>


      <View style={[styles.card,styles.shadowProp]}>

      <Text style={{fontSize:18}}>Payment Details:</Text>
      <Text style={{opacity:0.7}}>This Information can be edited</Text>
      <View style={styles.line}></View>
      
      <TextInput 
      style={{marginBottom:'2%'}}
      mode="outlined"
      label="Account Name"
      placeholder="Enter Account Name" 
      value={AccountName}
      onChangeText={input => setAccountName(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Account Number"
      placeholder="Enter Your Account Number" 
      value={Number}
      onChangeText={input => setNumber(input)}
    />
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="IFSC"
      placeholder="IFSC" 
      value={IFSC}
      onChangeText={input => setIFSC(input)}
    />

   <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Upi"
      placeholder="Upi" 
      value={Upi}
      onChangeText={input => setUpi(input)}
    />
   
   <TouchableOpacity  onPress={()=>pickImage('passbook')} style={{backgroundColor:"#1976D2" ,width:'50%' , padding:'2%',margin:'5%' , borderRadius:7 }} >
      <Text style={{color:'white'}}>BANK PASSBOOK (JPEG)</Text>
    </TouchableOpacity>

     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Name"
      placeholder="Name" 
      value={name}
      onChangeText={input => setName(input)}
    />

   
   
     <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="PAN NUMBER"
      placeholder="PAN NUMBER" 
      value={Pan}
      onChangeText={input => setPan(input)}
    />

<TouchableOpacity onPress={() => pickImage('pan')} style={{backgroundColor:"#1976D2" ,width:'50%' , padding:'4%',margin:'5%' , borderRadius:7 }} >
      <Text style={{color:'white'}}>PAN CARD (JPEG)</Text>
    </TouchableOpacity>


    <View style={styles.line}></View>
         <TouchableOpacity style={{alignItems:'center'}} onPress={saveBankInfo} >
            <Text style={{color:'#5048E5', fontWeight:'500',marginVertical:'5%'}}>SAVE DETAILS</Text>
          </TouchableOpacity>

      </View>

      <View style={[styles.card,styles.shadowProp]}>
      <Text style={{fontSize:18}}>Wallet</Text>
      <Text style={{opacity:0.7}}>Add Wallet Amount to your bank</Text>

      <View style={styles.line}></View>

      <View style={styles.money}>
         <Text>Approved Amount</Text>
         <Text style={{color:'green'}}>Rs .{wallet && (+wallet.approvedAmount - processingAmount).toFixed(2)}</Text>
      </View>

      <View style={styles.money}>
         <Text>Total Balance</Text>
         <Text>Rs. {wallet && (+wallet.totalBalance).toFixed(2)}</Text>
      </View>

      <View style={styles.money}>
         <Text>Remaining Amount</Text>
         <Text style={{color:'red'}}>Rs. {wallet && ((+wallet.totalBalance) - (+wallet.approvedAmount - processingAmount)).toFixed(2)}</Text>
      </View>

      <View style={styles.line}></View>

      <TextInput 
     style={{marginBottom:'2%'}}
      mode="outlined"
      label="Amount"
      placeholder="Amount" 
      value={amount}
      keyboardType = "number-pad"
      onChangeText={input => setAmount(input)}
    />

   <TouchableOpacity style={{alignItems:'center'}} onPress={()=>setModalVisible(true)} >
      <Text style={styles.add}>Add Amount</Text>
    </TouchableOpacity>

  </View>
  <View style={[styles.card,styles.shadowProp]}>
       <View style={{flexDirection:'row' ,justifyContent:'space-between' ,marginVertical:windowHeight*0.02}}>
              <Pressable onPress={() => setIsRecived(true)} >
                <View style={isRecieved? styles.active : styles.inactive}>
                  <Text style={ isRecieved? styles.activeText : styles.inactiveText}>Recieved</Text>
                </View>
              </Pressable>
                
              <Pressable  onPress={() => setIsRecived(false)}>
                <View style={!isRecieved? styles.active : styles.inactive}>
                  <Text style={ !isRecieved? styles.activeText : styles.inactiveText}>Transferred</Text>
                  </View>
              </Pressable>
            </View>

    {!isRecieved?
  <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View>
           <PaymentItem  headTransferred={true}/>
           {transaction && transaction.map(tran => <PaymentItem  transferred={true} _id = {tran._id} pout_id = {tran.pout_info.id}  mode ={tran.pout_info.mode}  date = {tran.createdAt} tds ={tran.pout_info.notes.TDS} amount={tran.pout_info.amount} status={tran.pout_info.status}/>)}
         </View>
        </ScrollView>
    :
    <ScrollView
    horizontal={true}
    showsHorizontalScrollIndicator={false}>
   <View>
     <PaymentItem  headRecieved={true}/>
     
     {recieved&& recieved.map(tran => <PaymentItem  data= {tran}/>)}
   </View>
  </ScrollView>}
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
  profImage:{
    width:80,
    height:80,
    borderRadius:40,
  },
   
  card: {
    backgroundColor: 'white',
    borderRadius: 0,
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '100%',
    marginVertical: 10,
    borderRadius:10,
    // alignItems:'center'
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation:5
  },
  line:{width:'100%' ,marginVertical:'5%',borderBottomColor:'grey', borderBottomWidth:1},
  tag:{
    padding:'2%',
    backgroundColor:'#5048E5',
    borderRadius:12,
    marginHorizontal:'2%',
    marginVertical:'1%'
  },
  money:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:'5%',
    marginVertical:'2%'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingBottom:22
  
  }
  ,
  modalView: {
   
    marginVertical:20,
    height:windowHeight * 0.4,
    width:windowWidth * 0.95,
    backgroundColor: "white",
    borderRadius: 20,
    padding: windowHeight * 0.02,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize:20
  },
  add:{color:'#5048E5' ,fontSize:20 , borderWidth:1 , borderColor:'#5048E5' ,paddingHorizontal:'5%' ,paddingVertical:'1%' ,marginVertical:'5%' ,borderRadius:10}
 ,
 active:{
  color:'#5048E5' ,
  backgroundColor:'#5048E5' ,
  fontSize:20 , borderWidth:1 ,
  borderColor:'#5048E5' ,
  paddingHorizontal:30 ,
  paddingVertical:10 ,
  marginVertical:'5%' ,
  borderRadius:10
},

 inactive:{
  color:'#5048E5' ,
 fontSize:20 ,
  borderWidth:1 
 , borderColor:'#5048E5' ,
 paddingHorizontal:30 ,
 paddingVertical:10 ,
 marginVertical:'5%' ,
 borderRadius:10
},

 activeText:{fontSize:18,color:'white'} ,
 inactiveText:{fontSize:18,color:'#5048E5'}

})
export default Payment;

