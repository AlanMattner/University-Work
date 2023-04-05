import { Text, View , Image, Button, TouchableWithoutFeedback} from 'react-native'
import React, { useState, useEffect} from 'react';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


function Landing() {

  // navigation used to take user to home page when the login button is clicked
  const navigation = useNavigation();


   // localStorage
   const [name, user] = useState('');



   const handleUserSave = (value) => {
       user(value);
   };



   //https://reactnative.dev/docs/asyncstoragehttps://reactnative.dev/docs/asyncstorage - error catching to use if value cannot be stored for name
   const saveUser = async () => {
    try {
      if (name) { // if name is  not null we can proceed
        await AsyncStorage.setItem('name', name);
        console.log("Name stored!")

        navigation.navigate('Home')
      }
      else {
        alert("Fill in name") // alert user
      }
       
    }
    catch (error) {
        console.log("Arghhhh, Error!")
    }
};

   return (
   <View className=" flex-1 flex-col items-center pt-10 bg-slate-50 ">
       <Text className="text-3xl pt-11">Please Login  </Text>
           <View className="justify-center items-center pt-10 ">
           <TextInput className="flex border border-gray-400 pt-9 w-80 mb-3 rounded-full text-center align-center py-4" placeholder="name" value={name} onChangeText= {handleUserSave}></TextInput>
           {/* When user presses login , name is saved in storage to be loaded in profile later */}
           <Button title="Login" onPress={saveUser}></Button> 
           </View>
   </View>
  
   )
}


export default Landing;
